// const { Axios } = require("axios");

// const axios = Axios();

$('#registerButton').addEventListener('click', () => {
    err('');
    const email = $('#email');
    const name = $('#name');
    const password = $('#password');
    const passwordConfirm = $('#passwordConfirm');
    if(validate(email) || validate(name) || validate(password)) {
        err('Some info is null!');
        return;
    }
    if (passwordConfirm.value !== password.value) {
        err('password confirm is wrong!');
        return;
    }

    userRegister(name.value, email.value, password.value);
});

document.getElementById('go').addEventListener('click', () => {
    window.location.href = '/login';
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

function userRegister(Name, Email, Password) {
    axios({
        method: 'post',
        url: 'http://localhost:5000/api/users/register',
        data: {
            name: Name,
            email: Email,
            password: Password
        }
    })
    .then(response => {

        //TODO: parse response
        alert('Successful Registered!')
        window.location.href = '/login'
        console.log(response.data)
    })
}

function err(txt){
    $('#err').innerText = txt ?? ' ';
}

function $(query){
    return document.querySelector(query);
}