This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Makefile

For easier handling there is a Makefile included. Currently there are two scripts:

### `make` & `make run`

This starts the django server after you've correctly set it up and also starts the frontend service watching for files.

The API will be available at localhost:8000/api/v1/

### `make init`

Once you have installed Python3.8 you can run this command to setup the backend, having the scripts mentioned in the backend
section below run (if everything has been done correctly).

# Frontend

Frontend packages are found in the `./frontend/` directory, so run all these commands in there as well as the install script.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

# Backend

## Setup

Have python 3.8 installed, then install pipenv via `pip install pipenv`. In the root directory then run
`pipenv install --dev` to install python packages. Activate the virtual environment with `pipenv shell` and apply migrations with
`python ./backend/manage.py migrate`.

## Starting Server

After having completed the setup, to start the server type `python ./backend/manage.py runserver` or
`./backend/manage.py runserver`. At this point, if all the commands were entered correctly, we should see an instance of
a Django application running on this address — http://localhost:8000. Make sure to apply migrations every now and then,
the console should tell you if there are unapplied migrations.

## Creating a superuser

Once you have done the above steps, run `pipenv run ./backend/manage.py createsuperuser` in the project root when prompted insert the data like email, password, etc. After that is done you can run the server with `make` in project root and go to http://localhost:8000/admin, login there and see a representation of the database.

## Accessing the API Docs

When the server is started, you can go to http://localhost:8000/api/v1/ to see a few of the endpoints. There you can see a representation of the data that is accessible via API. For some you might need an authorisation token. If you want to see these you will have to use a browser plugin like ModHeader, and set a `Authorization: Token [your token]` header. In the admin view there is also a row for "Tokens", click that and you can access your authentication token. 
