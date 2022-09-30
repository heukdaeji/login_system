const $ = (query) => document.querySelector(query);

window.onload = async function() {
    const userInfo = await (axios.get('../../api/users/auth'));
    if (userInfo.data.isAuth) {
        $('#UnAuth').style.display = 'none';
        $('#userInfoBtn').addEventListener('click', () => {
            window.location.href = 'userinfo';
        })
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
    $('#homebtn').addEventListener('click', () => {
        window.location.href = '/';
    });
    const quizid = document.cookie.split('quiz_id=')[1].split(';')[0];
    console.log(quizid);
    function getQuiz() {
        const promise = axios.post('http://localhost:5000/api/quiz/findtoid', {
            id: quizid
        })
        const dataPromise = promise.then((response) => response.data)
        return dataPromise;
    }
    getQuiz().then(data => {return data;})
    const quiz = (await getQuiz()).quizInfo;
    console.log(quiz);
    if (quiz.name === userInfo.data.name) console.log("maker sus");
    let ans = [];
    let quizNum = 1;
    $('.description').innerHTML = quiz.quiz[quizNum-1].description;
    $('.description').disabled = true;
    $('.quizName').innerHTML = quiz.quizName;
    $('.quizName').disabled = true;
    for (let i = 1; i <= 4; i++) {
        $(`#text-a${i}`).innerHTML = quiz.quiz[quizNum-1].answerTexts[i-1].value;
    }

    $('#next-quiz').addEventListener('click', () => {
        let answers = [];
        for(let j=1;j<=4;j++){
            answers.push($(`#a${j}`));
        }
        ans.push(answers.findIndex(v => v.checked) + 1);
        quizNum++;
        if (quizNum === 11) {
            alert('end!');
        } else {
            $('.description').innerHTML = quiz.quiz[quizNum-1].description;
            $('.description').disabled = true;
            $('.quizName').innerHTML = quiz.quizName;
            $('.quizName').disabled = true;
            $('.quizNum').innerHTML = quizNum + '.';
            for (let i = 1; i <= 4; i++) {
                $(`#text-a${i}`).innerHTML = quiz.quiz[quizNum-1].answerTexts[i-1].value;
            }
        }
        console.log(ans);
    })
}
