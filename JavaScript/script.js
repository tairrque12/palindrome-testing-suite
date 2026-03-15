// console.log(document.querySelector(`.message`).textContent);
//
// //This selects message in my HTML FILE AND CHANGES THE TEXT CONTENT IF I USE A = SIGN
// document.querySelector(`.message`).textContent = `Correct Number!`;
//
// //THIS DIRECTLY CHANGES THE NUMBERS IN HTML FILE USING SELECTOR
// document.querySelector(`.number`).textContent = `13`;
// document.querySelector(`.score`).textContent = `10`;
//
//
// //FOR INPUT FIELD YOU CAN SET IT BY SETTING IT EQUAL TO A VALUE
// document.querySelector(`.guess`).value = 23;
// console.log(document.querySelector(`.guess`).value);
//
//
// //HANDLING CLICK EVENTS
// //AN EVENT IS ANYTHING THAT HAPPENS ON THE PAGE, THE EVENT LISTENER WAITS FOR SOMETHING TO HAPPEN AND REACTS TO IT.

//

let secretNumber= Math.trunc(Math.random()*20 + 1);
//THIS PUTS THE SECRET NUMBER TO BE SOMEWHERE BETWEEN 1 AND 20
let score = 20;
//THIS IS SETTING THE SCORE OF THE GAME THAT WILL DECREASE IF ANSWERED INCORRECTLY



document.querySelector(`.check`).addEventListener(`click`, function (){
    const guess = Number((document.querySelector(`.guess`).value));
    console.log(guess, typeof guess);

       //WHEN THERE IS NO INPUT (O)
    if (!guess){
        document.querySelector(`.message`).textContent = `No Number Was Entered 🛑`

          //WHEN THE PLAYER WINS
    }else if (guess === secretNumber) {
        document.querySelector(`.message`).textContent = `Congrats! You Are Correct!`;

        //CHANGING THE CSS STYLE TO GREEN IF YOU WIN.
        //WHEN MANIPULATING STYLES ALWAYS USE STRINGS
        document.querySelector(`body`).style.backgroundColor = `#60b347`;

        //CHANGING THE WIDTH OF THE NUMBER.
        document.querySelector(`.number`).style.width =`30rem`;

          //WHEN GUESS IS TOO HIGH
    } else if ( guess > secretNumber){
        if (score > 1){
            document.querySelector(`.message`).textContent = `Guess Too High!`
            score--;
            document.querySelector(`.score`).textContent = score;
        } else {
            document.querySelector(`.message`).textContent = `You Lost The Game`

            //CHANGES THE CSS STYLE IF YOU LOSE AND TOO HIGH
            document.querySelector(`body`).style.backgroundColor = `#FF0000`;
            document.querySelector(`.score`).textContent = 0;
        }
            //WHEN GUESS IS TOO LOW
    } else if (guess <secretNumber) {
        if (score > 1) {
            document.querySelector(`.message`).textContent = `Guess Too Low!`
            score--;
            document.querySelector(`.score`).textContent = score;
        } else {

            document.querySelector(`.message`).textContent = `You Lost The Game`;
            //CHANGING THE CSS STYLE TO RED IF YOU LOSE AND TOO LOW
            document.querySelector(`body`).style.backgroundColor = `#FF0000`;
            document.querySelector(`.score`).textContent = 0;
        }
    }
});

document.querySelector(`.again`).addEventListener(`click`, function (){
    secretNumber = Math.trunc(Math.random()*20 + 1);
})
