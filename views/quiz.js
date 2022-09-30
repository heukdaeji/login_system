window.onload = async function() {
    const userInfo = await (axios.get('./api/users/auth'));
    if (userInfo.data.isAuth) {
        document.getElementById('UnAuth').style.display = 'none';
        document.getElementById("userInfoBtn").addEventListener('click', () => {
            window.location.href = 'userinfo';
        })
        document.getElementById("LogoutBtn").addEventListener('click', async function() {
            const logout = await axios.get(`./api/users/logout`);
            if (logout.data.success) {
                console.log("Successfully logouted!");
                window.location.href = '/login';
            } else {
                console.log("error occured");
            }
        })
        document.getElementById('userName').innerHTML = userInfo.data.name;
    } else {
        alert('Non-Login user is not allowed in this Page!')
        window.location.href = '/login';
    }
}

document.getElementById('homebtn').addEventListener('click', () => {
    window.location.href = '/';
})

document.getElementById('MakeBtn').addEventListener('click', () => {
    window.location.href = '/quiz/make';
})

document.getElementById('SolveBtn').addEventListener('click', () => {
    window.location.href = '/quiz/solve';
})