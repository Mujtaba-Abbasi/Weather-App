console.log('Client side javascript file is loaded!')

fetch('http://puzzle.mead.io/puzzle').then((res)=>{
    res.json().then((data)=>{
        console.log(data);
    })
})



const weatherForm = document.querySelector('form') 
const search = document.querySelector('input')
const msgOne = document.querySelector("#error")
const msgTwo = document.querySelector('#weather')



weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    msgTwo.textContent = "Loading..."
    msgOne.textContent=""
    const location = search.value
    
    fetch('/weather?address='+location).then((res)=>{
        res.json().then((data)=>{
        if(data.error){
            msgOne.textContent=data.error;
            // console.log(data.error + " Error");
        }else{
            msgTwo.textContent = "The location is "+ data.location;
            msgOne.textContent = "The Tempurature is "+ data.forecast.temp;
        }
    })
})
})