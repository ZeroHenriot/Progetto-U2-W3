const addressBarContent = new URLSearchParams(location.search)
const apiKey =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZjA2MzEzOWM0MzAwMTg4MTQ1NjciLCJpYXQiOjE2OTcxODE3OTYsImV4cCI6MTY5ODM5MTM5Nn0.NPunzgj4um5xzPbqlztNhdmMTjgGFSTj1zCiXHIMKnU'

const holyId = addressBarContent.get('productId')
// console.log(holyId)
// console.log(addressBarContent)
// console.log(apiKey)

if (holyId) {
  fetch('https://striveschool-api.herokuapp.com/api/product/' + holyId, {
    headers: {
      Authorization: apiKey,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        if (res.status === 404) {
          throw new Error('404 - Not Found')
        } else if (res.status === 500) {
          throw new Error('500 - Internal Server Error')
        } else {
          throw new Error('Generic Error')
        }
      }
    })
    .then((holyDetails) => {
      const nameInput = document.getElementById('name')
      const descriptionInput = document.getElementById('description')
      const brandInput = document.getElementById('brand')
      const imageInput = document.getElementById('url')
      const priceInput = document.getElementById('price')

      nameInput.value = holyDetails.name
      descriptionInput.value = holyDetails.description
      brandInput.value = holyDetails.brand
      imageInput.value = holyDetails.imageUrl
      priceInput.value = holyDetails.price
    })
    .catch((err) => {
      console.log('errore', err)
    })
}

const resetButton = document.getElementById('reset')
resetButton.addEventListener('click', function (e) {
  e.preventDefault()

  const confirmRequest = confirm('Sei sicuro di voler procedere?')

  if (confirmRequest) {
    const nameInput = document.getElementById('name')
    const descriptionInput = document.getElementById('description')
    const brandInput = document.getElementById('brand')
    const imageInput = document.getElementById('url')
    const priceInput = document.getElementById('price')

    nameInput.value = ''
    descriptionInput.value = ''
    brandInput.value = ''
    imageInput.value = ''
    priceInput.value = ''
  }
})

const formReference = document.getElementById('form')
formReference.addEventListener('submit', function (e) {
  e.preventDefault()

  const nameInput = document.getElementById('name')
  const descriptionInput = document.getElementById('description')
  const brandInput = document.getElementById('brand')
  const imageInput = document.getElementById('url')
  const priceInput = document.getElementById('price')

  const newHolyCard = {
    name: nameInput.value,
    description: descriptionInput.value,
    brand: brandInput.value,
    imageUrl: imageInput.value,
    price: priceInput.value,
  }
  console.log(newHolyCard)

  let methodToUse = 'POST'
  if (holyId) {
    methodToUse = 'PUT'
  }

  let urlToUse = 'https://striveschool-api.herokuapp.com/api/product'
  if (holyId) {
    urlToUse = 'https://striveschool-api.herokuapp.com/api/product/' + holyId
  }

  fetch(urlToUse, {
    method: methodToUse,
    body: JSON.stringify(newHolyCard),
    headers: {
      'Content-type': 'application/json',
      Authorization: apiKey,
    },
  })
    .then((res) => {
      if (res.ok) {
        alert('Inserito con successo')
        nameInput.value = ''
        descriptionInput.value = ''
        brandInput.value = ''
        imageInput.value = ''
        priceInput.value = ''
        window.location.href = 'index.html'
      } else {
        if (res.status === 404) {
          throw new Error('404 - Not Found')
        } else if (res.status === 500) {
          throw new Error('500 - Internal Server Error')
        } else {
          throw new Error('Generic Error')
        }
      }
    })
    .catch((err) => {
      console.log('ATTENZIONE ERRORE:', err)
    })
})
