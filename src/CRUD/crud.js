const BASE_URL = `http://localhost:4653`
let endPoint = `/posts`
let url = BASE_URL + endPoint
// GET
function getPosts() {
  fetch(url)
    .then(r => {
      console.log(r)
      return r.json()
    })
    .then(d => console.log(d))
}
// POST
const post1 = {
  title: 'HTML',
  author: 'Bob',
}
const post2 = {
  title: 'JS',
  author: 'Billy',
}
const post3 = {
  title: 'React',
  author: 'Vanessa',
}
const post4 = {
  title: 'Node',
  author: 'Lucy',
}
function sendPost(post) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  }
  fetch(url, options)
    .then(r => {
      console.log('POST', r)
    })
    .catch()
}
// sendPost(post1)
// sendPost(post2)
// sendPost(post3)
// sendPost(post4)

// PUT
function updatePost(updateValue, id) {
  endPoint = `/posts/${id}`
  url = BASE_URL + endPoint
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateValue),
  }
  fetch(url, options)
    .then(r => {
      console.log('POST', r)
    })
    .catch()
}

const update = {
  newKey: 'new value',
}
updatePost(update, 1)

// PATCH - частичное изменения
function patchPost(updateValue, id) {
  endPoint = `/posts/${id}`
  url = BASE_URL + endPoint
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateValue),
  }
  fetch(url, options)
    .then(r => {
      console.log('POST', r)
    })
    .catch()
}
patchPost(update, 2)
const updateTitle = {
  title: 'New Title',
}
patchPost(updateTitle, 2)

// DELETE
function deletePost(id) {
  endPoint = `/posts/${id}`
  url = BASE_URL + endPoint
  const options = {
    method: 'DELETE',
  }
  fetch(url, options)
    .then(r => {
      console.log('POST', r)
    })
    .catch()
}
deletePost(5)
deletePost(15)
