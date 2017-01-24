# Gitlab-Tool

A (really) thin [Gitlab API](https://docs.gitlab.com/ee/api/README.html) wrapper for node.js

## Installation

`npm install --save 'gitlab-tool'`

## Usage

```javascript
const gitlab = require('gitlab-tool')({
  baseUri: 'http://gitlab.example.com/api/v3',  // Gitlab API uri
  privateToken: 'MY_PRIVATE_TOKEN',  // Profile Settings -> Account -> Private Token
  debug: false           // need some debug log?
})

const PROJECT_ID = 42  // list all projects: https://docs.gitlab.com/ee/api/projects.html#list-all-projects
const ASSIGNEE_ID = 93  // list all users: https://docs.gitlab.com/ee/api/users.html#list-users

// Create a merge request using official API:
// https://docs.gitlab.com/ee/api/merge_requests.html#create-mr
gitlab.post(`/projects/${PROJECT_ID}/merge_requests`, {
    source_branch: 'my-feature',
    target_branch: 'master',
    assignee_id: ASSIGNEE_ID,
    title: 'This is a merge request',
    description: 'some description'
  })
  .then(result => console.log(result))
```


## Documentation

[GitLab API](https://docs.gitlab.com/ee/api/README.html)