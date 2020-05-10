# Eelbot UI
A web based config tool to configure [Eelbot](https://github.com/Emseers/Eelbot), a discord bot for Emseers.

## Implemenation
Implemented as a RESTful API powered by flask and a React based SPA.


## Instructions

### Backend (Setup)

1. Install Python 3 (3.7), and Pip.

2. Install Pipenv via Pip

        pip install pipenv

3. Navigate to /backend

4. Install python dependencies via pipenv

        pipenv install

5. Run virtual environment by using the command

        pipenv shell

6.  cd .. to Eelbot-ui, then run commands to start the server

        export FLASK_APP=backend
        export FLASK_ENV=development
        flask run

7. When running the server for the first time, use command

        flask init-db

8. Replace the db with your own eelbotdb in the instance directory after it's been created