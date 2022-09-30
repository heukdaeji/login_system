const $ = (query) => document.querySelector(query);

let quizCount = 10; //default value

window.onload = async function() {
    const userInfo = await (axios.get('../api/users/auth'));
    console.log(userInfo.data);
    if (userInfo.data.isAuth) {
        $('#UnAuth').style.display = 'none';
        $('#userInfoBtn').addEventListener('click', () => {
            window.location.href = 'userinfo';
        })
        $('#LogoutBtn').addEventListener('click', async () => {
            const logout = await axios.get(`../api/users/logout`);
            if (logout.data.success) {
                alert("Successfully logouted!");
                window.location.href = '/login';
            } else {
                alert("error occured");
            }
        });
        $('#userName').innerHTML = userInfo.data.name;
    } else {
        alert('Non-Login user is not allowed in this Page!')
        window.location.href = '/login';
    }
}
$('#homebtn').addEventListener('click', () => {
    window.location.href = '/';
});


$('#Submit').addEventListener('click', async () => {
    if (!confirm('Submit Quiz?')) return;
    let quiz = [];
    let ans = [];
    let fail = false;
    for(let i=1;i<=quizCount;i++){
        const description = $(`#description${i}`);
        const answerTexts = [];
        for(let j=1;j<=4;j++){
            answerTexts.push($(`#qtext${i}-a${j}`));
        }
        const answers = [];
        for(let j=1;j<=4;j++){
            answers.push($(`#q${i}-a${j}`));
        }
        fail |= quizValidate(description, answerTexts, answers);
        quiz.push({
            number:i, 
            description: description.value,
            answerTexts: answerTexts.map((v, i) => {return {number: i+ 1, value: v.value}})
        })
        ans.push({
            answer: answers.findIndex(v => v.checked) + 1
        })
    }
    if(fail) {
        alert('Please check all the fields again!');
        return
    }
    const userInfo = await (axios.get('../api/users/auth'));
    let date = new Date();
    let dates = `${0 <= date.getFullYear() && date.getFullYear() < 10 ? "0" + date.getFullYear() : date.getFullYear()}, ${0 <= (date.getMonth()+1) && (date.getMonth()+1) < 10 ? ("0" + (date.getMonth()+1)) : (date.getMonth()+1)}, ${0 <= date.getDate() && date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}, ${0 <= date.getHours() && date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}, ${0 <= date.getMinutes() && date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}, ${0 <= date.getSeconds() && date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()}`;
    axios({
        method: 'post',
        url: 'http://localhost:5000/api/quiz/create',
        data: {
            quiz: {
                quizName: $('#quizName').value,
                quiz: quiz,
                name: userInfo.data.name,
                time: dates
            }
        }
    }).then(response => {})
    setTimeout(function(){ 
        const quizid = document.cookie.split('quizid=')[1].split(';')[0];
        axios({
            method: 'post',
            url: 'http://localhost:5000/api/quiz/sendans',
            data: {
                ans: ans,
                id: quizid
            }
        }).then(response => {
            alert('Successfully Created!');
            window.location.href = '/quiz';
        })
    }, 2000);
});

function quizValidate(description, answerTexts, answers){
    let bool = false;
    bool |= highlight(description, description.value.length < 1);
    answerTexts.forEach(v => {
        bool |= highlight(v, v.value.length < 1);
    });
    let checked = answers.filter(v => v.checked).length != 1;
    answers.forEach(v => {
        bool |= highlight(v, checked);
    });
    return bool;
}

function highlight(obj, bool){
    if(bool)obj.classList.add('invalid')
    else obj.classList.remove('invalid');
    return bool;
}