window.onload = async function() {
    const userInfo = await (axios.get('./api/users/auth'));
    if (userInfo.data.isAuth) {
        document.getElementById('UnAuth').style.display = 'none';
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
        document.getElementById('Auth').style.display = 'none';
        document.getElementById("loginButton").addEventListener('click', () => {
            window.location.href = '/login';
        })
    }
    const quizInfo = await (axios.get('./api/quiz/quizlist'));
    console.log(quizInfo.data.count);
}

document.getElementById('homebtn').addEventListener('click', () => {
    window.location.href = '/';
})
