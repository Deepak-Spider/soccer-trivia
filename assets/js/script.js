
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
const questions = [
    {
        questionID: 0,
        question: 'Which team holds the record for most FIFA World Cup titles?',
        answers: {
            a: 'Germany', 
            b: 'Brazil',
            c: 'Italy',
            d: 'Argentina'
        }, 
        correctAnswer: 'b'
    }, 
    {
        questionID: 1,
        question: 'How many minutes is a standard soccer match?',
        answers: {
            a: '90 minutes', 
            b: '120 minutes',
            c: '60 minutes', 
            d: '75 minutes'
        }, 
        correctAnswer: 'a'
    },
    {
        questionID: 2,
        question: 'Who is known as the "Hand of God" for his infamous goal in the 1986 World Cup?',
        answers: {
            a: 'Diego Maradona', 
            b: 'Zinedine Zidane',
            c: 'Ronaldo Nazario', 
            d: 'Thierry Henry'
        }, 
        correctAnswer: 'a'
    },
    {
        questionID: 3,
        question: 'What is the name of the designated area where a penalty kick is taken?',
        answers: {
            a: 'Penalty box', 
            b: 'Penalty area',
            c: 'Penalty spot',
            d: 'Penalty circle'
        }, 
        correctAnswer: 'a'
    },
    {
        questionID: 4,
        question: ' What is the name of the award given to the player who scores the most goals in a season?',
        answers: {
            a: 'Golden Boot',
            b: 'Golden Ball',
            c: 'Sliver Boot',
            d: 'Bronze Boot)'
        },
        correctAnswer: 'a'
    },

    {
        questionID: 5,
        question: 'How many players are there on a standard soccer team during a match?',
        answers: {
            a: '9',
            b: '10',
            c: '11',
            d: '12'
        },
        correctAnswer: 'c'
    },
    {
        questionID: 6,
        question: ' Which club has won the most UEFA Champions League titles until December 2023?',
        answers: {
            a: 'Real Madrid',
            b: 'FC Barcelona',
            c: 'AC Milan',
            d: 'Bayern Munich'
        },
        correctAnswer: 'a'
    },
    { 
        questionID: 7,
        question: 'Who is the all-time leading goal scorer in FIFA World Cup history?',
        answers: {
            a: 'Lionel Messi',
            b: 'Cristiano Ronaldo',
            c: 'Pele',
            d: 'Miroslav Klose'
        },
        correctAnswer: 'd'
    },
    {
        questionID: 8,
        question: 'Which country won the first-ever FIFA World Cup in 1930?',
        answers: {
            a: 'Brazil',
            b: 'Uruguay',
            c: 'Germany',
            d: 'Italy'
        },
        correctAnswer: 'b'
    },
    {
        questionID: 9,
        question: 'Which country won the 2022 FIFA World Cup?',
        answers: {
            a: 'France',
            b: 'Brazil',
            c: 'Argentina ',
            d: 'Spain'
        },
        correctAnswer: 'c'
    }
];

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

/** 
 * Iterates through the options and adds the class of radio-checked to the option 
 * the user has clicked on/selected, while removing the radio-checked class
 * from any previously selected radio button which becomes unchecked by default.
 * @param questionNo the question the user is on
 * @param selection the user's selected answer
 */
function selectOption(questionNo, selection) {
    // stores the list of option selections in a variable to iterate through them
    const optionList = ['a', 'b', 'c', 'd'];
    for (let i = 0; i <= optionList.length - 1; i++) {

        if (optionList[i] == selection) {
            const optionChoice = document.getElementById(`label${questionNo}_${selection}`);
            optionChoice.classList.add('radio-checked');
        } else {
            const radioBtn = document.getElementById(`label${questionNo}_${optionList[i]}`);
            radioBtn.classList.remove('radio-checked');
        }
    }
}

/**
 * Iterates through all quiz questions and checks if each question has a checked radio button.
 * @returns true
 * If a question doesn't have a radio button checked, an error message is displayed.
 */
function validateChecked() {
    
    let allChecked = true;

    // Calls function to get username from url and assigns it to a variable
    let user = saveUserName();

    for (let i = 0; i <= questions.length - 1; i++) {
        
        let name = `question${[i]}`;
        // if radio button is unchecked (returns an empty string and posts null),
        // then sets allChecked to false
        if (document.querySelector(`input[name='${name}']:checked`) == null) {
            allChecked = false;
        }
    }

    if (allChecked == false) {
        alertMsg.innerHTML = `Hey ${user}, did you answer all questions?`;

        return false;
    }

    return true;
}

/**
 * If validateChecked function returns true, loops through all the questions and checks 
 * their value against the correct answer, if correct it increments the score by 1 and
 * calls the displayResults function taking the total score as a parameter.
 */
function getResults() {

    if (validateChecked()) {

        let correctTotal = 0;
        for (let i = 0; i <= questions.length - 1; i++) {
            
            // assigns a variable to the correct answer for each current question
            const correctAns = questions[i].correctAnswer;
            
            // assigns a variable to the question ID of each current question
            const questionID = questions[i].questionID;
            
            let name = `question${questionID}`;
            // stores the value of the selected radio button to the variable
            const selectedAnswer = document.querySelector(`input[name='${name}']:checked`).value;

            // checks if value of selected answer is equal to the correct answer
            if (selectedAnswer == correctAns)
            {
                // increments the total by 1 
                correctTotal += 1;
            }
        }

        displayResults(correctTotal);
    }
}