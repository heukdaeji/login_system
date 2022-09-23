const $ = (query) => document.querySelector(query);

let quizCount = 10; //default value

window.onload = async function() {
    const userInfo = await (axios.get('./api/users/auth'));
    console.log(userInfo.data);
    if (userInfo.data.isAuth) {
        $('#UnAuth').style.display = 'none';
        $('#LogoutBtn').addEventListener('click', async () => {
            const logout = await axios.get(`./api/users/logout`);
            if (logout.data.success) {
                console.log("Successfully logouted!");
                window.location.href = '/login';
            } else {
                console.log("error occured");
            }
        });
        $('#userName').innerHTML = userInfo.data.name;
    } else {
        $('#Auth').style.display = 'none';
        $('#loginButton').addEventListener('click', () => {
            window.location.href = '/login';
        });
    }
}
$('#homebtn').addEventListener('click', () => {
    window.location.href = '/';
});

$('#Submit').addEventListener('click', async () => {
    if (!confirm('Submit Quiz?')) return;
    let quiz = [];
    let fail = false;
    for(let i=1;i<=10;i++){
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
            answer: answers.findIndex(v => v.checked) + 1,
            answerTexts: answerTexts.map((v, i) => {return {number: i+ 1, value: v.value}})
        })
    }
    if(fail)alert('Please check all the fields again!');
    const userInfo = await (axios.get('./api/users/auth'));
    let date = new Date();
    let dates = Intl.DateTimeFormat("en", { dateStyle: 'medium', timeStyle: 'medium' }).format(date)
    console.log(dates);
    axios({
        method: 'post',
        url: 'http://localhost:5000/api/quiz/create',
        data: {
            quizName: $('#quizName').value,
            quiz: quiz,
            name: userInfo.data.name,
            time: dates
            
        }
    }).then(response => {
        console.log(response);
        alert('Successfully Created!');
        window.location.href = '/quiz';
    })
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