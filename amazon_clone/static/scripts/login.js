import { getCookie } from "../data/cart";

const csrftoken = getCookie('csrftoken')

const email = document.getElementById('email').value
const password = document.getElementById('password').value

async function loginUser(){
    try{
        const response = await fetch('/api/auth/login/',{
            method : "POST",
            headers :{
                "Content-Type":"application/json",
                "X-CSRFToken" : csrftoken
            },
            body : JSON.stringify({
                email,
                password
            })
        })
        if(!response.ok){
            console.log("Unable to login")
        }

    }catch(error){
        alert('Error:',error)
        console.log("Error:", error)
    }
}

document.querySelector('.js-login-button').addEventListener('click',async ()=>{
    await loginUser();
    window.location.href = '/amazon/'
})  