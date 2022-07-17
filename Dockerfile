ARG REACT_APP_NAME=frontend
ARG FLASK_APP_NAME=backend
ARG REACT_APP_PATH=/opt/$REACT_APP_NAME
ARG FLASK_APP_PATH=/opt/$FLASK_APP_NAME
ARG PYTHON_VERSION=3.10.0-alpine
ARG POETRY_VERSION=1.1.13
ARG NGINX_VERSION=1.23.0-alpine

########## STAGE 1: STAGING ##########
FROM node:18-alpine AS node-staging
ARG REACT_APP_NAME
ARG REACT_APP_PATH

WORKDIR $REACT_APP_PATH
COPY ./frontend ./

FROM python:3.10 as python-staging

ARG FLASK_APP_NAME
ARG FLASK_APP_PATH

ENV \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONFAULTHANDLER=1 
ENV \
    POETRY_VERSION=$POETRY_VERSION \
    POETRY_HOME="/opt/poetry" \
    POETRY_VIRTUALENVS_IN_PROJECT=true \
    POETRY_NO_INTERACTION=1

# Install Poetry - respects $POETRY_VERSION & $POETRY_HOME
RUN curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/install-poetry.py | python
ENV PATH="$POETRY_HOME/bin:$PATH"

WORKDIR $FLASK_APP_PATH
COPY ./$FLASK_APP_NAME/poetry.lock ./$FLASK_APP_NAME/pyproject.toml ./$FLASK_APP_NAME/tests ./ ./$FLASK_APP_NAME/configmodule.py ./
COPY ./$FLASK_APP_NAME/$FLASK_APP_NAME ./$FLASK_APP_NAME

######### DEV STAGE 2: serve frontend #########
FROM node-staging as frontend-dev
ARG REACT_APP_NAME
ARG REACT_APP_PATH
#ENV NODE_ENV="development"
#ENV HTTP_PROXY="http://host.docker.internal:1337"

WORKDIR $REACT_APP_PATH
RUN npm install
CMD ["npm", "run", "start"]

########## DEV STAGE 3: serve backend #########
FROM python-staging as backend-dev
ARG FLASK_APP_NAME
ARG FLASK_APP_PATH

WORKDIR $FLASK_APP_PATH
RUN poetry install

# CONFIG VARS
# ENV DEVEL=true \
#    DB_URI="postgresql://eelbot:mysecretpassword@host.docker.internal:5432/eelbot" \
#    BACKEND_HOST="0.0.0.0" \
#    BACKEND_PORT_DEV='1337'
    
CMD ["poetry", "run", "server"]

######## PROD STAGE 1: build backend  #########
FROM python-staging as python-build-env
ARG FLASK_APP_PATH
ARG FLASK_APP_NAME

WORKDIR $FLASK_APP_PATH
RUN poetry build --format wheel
RUN poetry export --format requirements.txt --output constraints.txt --without-hashes

######## PROD STAGE 2: serve backend  #########
FROM python:$PYTHON_VERSION as backend-prod
ARG FLASK_APP_NAME
ARG FLASK_APP_PATH

ENV \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONFAULTHANDLER=1

ENV \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100

# CONFIG VARS
# ENV DB_URI="postgresql://eelbot:mysecretpassword@host.docker.internal:5432/eelbot" \
#    BACKEND_HOST="0.0.0.0" \
#    BACKEND_PORT="1338"

WORKDIR $FLASK_APP_PATH
COPY --from=python-build-env $FLASK_APP_PATH/dist/*.whl ./
COPY --from=python-build-env $FLASK_APP_PATH/constraints.txt ./
RUN pip install ./${FLASK_APP_NAME}*.whl --constraint constraints.txt

ENV FLASK_APP_NAME $FLASK_APP_NAME

WORKDIR "/usr/local/lib/python3.10/site-packages/$FLASK_APP_NAME"

CMD python -m $FLASK_APP_NAME

######## PROD STAGE 3: build frontend #########
FROM node-staging as node-build-env
ARG REACT_APP_NAME
ARG REACT_APP_PATH

WORKDIR $REACT_APP_PATH

ENV NODE_ENV="production"

RUN npm install --production
RUN npm run build

######## PROD STAGE 4: serve frontend #########
FROM nginx:$NGINX_VERSION as frontend-prod
ARG REACT_APP_NAME
ARG REACT_APP_PATH

COPY --from=node-build-env $REACT_APP_PATH/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]