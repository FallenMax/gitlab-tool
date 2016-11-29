const gitlab = require('./index')({
  baseUri: process.env.GITLAB_URI,
  privateToken: process.env.PRIV_TOKEN
})

gitlab.get('/user').then(console.log)
