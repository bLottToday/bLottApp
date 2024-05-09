## Install & run dev

```
git clone https://github.com/bLottToday/bLottApp

cd bLottToday
add .env file for frontend Apps:
REACT_APP_API_URL=http://localhost:3000


add .env file for backend API:
#DB
CONNECTION_STRING=mongodb://user:password@localhost:27017/blott?authSource=admin&readPreference=primary

cd bLottApp
yarn
yarn build-lib
yarn api
yarn app
```

## Build & run app

```
git clone https://github.com/bLottToday/bLottApp
cd bLottApp
export NODE_OPTIONS="--max-old-space-size=8192"
yarn
yarn build-lib
yarn build-api
yarn build-app

```

## change the API urls for frontend

```
modify .env file variables reflect the login and API urls.
```
