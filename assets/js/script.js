
// References to HTML elements and variable assignments
const username = document.getElementById('user-input');
const feedback = document.getElementById('feedback');
const previousBtn = document.getElementById('previous');
const nextBtn = document.getElementById('next');
const exhibits = document.getElementsByClassName('exhibit');
const exhibitNo = document.getElementById('exhibit-num');
const progressBar = document.getElementById('progress-bar');
const alertMsg = document.getElementById('error-msg');
const quizContainer = document.getElementById('quiz');
const submitBtn = document.getElementById('submit');

/**
 * Validates username inserted on the index.html(homepage)
 * and displays error messages if username is invalid
 * @param {*} user user input
 * @returns true
 */
function validateUserInput(user) {
    
    let errorMsg = '';

    // if no user input is inserted
    if (user == '') {

        errorMsg = "Please enter a Username";
    
    // if user input is less than 3 characters 
    } else if (user.length <= Number(2)) {

        errorMsg = "Username must have 3 or more characters";
    } 

    // if errorMsg is not empty
    if (errorMsg != '') {
        // display errorMsg in feedback div on home page
        feedback.innerHTML = errorMsg;
        // adds functionality for screen readers to read error message 
        // when it is displayed on screen
        username.setAttribute('data-has-error', 'true');
        
        return false;
    }
    
    return true;
}

/**
 * Gets and stores user input if validateUserInput 
 * function is true and redirects to quiz.html page
 */
function getUserName() {

    let user = username.value;

    if (validateUserInput(user)) { 
        // redirects to quiz.html while storing username in url 
        window.location.replace(`quiz.html?user=${user}`);     
    }
}

/**
 * Takes username value stored in url and stores it in a variable
 * @returns user
 */
function saveUserName() {
    // https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    // Get the value of "user"
    let user = params.user; 

    return user;
}

// Array of quiz questions
let questions = [
    {
        question: 'Which team holds the record for most FIFA World Cup titles?',
        choice1: 'Germany',
        choice2: 'Brazil',
        choice3: 'Italy',
        choice4: 'Argentina',
        answer: 2,
    },
    {
        question:"How many minutes is a standard soccer match?",
        choice1: "90 minutes",
        choice2: "120 minutes",
        choice3: "60 minutes",
        choice4: "75 minutes",
        answer: 1,
    },
    {
        question: "Who is known as the Hand of God for his infamous goal in the 1986 World Cup?",
        choice1: "Diego Maradona",
        choice2: "Zinedine Zidane",
        choice3: "Ronaldo Nazario",
        choice4: "Thierry Henry",
        answer: 1,
    },
    {
        question:"What is the name of the designated area where a penalty kick is taken?",
        choice1: "Penalty box",
        choice2: "Penalty area",
        choice3: "Penalty spot",
        choice4: "Penalty circle",
        answer: 1,
    },
    {
        question: 'What is the name of the award given to the player who scores the most goals in a season?',
        choice1: 'Golden Boot',
        choice2: 'Golden Ball',
        choice3: 'Silver Boot',
        choice4: 'Bronze Boot',
        answer: 1,
    },
    {
        question: 'Which club has won the most UEFA Champions League titles until December 2023?',
        choice1: 'Real Madrid',
        choice2: 'FC Barcelona',
        choice3: 'AC Milan',
        choice4: 'Bayern Munich',
        answer: 1,
    },
    {
        question: 'Who is the all-time leading goal scorer in FIFA World Cup history?',
        choice1: 'Lionel Messi',
        choice2: 'Cristiano Ronaldo',
        choice3: 'Pele',
        choice4: 'Miroslav Klose',
        answer: 4,
    },
    {
        question: 'Which country won the first-ever FIFA World Cup in 1930?',
        choice1: 'Germany',
        choice2: 'Brazil',
        choice3: 'Italy',
        choice4: 'Uruguay',
        answer: 4,
    },
    {
        question: 'Which country won the 2022 FIFA World Cup?',
        choice1: 'France',
        choice2: 'Brazil',
        choice3: 'Argentina',
        choice4: 'Spain',
        answer: 3,
    },
]

let currentExhibit = 0;
let exhibitCounter = 1;
let width = 10;

function generateQuiz() {
    
    /** 
     * Shuffles the order of questions in the array of objects using the built in
     * JS array sort() method which swaps one item with the next one and 
     * takes a callback function which returns a random + or - number. 
     */
    function shuffle(questions) {
        return questions.sort(() => 0.5 - Math.random());
    }

    shuffle(questions);

    /**
     * Gets the questions and answers from the array and displays them on 
     * the page using innerHTML
     */
    function displayQuiz() {
        // variable for questions and answer choices
        const output = [];

        // iterates through the array of questions 
        for (let i = 0; i < questions.length; i++) {
            
            // variable for list of possible answers
            const answers = [];

            // gets the questionID of each question
            const questionID = questions[i].questionID;

            // iterates through the answer options for each question
            for (let letter in questions[i].answers) {

                // adds and HTML radio button and label with attributes for each answer option
                answers.push(
                    `
                    <label id="label${[questionID]}_${letter}" class="radio-label">
                        <input type="radio" name="question${questionID}" value="${letter}" 
                            onclick="selectOption(${[questionID]}, this.value);">
                        ${questions[i].answers[letter]}
                    </label>
                    `
                );
            }

            // creates HTML divs to contain the questions and answers and adds the answers to the output 
            output.push(
                `
                <div class="exhibit">
                    <div id="question${[questionID]}" class="question"> ${questions[i].question} </div>
                    <div id="answers${[i]}" class="answers"> ${answers.join('')} </div>
                </div>
                `
            );
        }

        // combine output list into one string of HTML and put it on the page
        quizContainer.innerHTML = output.join('');    
    }
    
    displayQuiz();
}