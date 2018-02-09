const hostname = window.location.hostname
let apiServer
if (hostname === 'localhost') {
  apiServer = 'http://localhost:5000'
} else {
  apiServer = 'https://meta-counter.herokuapp.com'
}

export { apiServer }
