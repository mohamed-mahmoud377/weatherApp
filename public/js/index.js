

const weatherForm = document.querySelector('form')
const search = document.querySelector("input")
const ms1 = document.getElementById("ms1")
const ms2 = document.getElementById("ms2")
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    fetch("http://localhost:3000/weather?address="+encodeURI(location)).then((response)=>{

        response.json().then((data) => {
            if (data.error){

                ms1.textContent=data.error;
                ms2.textContent= '';
                console.log(data.error)
            }else{
                ms1.textContent= data.location;
                ms2.textContent = data.forecast
                console.log(data)
            }
            search.textContent = ''
        })
    })
    // console.log(location)
})