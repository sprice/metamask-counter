# Metamask Counter

A simple web app using Metamask for authentication. The server keeps track of state for each validated Ethereum address.

## Project Definition and Original Design Doc

See PROJECT1.md and DESIGN_DOC.md

## Resources used

See RESOURCES.md

## Authentication

Authentication is handled using `web3.js` and Metamask to sign data with an Ethereum address private key on the front end. The signature is stored in localStorage and is used in every API request. The API server confirmes that the extracted address from the signature matches the supplied address, thereby verifying that the API caller owns the supplied address.

On the front end this is handled in `./src/Login/index.js`. On the server this is handled in `./server/index.js` and `./server/verify-sig.js`. The server includes tests at `./test`.

## Installation

```
$ git clone https://github.com/sprice/metamask-counter.git
$ cd metamask-counter
$ yarn
$ yarn test
$ yarn test-server
$ yarn start
$ yarn start-dev
```

## Deployment

### Front End

The Front End is a static single page React app. It is deployed using [up](https://up.docs.apex.sh).

[count.shawnprice.com](https://count.shawnprice.com)

#### Deploy your own front end

1. Create `~/.aws/credentials` file with a profile of `up` (https://up.docs.apex.sh/#aws_credentials)
2. Edit `up.json` to use a domain you own which is managed by Amazon Route 53
3. `$ yarn deploy-front-end`

### Server

The server is a simple Express Node.js app. It is deployed using [heroku](https://www.heroku.com)

[meta-counter.herokuapp.com](https://meta-counter.herokuapp.com/)

#### Deploy your own server

```
$ heroku create
$ git push heroku master
$ heroku ps:scale web=1
Edit ./src/constants and update the value of 'apiServer' to your new server
```
