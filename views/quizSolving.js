const $ = (query) => document.querySelector(query);

window.onload = async function() {
    const userInfo = await (axios.get('../../api/users/auth'));
    if (userInfo.data.isAuth) {
        $('#UnAuth').style.display = 'none';
        $("#LogoutBtn").addEventListener('click', async function() {
            const logout = await axios.get(`../../api/users/logout`);
            if (logout.data.success) {
                console.log("Successfully logouted!");
                window.location.href = '/login';
            } else {
                console.log("error occured");
            }
        })
        $('#userName').innerHTML = userInfo.data.name;
    } else {
        alert('Non-Login user is not allowed in this Page!')
        window.location.href = '/login';
    }
    const quizid = document.cookie.split('quiz_id=')[1];
    axios({
        method: 'post',
        url: 'http://localhost:5000/api/quiz/findtoid',
        data: {
            id: quizid
            
        }
    }).then(response => {
        console.log(response);
    })
}
