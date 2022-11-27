initBoard()
initCatRow()

let currentBoxValue = 0;
let currentClue = {}
let currentQuestionElement = null
let countDown = null
let playerGameStats = {}

// If game is being played this should be set to true
let gameState = false

//CALLS FUNCTIONS WHEN BUTTONS ARE CLICKED
window.addEventListener('load', function () {

})

console.log('done loading')
document.querySelector('.questionPromptSection').style.display = 'none'
document.querySelector('#Register').addEventListener('click', Register)
document.querySelector('#start_game').addEventListener('click', PlayGame)

document.querySelector('#end_game').addEventListener('click', resetBoard)

// ------------------------------------------------ FUNCTION DEFINITIONS

//creates playerData array
var PlayersData = new Array();
const playerData = new Array();
let playerGames = {
    test: 12
};

//task10
function findPercentageScore() {
    //loop over the playa daya array  fid all the instances where isanswer is false and isanswer is true
    let countCorrectAnswer = 0
    let countIncorrectAnswer = 0
    playerData.forEach(function () {
        if (isAnswer) {
            countCorrectAnswer++
        }
        else {
            countIncorrectAnswer++
        }

    })
    let percentageScore = (countCorrectAnswer / playerData.length) * 100

    // updatePlayerInfo
    playerGameStats['name'] = `${countCorrectAnswer}, ${countIncorrectAnswer}, ${percentageScore}`

}


//REGISTERS PLAYER  
function Register(event) {
    event.preventDefault()
    var age = document.forms["SignUpForm"]["age"].value;
    var fname = document.forms["SignUpForm"]["fname"].value;
    var gender = document.forms["SignUpForm"]["gender"].value;

    //AGE	
    if (age < 12) {

        alert("You must be older than twelve (12) to play.");
        //PREVENTS FORM FROM BEING SUBMITTED
        return false;
    }
    //NAME 
    else if (fname.length <= 3) {

        alert("First name must be more than three characters in length.");
        return false;
    }
    //GENDER 
    else if ((gender != "Male") && (gender != "Female")) {

        alert("Gender must be either 'Male' or 'Female'.");
        return false;
    }
    //APPENDS DATA TO ARRAY
    else {
        PlayersData.push(
            {
                fname,
                lname,
                email,
                gender,
                dob,
                age,
                eLevel,
                country,
                street,
                town,
                city
            });

        alert("Welcome to Jeopardy " + fname + " !");

        //DISABLES FORM FIELDS 
        document.getElementById("fname").disabled = true;
        document.getElementById("lname").disabled = true;
        document.getElementById("email").disabled = true;
        document.getElementById("gender").disabled = true;
        document.getElementById("dob").disabled = true;
        document.getElementById("eLevel").disabled = true;
        document.getElementById("country").disabled = true;
        document.getElementById("street").disabled = true;
        document.getElementById("town").disabled = true;
        document.getElementById("city").disabled = true;

        //ENABLES PLAY BUTTON
        let button = document.querySelector(".play");

        if (PlayersData.length === 0) {

            button.disabled = false;

        }//ENDS IF STATEMENT

        document.getElementById("Register").disabled = true
        document.getElementById("Play").disabled = false
        document.getElementById("end_game").disabled = false

    }//ENDS IF STATEMENT

} //ENDS REGISTER FUNCTION

function disableRegisterFormInputs() {
    document.querySelectorAll("form[id='SignUpForm'] input").forEach(function (input) {
        input.disabled = true
    })
}

// Fix dis
function PlayGame(event) {

    document.querySelector('#board').style.display = 'block'
    //INITIALIZE THE GAME BOARD ON PAGE LOAD
    if (event) {
        event.preventDefault()
    }

    if (gameState) {
        alert('Start over mi g')
    }

    buildCategories()
    gameState = true
}

//ENABLES PLAY NOW AND END GAME BUTTON, DISBABLES REGISTER BUTTON

const toggleDisable = () => {
    Register.disabled = true;
    Play.disabled = false;
    start_game.disabled = false;
    end_game.disabled = false;
    play_again.disabled = false;

} //ENDS TOGGLE DISABLE

//CREATE CATEGORY ROW

function initCatRow() {
    let catRow = document.getElementById('category-row')

    for (let i = 0; i < 6; i++) {

        let box = document.createElement('div')

        box.className = 'clue-box category-box'
        catRow.appendChild(box)
    }

} //ENDS INIT CAT ROW

//CREATE CLUE BOARD

function initBoard() {
    let board = document.getElementById('clue-board')

    //GENERATE 5 ROWS, THEN PLACE 6 BOXES IN EACH ROW

    for (let i = 0; i < 5; i++) {

        let row = document.createElement('div')
        let boxValue = 100 * (i + 1)

        row.className = 'clue-row'

        for (let j = 0; j < 6; j++) {

            let box = document.createElement('div')

            box.className = 'clue-box'
            box.textContent = '$' + boxValue

            box.addEventListener('click', getClue, false)
            row.appendChild(box)
        } //ENDS FOR LOOP

        board.appendChild(row)
    }//ENDS FOR LOOP
}//ENDS CREATE CLUE BOARD

//CALL API

function randInt() {
    return Math.floor(Math.random() * (18418) + 1)
} //ENDS RAND INT

let catArray = []

function buildCategories() {

    if (!(document.getElementById('category-row').firstChild.innerText == '')) {
        resetBoard()
    }

    const fetchReq1 = fetch(
        `https://jservice.io/api/category?&id=${randInt()}`
    ).then((res) => res.json());

    const fetchReq2 = fetch(
        `https://jservice.io/api/category?&id=${randInt()}`
    ).then((res) => res.json());

    const fetchReq3 = fetch(
        `https://jservice.io/api/category?&id=${randInt()}`
    ).then((res) => res.json());

    const fetchReq4 = fetch(
        `https://jservice.io/api/category?&id=${randInt()}`
    ).then((res) => res.json());

    const fetchReq5 = fetch(
        `https://jservice.io/api/category?&id=${randInt()}`
    ).then((res) => res.json());

    const fetchReq6 = fetch(
        `https://jservice.io/api/category?&id=${randInt()}`
    ).then((res) => res.json());

    const allData = Promise.all([fetchReq1, fetchReq2, fetchReq3, fetchReq4, fetchReq5, fetchReq6])

    allData.then((res) => {
        console.log(res)
        catArray = res
        setCategories(catArray)
    })
} //ENDS BUILD CATEGORIES

//RESET BOARD AND $$ AMOUNT

function resetBoard() {

    let clueParent = document.getElementById('clue-board')

    while (clueParent.firstChild) {

        clueParent.removeChild(clueParent.firstChild)

    } //ENDS WHILE

    let catParent = document.getElementById('category-row')

    while (catParent.firstChild) {

        catParent.removeChild(catParent.firstChild)

    }// ENDS WHILE

    document.getElementById('score').innerText = 0
    alert("Game Ended.")

    initBoard()
    initCatRow()
} //ENDS RESET BOARD

//LOAD CATEGORIES TO THE BOARD

function setCategories(catArray) {

    let element = document.getElementById('category-row')

    let children = element.children;

    for (let i = 0; i < children.length; i++) {

        children[i].innerHTML = catArray[i].title
    }//ENDS FOR LOOP
} //ENDS SET CATEGORIES

//FIGURE OUT WHICH ITEM WAS CLICKED

function getClue(event) {
    let child = event.currentTarget
    child.classList.add('clicked-box')
    //timer
    let boxValue = child.innerHTML.slice(1)
    let parent = child.parentNode
    let index = Array.prototype.findIndex.call(parent.children, (c) => c === child)

    let cluesList = catArray[index].clues

    let clue = cluesList.find(obj => {
        return obj.value == boxValue
    })
    currentClue = clue
    currentBoxValue = boxValue
    currentQuestionElement = child
    console.log(clue)
    showQuestion(clue, child, boxValue)
} //ENDS GET CLUE

//SHOW QUESTION TO USER AND GET THEIR ANSWER!

function showQuestion(clue, target, boxValue) {


    askQuestion(clue.question);
    startTimer()

} //ENDS SHOW QUESTION

function startTimer() {
    //code for timer
    const timeH = document.querySelector('#timer > h3');
    let timeSecond = 60;

    displayTime(timeSecond);

    countDown = setInterval(() => {
        timeSecond--;
        displayTime(timeSecond);
        if (timeSecond === 0) {
            alert('TIME IS UP!')
            awardPoints("", false, currentBoxValue)
            reset()
            clearInterval(countDown);
        }
    }, 1000)
    function displayTime(second) {
        const min = Math.floor(second / 60);
        const sec = Math.floor(second % 60);
        timeH.innerHTML = `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`
    }

}

function checkAnswer() {
    const answer = document.querySelector('.answerInput').value
    let correctAnswer = currentClue.answer.toLowerCase().replace(/<\/?[^>]+(>|$)/g, "")
    let possiblePoints = +(currentBoxValue)

    currentQuestionElement.innerHTML = currentClue.answer
    currentQuestionElement.removeEventListener('click', getClue, false)

    // Clear countdown timer
    console.log(countDown)
    clearInterval(countDown)

    evaluateAnswer(answer.toLowerCase(), correctAnswer, possiblePoints)
}

function reset() {
    document.querySelector("input[name='answer']").value = ""
    removeQuestionSection()
}

function askQuestion(question) {
    // display prompt element
    document.querySelector('.questionPromptSection').style.display = 'block'
    // set the question in the h2 element in prompt display
    document.querySelector('#question').innerHTML = question
}

function removeQuestionSection() {
    document.querySelector('.questionPromptSection').style.display = 'none'
}


// EVALUATE ANSWER AND SHOW TO USER TO CONFIRM

function evaluateAnswer(userAnswer, correctAnswer, possiblePoints) {
    console.log(playerData)
    let checkAnswer = (userAnswer == correctAnswer) ? 'correct' : 'incorrect'
    let confirmAnswer =
        confirm(`For $${possiblePoints}, you answered "${userAnswer}", and the correct answer was "${correctAnswer}". Your answer appears to be ${checkAnswer}. Click OK to accept or click Cancel if the answer was not properly evaluated.`)
    reset()
    awardPoints(checkAnswer, confirmAnswer, possiblePoints)

}//ENDS CHECK ANSWER

// AWARDS POINTS

function awardPoints(checkAnswer, confirmAnswer, possiblePoints) {

    if (checkAnswer == 'correct' && confirmAnswer == true) {

        let target = document.getElementById('score')
        let currentScore = +(target.innerText)

        currentScore += possiblePoints
        target.innerText = currentScore
        const numGames = playerGames["test"]
        const gameStats = {
            isAnswer: true,
            playerCurrentTotal: currentScore
        }
        playerData.push(gameStats)
    }
    else {
        let target = document.getElementById('score')
        let currentScore = +(target.innerText)

        currentScore -= possiblePoints
        target.innerText = currentScore
        const numGames = playerGames["test"]
        const gameStats = {
            playerTotal: numGames,
            isAnswer: false,
            playerCurrentTotal: currentScore
        }
        playerData.push(gameStats)

    }

} //ENDS AWARD POINTS
