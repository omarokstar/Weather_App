
const weatherform=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#Message1')
const messagetwo=document.querySelector('#Message2')
weatherform.addEventListener('submit',(e) => {
 e.preventDefault()

 const location=search.value
 messageOne.textContent='Loading...'
 messageOne.textContent=''

 fetch('/weather?address='+location).then((response) =>{
response.json().then((data) =>{
     if(data.error){
    messageOne.textContent=data.error
     }
     else{
        messageOne.textContent=data.location
        messagetwo.textContent=data.forecast
       
     }
    })
} )
})

 