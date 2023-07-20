console.log('Client side javascript is loaded');

// fetch('http://puzzle.mead.io/puzzle').then(response => {
//     response.json().then(data => {
//         console.log(data);  
//     })
// })

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// messageOne.textContent = 'From Javascript!';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    seachTerm = search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    if (!seachTerm) {
        messageOne.textContent = 'You must provide a location';
    }
    fetch(`http://localhost:3000/weather?address=${seachTerm}`).then(response => {
        response.json().then(data => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    })

})