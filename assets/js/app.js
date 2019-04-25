'use strict'

// variables
const listaTwetts = document.getElementById('lista-tweets')

// eventos
eventListeners()

function eventListeners() {
    // cuando se envia el form
    document.querySelector('#formulario').addEventListener('submit', agregarTweet)

    // borrando tweets
    listaTwetts.addEventListener('click', borrarTweet)

    // contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo)

    // eliminar todos del DOM y LS
    document.querySelector('#eliminar').addEventListener('click', deleteAll)
}

//funciones
// agrega tweet al DOM
function agregarTweet(e) {
    e.preventDefault()

    // leer valor de txtArea
    const tweet = document.getElementById('tweet').value

    // crear btn de eliminar
    const borrar = document.createElement('a')
    borrar.classList = 'borrar-tweet'
    borrar.innerText = 'X'
    
    // crear elemento y añadir contenido
    const li = document.createElement('li')
    li.innerText = tweet
    li.appendChild(borrar)
    listaTwetts.appendChild(li)

    // añadir a localstorage
    agregarTweetLS(tweet)

    // limpiamos el textArea
    document.getElementById('tweet').value = ''
}

// elimina tweet del DOM
function borrarTweet(e) {
    e.preventDefault()

    // delegation
    if (e.target.className === 'borrar-tweet') {
        // eliminando desde el DOM
        e.target.parentElement.remove()
        borrarLocalStorage(e.target.parentElement.innerText)
    }
}

// agrega tweet a LS
function agregarTweetLS(tweet) {
    let tweets = obtenerTweetsLS()

    // añadir el nuevo tweet
    tweets.push(tweet)

    // convertir de string a arreglo
    localStorage.setItem('tweets', JSON.stringify(tweets))
}

// comprueba que haya elementos, y retorna un arreglo
function obtenerTweetsLS() {
    let tweets

    // revisamos valores de LS
    if (localStorage.getItem('tweets') === null) {
        tweets = []
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'))
    }
    return tweets
}

// cargando los datos de LS en la lista
function localStorageListo() {
    let tweets = obtenerTweetsLS()

    tweets.forEach(tweet => {
        // crear btn de eliminar
        const borrar = document.createElement('a')
        borrar.classList = 'borrar-tweet'
        borrar.innerText = 'X'
    
        // crear elemento y añadir contenido
        const li = document.createElement('li')
        li.innerText = tweet
        li.appendChild(borrar)
        listaTwetts.appendChild(li)
    })
}

// borra item de LS
function borrarLocalStorage(tweet) {
    let tweets
    let borrar

    // eliminamos la equis
    borrar = tweet.substring(0, tweet.length - 1)

    tweets = obtenerTweetsLS()
    tweets.forEach((tweet, index) => {
        if (borrar === tweet) {
            tweets.splice(index, 1)
        }
    })

    localStorage.setItem('tweets', JSON.stringify(tweets))
}

function deleteAll(e) {
    e.preventDefault()
    localStorage.clear()
    location.reload()
}