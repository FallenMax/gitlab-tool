const fetch = require('node-fetch')
const qs = require('querystring')

/**
 * Gitlab wrapper factory
 *
 * @param baseUri string, gitlab api uri like: 'http://gitlab.example.com/api/v3'
 * @param privateToken string, your personal private token,
 *                     get it at Profile Settings -> Account -> Private Token
 */
function createGitlabWrapper({ baseUri, privateToken, debug } = {}) {
  if (!baseUri || !privateToken) {
    throw new Error('please provide baseUri and privateToken')
  }

  const request = ({ method, path, option = {} }) =>
    Promise.resolve()
    .then(() => {
      if (debug) { console.info('[gitlab]', { method, path, option }) }
      if (method === 'GET') {
        option.private_token = privateToken
        return fetch(`${baseUri}${path}?` + qs.stringify(option))
      } else {
        return fetch(`${baseUri}${path}?private_token=${privateToken}`, {
          body: JSON.stringify(option),
          method,
          headers: {
            'Content-Type': 'application/json'
          }
        })
      }
    })
    .then(res => res.json())
    .then(json => {
      if (debug) {
        console.info('[gitlab]', { result: json })
      }
      return json
    })

  return {
    get: (path, option) => request({ method: 'GET', path, option }),
    post: (path, option) => request({ method: 'POST', path, option }),
    put: (path, option) => request({ method: 'PUT', path, option }),
    delete: (path, option) => request({ method: 'DELETE', path, option })
  }
}


module.exports = createGitlabWrapper
