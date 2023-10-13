const holyCards = function (pippo) {
  const row = document.getElementById('events-row')

  pippo.forEach((papperino) => {
    const newCol = document.createElement('div')
    newCol.className = 'col col-12 col-sm-6 col-md-3'

    newCol.innerHTML = `
    <div class="card">
        <img src="${papperino.imageUrl}" style="height: 400px;">
        <div class="card-body">
            <h5 class="card-title">${papperino.name}</h5>
            <p class="card-text">${papperino.description}</p>
            <p class="card-text">${papperino.brand}</p>
            <p class="card-text">Prezzo: ${papperino.price}€</p>
            <a href="./detail.html?productId=${papperino._id}" class="btn btn-success">SCOPRI DI PIÙ</a>
        </div>
    </div>
    `
    row.appendChild(newCol)
  })
}

const hideSpinner = function () {
  // nascondo lo spinner, perchè la Promise non è più in pending
  const spinner = document.getElementById('loading-spinner')
  spinner.classList.add('d-none')
}

const getHolyCard = function () {
  fetch('https://striveschool-api.herokuapp.com/api/product', {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZjA2MzEzOWM0MzAwMTg4MTQ1NjciLCJpYXQiOjE2OTcxODE3OTYsImV4cCI6MTY5ODM5MTM5Nn0.NPunzgj4um5xzPbqlztNhdmMTjgGFSTj1zCiXHIMKnU',
    },
  })
    .then((res) => {
      hideSpinner()
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
    .then((events) => {
      console.log('events', events)
      holyCards(events)
    })
    .catch((err) => {
      hideSpinner()
      console.log('Errore:', err)
    })
}

getHolyCard()
