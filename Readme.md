# Eelbot UI
A web based config tool to configure [Eelbot](https://github.com/Emseers/Eelbot), a discord bot for Emseers.

## Implemenation
Implemented as a RESTful API powered by flask and a React based SPA.


## Installation & Deployment

### Frontend

#### Setup
1. Navigate into the `frontend` directory

2. install & resolve dependencies by using the following command:
```bash
npm install
```

#### Deployment

3. To run the app in development mode:
```bash
npm run start
```

For production, you may build the app using:
```bash
npm run build
```

Note: edit the config file to add your desired ports, hosts, and database location

### Backend

#### Setup

1. Navigate into the `backend` directory

2. install & resolve dependencies & create the virtual environment using the following command:
```bash
poetry install
```
3. To run the DEV version add the environment variable: `DEVEL = 'true'`, otherwise the production server will run.

#### Deployment

To run the server within the virtual environment:

```bash
`poetry run server`
```

## Docker

As an alternative to building and running eelbot-ui locally, you can build and run it in Docker. Build the images with the provided Dockerfile:

### Development server Images
```bash
docker build --target frontend-dev -t frontend-dev:latest .
docker build --target backend-dev -t backend-dev:latest .
```

### Production server Images
```bash
docker build --target frontend-prod -t frontend:latest .
docker build --target backend-prod -t backend:latest .
```

You need to mount all required files and folders to run the containers:

## Run Development Containers
```bash
docker run -it --name frontend -p <PORT:PORT> frontend-dev:latest
```

```bash
docker run -it --name backend -p <PORT:PORT> -v <full/path/to/configmodule.py>:/opt/backend/configmodule.py backend-dev:latest
```

## Run Production Containers
```bash
docker run -it --name backend -p <PORT:PORT> -v <full/path/to/configmodule.py>:/usr/local/lib/python3.10/site-packages/backend/configmodule.py backend:latest
```

```bash
docker run -it --name frontend -p <PORT:PORT> -v <full/path/to/nginx.conf>:/etc/nginx/conf.d/default.conf frontend:latest
```