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

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

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
