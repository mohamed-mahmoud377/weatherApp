

const weatherForm = document.querySelector('form')
const search = document.querySelector("input")
const ms1 = document.getElementById("ms1")
const ms2 = document.getElementById("ms2")
const img = document.getElementById("WImg")
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    fetch("/weather?address="+encodeURI(location)).then((response)=>{

        response.json().then((data) => {
            if (data.error){
                img.style.display= "none";
                ms1.style.color = "red";
                ms1.textContent=data.error;

                ms2.textContent= '';
                console.log(data.error)
            }else{
                ms1.style.color ="black";
                ms1.textContent= ` location : ${data.location}`;
                if (data.temperature) {
                    img.src = data.weatherIcon
                    img.style.display= "inline"
                    ms2.textContent = ` the temperature is ${data.temperature}C and it seems to be ${data.weatherDescriptions} with ${data.windSpeed} as the wind speed , and the current time is  ${data.currentTime}`
                }else{
                    ms2.style.color = "red";
                    ms2.textContent="the given location does not appear to be working please try to specify the exact location"
                }
                console.log(data)
            }
            search.textContent = ''
        })
    })
    // console.log(location)
})