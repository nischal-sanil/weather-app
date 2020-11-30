const form = document.querySelector('form')
const search = document.querySelector('input')

const mssg1 = document.querySelector('#mssg-1')
const mssg2 = document.querySelector('#mssg-2')



form.addEventListener('submit',(e) =>{
    e.preventDefault()
    
    mssg1.textContent = 'Loading..'
    mssg2.textContent = ''
    
    const location = search.value
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error){
                mssg1.textContent = data.error
            } else {
                mssg1.textContent = data.location
                mssg2.textContent = data.forecastData
            }
        })
    })
})