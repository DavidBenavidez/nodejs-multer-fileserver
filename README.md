# File Sharing Server

## Description
File sharing server using nodejs

## Setup
### Backend
1. setup env file (see example env)
1. run `npm install`
1. run `npm run start`
1. For testing: run `npm run test`

### frontend
1. run `cd ./fileshare-client`
1. run `npm install`
1. run `npm run start`

## File structure
. \
+-- app.js initializes routes.js \
+-- routes.js mounts controller \
+-- controllers \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-- injects use-cases \
+-- use-cases \ Business logic here
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-- injects repository \
+-- respository \ data access here
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-- injects database

"test": "mocha './src/**/*.spec.js' --require @babel/register --require @babel/polyfill"