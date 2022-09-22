// const { Axios } = require("axios");

// const axios = Axios();

$('#loginButton').addEventListener('click', () => {
    const email = $('#email');
    const password = $('#password');
    if(validate(email) || validate(password))return;

    userLogin(email.value, password.value);
});

document.getElementById('go').addEventListener('click', () => {
    window.location.href = '/register';
})

function validate(obj){
    if(obj.value === undefined || obj.value === null || obj.value.length <1){
        obj.style.setProperty('border', 'solid 1px red');
        return true;
    } else {
        obj.style.border = null;
    }
    return false;
}

function userLogin(Email, Password) {
    axios({
        method: 'post',
        url: 'http://localhost:5000/api/users/login',
        data: {
          email: Email,
          password: Password
        }
    })
    .then(response => {
        //TODO: parse response
        if (response.data.loginSuccess) {
            alert('Successful login!')
            window.location.href = '/'
        } else {
            alert(response.data.message);
            window.location.href = '/login'
        }
        console.log(response)
    })
}

function err(txt){
    $('#err').innerText = txt ?? ' ';
}

function $(query){
    return document.querySelector(query);
}