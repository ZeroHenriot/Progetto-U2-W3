const addressBarContent = new URLSearchParams(location.search)
const apiKey =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZjA2MzEzOWM0MzAwMTg4MTQ1NjciLCJpYXQiOjE2OTcxODE3OTYsImV4cCI6MTY5ODM5MTM5Nn0.NPunzgj4um5xzPbqlztNhdmMTjgGFSTj1zCiXHIMKnU'

const holyId = addressBarContent.get('productId')
// console.log(holyId)

const deleteEvent = function () {
  const deleteRequest = confirm('Sei sicuro di voler procedere?')

  if (deleteRequest) {
    fetch('https://striveschool-api.herokuapp.com/api/product/' + holyId, {
      method: 'DELETE',
      headers: {
        Authorization: apiKey,
      },
    })
      .then((res) => {
        if (res.ok) {
          alert('ELIMINATO')
          location.assign('./index.html')
        } else {
          alert("Problema con l'eliminazione dell'evento")
          throw new Error('Errore nella DELETE')
        }
      })
      .catch((err) => {
        console.log('ERRORE!', err)
      })
  }
}

const generateEventDetails = function (papperino) {
  const row = document.getElementById('event-details')
  row.innerHTML = `
    <div class="col col-12 col-lg-6">
        <div class="card">
            <img src="${papperino.imageUrl}" calss="h-50"">
            <div class="card-body">
                <h5 class="card-title">${papperino.name}</h5>
                <p class="card-text">${papperino.description}</p>
                <p class="card-text">${papperino.brand}</p>
                <p class="card-text">Prezzo: ${papperino.price}€</p>
                <button class="btn btn-danger" onclick="deleteEvent()">ELIMINA</button>
                    <a class="btn btn-warning" href="./backoffice.html?productId=${papperino._id}">MODIFICA</a>
            </div>
        </div>
    </div>
      `
}

const getSingleEventDetails = function () {
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
    .then((eventData) => {
      generateEventDetails(eventData)
    })
    .catch((err) => console.log('ERRORE', err))
}

getSingleEventDetails()
