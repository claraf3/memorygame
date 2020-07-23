//grab scoreboard output elements
const turn_output = document.getElementById('turns_out');
const match_output = document.getElementById('match_out');
const won_output = document.getElementById('won_out');

//grab front image (doors) elements
const front_img = document.querySelectorAll('table td img:first-child');
const back_img = document.querySelectorAll('table td img:nth-child(2)');

//grab buttons
const start_btn = document.getElementById('start_btn');
const end_btn = document.getElementById('end_btn');


//variables
let turn = 0;
let pair_found = 0 ;
let games_won = 0;

const NUM_OF_CHARS = 8;

let doors_opened = 0;
let door1;
let door2;
let door1_back_img;
let door2_back_img;

let ranNum;


//test store block 1
const block1_f = document.getElementById('block1_f');

//disables drag
front_img.forEach(e => e.setAttribute('draggable', false));
back_img.forEach(e => e.setAttribute('draggable', false));


//buttons to start and end game
start_btn.addEventListener("click", function() {
    alert('Game Start!');
    startGame();
  
});

end_btn.addEventListener('click', function() {
    alert('Game End. Thanks for playing.');
    endGame();
});


//Event Handlers

//Method to start the game. Randomizes hidden pictures and attaches 'click' event listener to the pictures 
//hides start button and shows end game button
function startGame() {

    start_btn.setAttribute('disabled', 'disabled');
    start_btn.style.display = "none";

    end_btn.style.display = "block";
    end_btn.removeAttribute('disabled');

    randomizeChars();
    front_img.forEach(e => e.addEventListener("click", revealPair));

}

//Method to end game. Removes pictures event listeners, resets the pictures, and resets scoreboard
//hides end game button and shows start button
function endGame() {

    start_btn.style.display = "block";
    start_btn.removeAttribute('disabled');

    end_btn.style.display = "none";
    end_btn.setAttribute('disabled', 'disabled');

    //reset pictures
    front_img.forEach(e => e.removeEventListener("click", revealPair));
    closeAllDoors();

    //reset scoreboard
    turn = 0;
    pair_found = 0;
    updateScoreBoard();
}

//Event listener for the pictures.
//If pair is found, increase pair_found
//If pair is not found, hides pictures after 800ms delay
function revealPair() {

    //max two doors can be opened per turn
    if(doors_opened < 2) {   
        revealDoor.call(this);
        //when two doors are opened
        if(doors_opened == 2) {

            //if the two revealed objects don't match, hides both pictures
            if(door1_back_img.src !== door2_back_img.src) {
                setTimeout(function() {
                    door1.style.visibility="visible";
                    door2.style.visibility="visible";
                    doors_opened = 0;
                }, 800);       
            }
            //else, pair_found + 1
            else if (door1_back_img.src === door2_back_img.src) {
                pair_found++;
            } 

            //update scoreboard 
            turn++;
            updateScoreBoard();
            //reset door_opened to 0, read for next turn
            setTimeout(function() {
                doors_opened = 0;
            }, 800);

            //if all pairs found, end game and update games_won score
            if(pair_found == NUM_OF_CHARS) {

                setTimeout(function() {
                    alert('You have saved all the lost explorers. You have our heartfelt thanks brave adventurer.');
                    games_won++;
                    won_output.innerText = games_won;
                    endGame();
                }, 800);

            }
        }
    }   
}

//reveals hidden pictures and stores revealed pictures to variable reference
function revealDoor() {
    this.style.visibility = "hidden";
    doors_opened++;    

    if(doors_opened ==1 ) {
        door1 = this;
        door1_back_img = door1.parentElement.childNodes[1];
    }
    if(doors_opened == 2) {
        door2 = this;
        door2_back_img = door2.parentElement.childNodes[1];
    } 
} 

//randomize hidden pictures
function randomizeChars() {

    let chars = [];
    let source;

    //add pictures to array
    for(let i = 1; i <= NUM_OF_CHARS * 2; i++) {
        source = `images/characters/char${i}.png`;
        if(i > 8) {
            source = `images/characters/char${i-8}.png`;
        }
        chars.push(source);
    }

    //populate each square with random characters, max two of each character per game
    for(let i = 1; i <= NUM_OF_CHARS * 2; i++) {
        // `block${i}`;
        ranNum = Math.floor(Math.random() * chars.length);
        document.getElementById(`block${i}`).src=chars[ranNum];
        chars.splice(ranNum, 1);        
    }
}


//update score board for each game 
//update turns taken and current number of pairs found
function updateScoreBoard() {
    turn_output.innerText = turn;
    match_output.innerText = pair_found;
}

//hids all pictures
function closeAllDoors() {
    front_img.forEach(e => e.style.visibility = "visible");
   
}





