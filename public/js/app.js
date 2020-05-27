console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const icon = document.querySelector('#weather-icon')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    icon.src = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = "Location: " + data.location
                messageTwo.textContent = "Weather Descriptions: " + data.weather + "!"
                messageThree.textContent = "Its currently " + data.temp + "ºC out. It feels like " + data.feel + "ºC."            
                icon.src = data.waetherimg
            }
        })
    })
})