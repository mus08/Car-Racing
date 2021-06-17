const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');
//console.log(score);

startScreen.addEventListener('click', start);

let player = { speed: 10, score: 0 };


document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp); //call back function ko call/invoke

let keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false }

function keyDown(e) {
    e.preventDefault(); //to prevent default functionality of java script
    keys[e.key] = true;
    //console.log(e.key); // konsi key ko user press vo print hui
    //console.log(keys); // showing object ka true or false
}

function keyUp(e) {
    e.preventDefault(); //to prevent default functionality of java script
    keys[e.key] = false;
    // console.log(e.key); // konsi key ko user release (ab jis key ko press to ussi ko hi release krega)
    // console.log(keys); // showing object ka true or false
}

function isCollide(a, b) { // where a is for position of actual car and b is for position of enemy car
    aRect = a.getBoundingClientRect(); //for actual car ke to get left, top, width, height etc things
    bRect = b.getBoundingClientRect(); //for Enemy Car ke to get left, top, width, height etc things

    return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
        //agar upar ki condiions mein se koi ek bhi false hua to return kar jaega ..means collision hua h and game ko krna h stop
}

function moveLines() {
    let lines = document.querySelectorAll('.lines'); // isse all 5 lines aa jaengi

    lines.forEach(function(item) {

        if (item.y >= 700) {
            item.y -= 750;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";

    })
}

function endGame() {
    player.start = false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML = "Game Over<br>Your final score is " + player.score + "<br>Press here to Restart the Game";
}


//move enemycars
function moveEnemy(car) {
    let enemy = document.querySelectorAll('.enemy'); // isse all 3 enemy aa jaengi

    enemy.forEach(function(item) {

        if (isCollide(car, item)) {
            console.log("Boom HIT");
            endGame();
        }

        if (item.y >= 750) {
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 350) + "px";
        }
        item.y += player.speed;
        item.style.top = item.y + "px";

    })
}

function gamePlay() {
    //console.log("Hey i am clicked");
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect(); //Element.getBoundingClientRect()---to get left , top , width ,height etc things
    //console.log(road);

    if (player.start) {

        moveLines();
        moveEnemy(car);

        if (keys.ArrowUp && player.y > road.top + 70) { player.y -= player.speed }
        if (keys.ArrowDown && player.y < (road.bottom - 85)) { player.y += player.speed }
        if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed }
        if (keys.ArrowRight && player.x < (road.width - 50)) { player.x += player.speed } // player.x ki position should be less than 400(width)-50(car width)

        car.style.top = player.y + "px"; // concatinate with pixel
        car.style.left = player.x + "px";


        window.requestAnimationFrame(gamePlay);
        console.log(player.score++);
        player.score++;
        let ps = player.score - 2;
        score.innerText = "Score:" + ps;

    }


}
//with the help ofwinndow.requestAnimatioFrame()---same function ke andar multiplle times loop
//by default window object in javascript

function start() {

    // gameArea.classList.remove('hide'); // when click then to remove hide class
    startScreen.classList.add('hide');
    gameArea.innerHTML = ""; // empty


    player.start = true; // means player wants to play
    player.score = 0;
    window.requestAnimationFrame(gamePlay);

    //for lines
    for (x = 0; x < 5; x++) {
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class', 'lines');
        roadLine.y = (x * 150);
        roadLine.style.top = roadLine.y + "px"; // here inspite of top we can write height also    // but better option is top over height
        gameArea.appendChild(roadLine);

    }


    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    // car.innerText = "hey i am yr car";
    gameArea.appendChild(car);

    player.x = car.offsetLeft; // setting property of player
    player.y = car.offsetTop;



    //for cars
    for (x = 0; x < 3; x++) {
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class', 'enemy');
        enemyCar.y = ((x + 1) * 350) * -1;
        enemyCar.style.top = enemyCar.y + "px"; // here inspite of top we can write height also    // but better option is top over height
        enemyCar.style.backgroundColor = randomColor();
        enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
        gameArea.appendChild(enemyCar);

    }
    // console.log("top position " + car.offsetTop); //to know at how much distance is car from top
    // console.log("left position " + car.offsetLeft); //to know at how much distance is car from left

}

function randomColor() {
    function c() {
        let hex = Math.floor(Math.random() * 256).toString(16);
        return ("0" + String(hex)).substr(-2);
    }
    return "#" + c() + c() + c(); //hexacolor ormat return



}
//in javascript everythng is object