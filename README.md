# full-stack-open-osa3

API for Full Stack Open osa3. Related frontend code is in https://github.com/tomirantanen/full-stack-open/tree/master/osa2/puhelinluettelo

App is running in: https://full-stack-open-osa3.herokuapp.com/
API: https://full-stack-open-osa3.herokuapp.com/api/persons

## Running locally

```
npm install
npm start
```

## Building

Clone both repositories to same directory.
Build command uses relative directory paths to build frontend and copy the files.

```
git clone https://github.com/tomirantanen/full-stack-open-osa3.git
git clone https://github.com/tomirantanen/full-stack-open.git
cd full-stack-open-osa3
npm run build:ui
```

## Deploy to Heroku

```
heroku login
heroku create
npm run deploy
```
