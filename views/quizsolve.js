const $ = (query) => document.querySelector(query);

window.onload = async function() {
    const userInfo = await (axios.get('../api/users/auth'));
    if (userInfo.data.isAuth) {
        $('#UnAuth').style.display = 'none';
        $("#LogoutBtn").addEventListener('click', async function() {
            const logout = await axios.get(`../api/users/logout`);
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
    const quizInfo = await (axios.get('../api/quiz/quizlist'));
    const quizs = quizInfo.data.quizs;
    console.log(quizs);
    for (let i = 0; i < (quizs.length-1)/2+1; i++) {
        const quizPageDiv = document.createElement("div");
        quizPageDiv.setAttribute('class', 'quizPage');
        quizPageDiv.setAttribute('id', `quizPage${i+1}`);
        $('#quizs').appendChild(quizPageDiv);
    }
    for(let i = 0; i < quizs.length; i++) {
        const quizDiv = document.createElement("div");
        quizDiv.setAttribute('class', 'quiz');
        quizDiv.setAttribute('id', `quiz${i+1}`);
        let quizDate = quizs[i].time;
        const [year, month, day, hour, minute, second] = quizDate.split(', ');
        const DeadlineDate = new Date(year, month, day, hour, minute, second);
        DeadlineDate.setDate(DeadlineDate.getDate()+7);
        DeadlineDate.setMonth(DeadlineDate.getMonth()-1);
        const SplitedQuizDate = new Intl.DateTimeFormat("en", { dateStyle: 'medium', timeStyle: 'medium' }).format(DeadlineDate);
        quizDiv.innerHTML = `
        <div class="quiz">
            <div id="quizTitle">${quizs[i].quizName}</div>
                <div id="quizDetail">
                    <a id="quizAuthor">Made by: ${quizs[i].name}</a>
                    <br>
                    <br>
                    <div id="deadline">
                        <a>Deadline: </a>
                        <br>
                        <a id="quizDeadline">${SplitedQuizDate}</a>
                    </div>
                    <button class="solveBtn" id="solveBtn${i+1}">Solve</button>
                </div>
            </div>
        `;
        $(`#quizPage${Math.floor(i/2)+1}`).appendChild(quizDiv);
        $(`#solveBtn${i+1}`).addEventListener('click', () => {
            window.location.href = `/quiz/id/${quizs[i]._id}`;
        })

        const CurrentDate = new Date();
        if (CurrentDate > DeadlineDate) $(`#solveBtn${i+1}`).disabled = true;
    }
}

$('#homebtn').addEventListener('click', () => {
    window.location.href = '/';
})
