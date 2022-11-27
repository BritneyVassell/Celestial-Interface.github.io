initBoard()
initCatRow()

const PlayersData = new Array();
let PlayerData = new Array();

let currentBoxValue = 0;
let currentClue = {}
let currentQuestionElement = null
let countDown = null
let playerGameStats = {}

let cardCounter = 0

// If game is being played this should be set to true
let gameState = false

//CALLS FUNCTIONS WHEN BUTTONS ARE CLICKED

document.querySelector('#Register').addEventListener('click', Register)


document.querySelector('#Play').addEventListener('click', PlayGame)
document.querySelector('#end_game').addEventListener('click', () => {
    findPercentageScore()
    resetBoard()
})
document.querySelector('#results').addEventListener('click', findPercentageScore)
document.querySelector('#play_again').addEventListener('click', PlayGame)

// ------------------------------------------------ FUNCTION DEFINITIONS

let playerGames = {
    test: 12
};


//task10
function findPercentageScore() {
    //loop over the playa daya array  fid all the instances where isanswer is false and isanswer is true

    console.log(PlayerData)
    if (PlayerData.length === 0) {
        return
    }

    const currentPlayerIndex = PlayersData.length - 1
    const playerName = `${PlayersData[currentPlayerIndex].fname} ${PlayersData[currentPlayerIndex].lname}`


    let countCorrectAnswer = 0
    let countIncorrectAnswer = 0


    PlayerData.forEach(function (data) {
        if (data.isAnswer) {
            countCorrectAnswer++
        }
        else {
            countIncorrectAnswer++
        }
    })


    let percentageScore = (countCorrectAnswer / PlayerData.length) * 100

    // updatePlayerInfo
    const playerStats = `${playerName}, ${countCorrectAnswer}, ${countIncorrectAnswer}, ${percentageScore}`

    document.querySelector("textarea[name='showpercentage']").value = playerStats

    // re enable register
    document.getElementById('Register').disabled = true

    // reset player data
    PlayerData = Array()

    // disable play
    document.getElementById('Play').disabled = true

    enableRegisterFormInputs()
} //ENDS FIND PERCENTAGE SCORE


// if end game then done
// if play again then play again

//CALCULATES AGE
function getAge() {

    var birthDate = new Date(document.getElementById("dob").value);
    var today = new Date();

    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    //assigns age calculated to input field age
    document.getElementById("age").value = age;

} //ends function getAge()	



//REGISTERS PLAYER  
function Register(event) {
    event.preventDefault()

    // get form inputs
    const fname = document.forms["SignUp"]["fname"].value;
    const lname = document.forms["SignUp"]["lname"].value;
    const email = document.forms["SignUp"]["email"].value;
    const gender = document.forms["SignUp"]["gender"].value;
    const dob = document.forms["SignUp"]["dob"].value;
    const age = document.forms["SignUp"]["age"].value;
    const eLevel = document.forms["SignUp"]["eLevel"].value;
    const country = document.forms["SignUp"]["country"].value;
    const street = document.forms["SignUp"]["street"].value;
    const town = document.forms["SignUp"]["town"].value;
    const city = document.forms["SignUp"]["city"].value;


    //AGE	
    if (age < 12) {
        alert("You must be older than twelve (12) to play.");
        //PREVENTS FORM FROM BEING SUBMITTED
        return false;
    }
    //NAME 
    if (fname.length <= 3) {
        alert("First name must be more than three characters in length.");
        return false;
    }
    //GENDER 
    if ((gender != "Male") && (gender != "Female")) {
        alert("Gender must be either 'Male' or 'Female'.");
        return false;
    }

    console.log(PlayersData)

    //APPENDS DATA TO ARRAY
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

    console.log(PlayersData)

    alert("Welcome to Jeopardy " + fname + " !");

    //DISABLES FORM FIELDS (FUNCTION CALL)
    disableRegisterFormInputs()

    //ENABLES PLAY BUTTON
    let button = document.querySelector(".play");

    if (PlayersData.length === 0) {

        button.disabled = false;

    }//ENDS IF STATEMENT

    // Disable register button on a form
    document.getElementById("Register").disabled = true
    document.getElementById("results").disabled = false

    // Enable play and end game
    document.getElementById("Play").disabled = false
    document.getElementById("end_game").disabled = false


} //ENDS REGISTER FUNCTION

// Disables all the inputs on the sign up form
function disableRegisterFormInputs() {
    document.querySelectorAll("form[id='SignUp'] input").forEach(function (input) {
        input.disabled = true
    })
}

// ENABLES ALL INPUTS ON REGISTER FORM

function enableRegisterFormInputs() {
    document.querySelectorAll("form[id='SignUp'] input").forEach(function (input) {
        input.disabled = false
    })
}

function PlayGame(event) {
    //INITIALIZE THE GAME BOARD ON PAGE LOAD
    if (event) {
        event.preventDefault()
    }

    cardCounter = 30

    // enable play area
    buildCategories()
    document.getElementById('end_game').disabled = false
    document.getElementById('play_again').disabled = true
    document.getElementById('Play').disabled = true
    gameState = true
}
//ENABLES PLAY NOW AND END GAME BUTTON, DISBABLES REGISTER BUTTON

//SHOWS THE PLAY AREA 
function showPlayArea() {
    document.getElementById('board').style.display = "block"
}

const toggleDisable = () => {
    Register.disabled = true;
    Play.disabled = false;
    start_game.disabled = false;
    end_game.disabled = false;
    play_again.disabled = false;

} //ENDS SHOW PLAY AREA

//SHOWS AND IDES THE GAME BOARD
const targetDiv = document.getElementById("board");
const btn = document.getElementById("Play");

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
//GENERATES A RANDOM INTEGER TO RANDOMIZE CATEGORIES CHOSEN
function randInt() {
    return Math.floor(Math.random() * (18418) + 1)
} //ENDS RAND INT

let catArray = []

//BUILDS CATEGORES (TOP ROW)
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

    // Fix render small then large
    allData.then((res) => {
        catArray = res
        setCategories(catArray)
        showPlayArea()
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


    document.getElementById('end_game').disabled = true

    document.getElementById('play_again').disabled = false

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

    showQuestion(clue, child, boxValue)
} //ENDS GET CLUE

//SHOW QUESTION TO USER AND GET THEIR ANSWER
function showQuestion(clue) {
    console.log(clue)

    askQuestion(clue.question);
    startTimer()

} //ENDS SHOW QUESTION

//STARTS THE 60 SECOND TIMER
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

//CHECKS ANSWER GIVEN BY THE USER
function checkAnswer() {
    const answer = document.querySelector('.answerInput').value
    let correctAnswer = currentClue.answer.toLowerCase().replace(/<\/?[^>]+(>|$)/g, "")
    let possiblePoints = +(currentBoxValue)

    currentQuestionElement.innerHTML = currentClue.answer
    currentQuestionElement.removeEventListener('click', getClue, false)

    // Clear countdown timer
    clearInterval(countDown)
    console.log(answer)
    evaluateAnswer(answer.toLowerCase(), correctAnswer, possiblePoints)

    // Check if game finished
    if (cardCounter === 29) {
        alert('Game is finished')
        endGame()
    }
}

//DISABLES PLAY AGAIN BUTTON
function endGame() {
    document.getElementById('play_again').disabled = false
}

//RESETS ANSWER
function reset() {
    document.querySelector("input[name='answer']").value = ""
    removeQuestionSection()
}

// ASKS THE USER THE QUESTIONS
function askQuestion(question) {
    // display prompt element
    document.querySelector('.questionPromptSection').style.display = 'block'
    // set the question in the h2 element in prompt display
    document.querySelector('#question').innerHTML = question
}

//REMOVES QUESTION AREA
function removeQuestionSection() {
    document.querySelector('.questionPromptSection').style.display = 'none'
}


// EVALUATE ANSWER AND SHOW TO USER TO CONFIRM

function evaluateAnswer(userAnswer, correctAnswer, possiblePoints) {
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
            playerTotalGames: numGames,
            isAnswer: true,
            playerCurrentTotal: currentScore
        }
        PlayerData.push(gameStats)
    }
    else {
        let target = document.getElementById('score')
        let currentScore = +(target.innerText)

        currentScore -= possiblePoints
        target.innerText = currentScore
        const numGames = playerGames["test"]
        const gameStats = {
            playerTotalGames: numGames,
            isAnswer: false,
            playerCurrentTotal: currentScore
        }
        PlayerData.push(gameStats)

    }

    cardCounter--
} //ENDS AWARD POINTS
