$(document).ready(function () {
  // Declaring variables to be used below
  let randnum = rand();
  let comp = "";
  let player = "";
  let matchCompleted = false;
  let doubleClicked = false;

  // Based on random function determing whether to use X or O for game play
  function rand() {
    let num = Math.random();
    if (num < 0.5) {
      return 0;
    } else {
      return 1;
    }
  }

  const resetButton = document.querySelector('#reset-button');
  resetButton.addEventListener('click', function() {
  location.reload();
});


  // setting the X and O variable based on the random number
  if (randnum === 1) {
    comp = "<h1>X</h1>";
    player = "<h1>O</h1>";
  } else {
    player = "<h1>X</h1>";
    comp = "<h1>O</h1>";
  }

  // on click function
  $("#table div").click(function () {
    // checking the closest div
    var mark = $(this).closest("div");
    playerTurn(mark);
    if (doubleClicked) {
      doubleClicked = false;
      return;
    }
    //using a timeout to have an interactive gameplay
    setTimeout(ttable, 300);
  });

  function playerTurn(mark) {
    // the below if statment is for if the player accidently clicked the same box twice
    // in that case the function will get restarted
    if (mark[0].innerHTML !== "") {
      doubleClicked = true;
      return;
    } else {
      mark[0].innerHTML = player;
      winningCondition(player);
      return;
    }
  }
  // computer gameplay based on random numbers
  function ttable() {
    let temp = $("#table div");
    let newRand = Math.floor(Math.random() * 9);
    let count = 0;

    // searching throught the array to find any div if empty for the computer to interact with
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].innerHTML !== "") {
        count += 1;
        if (count === 8) {
          if (matchCompleted === false) {
            drawResultDisplay();
          }
          return;
        }
      }
    }

    //checking condition if the game is already won just stop the function
    if (matchCompleted) return;

    // if the array is found where innerHTML is blank using random generation, fill the HTML
    // and then check the winning conditions
    if (temp[newRand].innerHTML === "") {
      temp[newRand].innerHTML = comp;
      winningCondition(comp);
    } else {
      ttable();
    }
  }

  // winning conditions for both player and computer
  function winningCondition(argument) {
    let htmlTest = $("#table div");
    // this condition checks if the player or computer won
    // if one of the entities won it will disable the click function
    if (
      (htmlTest[0].innerHTML === player &&
        htmlTest[1].innerHTML === player &&
        htmlTest[2].innerHTML === player) ||
      (htmlTest[3].innerHTML === player &&
        htmlTest[4].innerHTML === player &&
        htmlTest[5].innerHTML === player) ||
      (htmlTest[6].innerHTML === player &&
        htmlTest[7].innerHTML === player &&
        htmlTest[8].innerHTML === player) ||
      (htmlTest[0].innerHTML === player &&
        htmlTest[3].innerHTML === player &&
        htmlTest[6].innerHTML === player) ||
      (htmlTest[1].innerHTML === player &&
        htmlTest[4].innerHTML === player &&
        htmlTest[7].innerHTML === player) ||
      (htmlTest[2].innerHTML === player &&
        htmlTest[5].innerHTML === player &&
        htmlTest[8].innerHTML === player) ||
      (htmlTest[0].innerHTML === player &&
        htmlTest[4].innerHTML === player &&
        htmlTest[8].innerHTML === player) ||
      (htmlTest[2].innerHTML === player &&
        htmlTest[4].innerHTML === player &&
        htmlTest[6].innerHTML === player)
    ) {
      matchCompleted = true;
      $("#table div").off("click");
      return wonResultDisplay();
    } else if (
      (htmlTest[0].innerHTML === comp &&
        htmlTest[1].innerHTML === comp &&
        htmlTest[2].innerHTML === comp) ||
      (htmlTest[3].innerHTML === comp &&
        htmlTest[4].innerHTML === comp &&
        htmlTest[5].innerHTML === comp) ||
      (htmlTest[6].innerHTML === comp &&
        htmlTest[7].innerHTML === comp &&
        htmlTest[8].innerHTML === comp) ||
      (htmlTest[0].innerHTML === comp &&
        htmlTest[3].innerHTML === comp &&
        htmlTest[6].innerHTML === comp) ||
      (htmlTest[1].innerHTML === comp &&
        htmlTest[4].innerHTML === comp &&
        htmlTest[7].innerHTML === comp) ||
      (htmlTest[2].innerHTML === comp &&
        htmlTest[5].innerHTML === comp &&
        htmlTest[8].innerHTML === comp) ||
      (htmlTest[0].innerHTML === comp &&
        htmlTest[4].innerHTML === comp &&
        htmlTest[8].innerHTML === comp) ||
      (htmlTest[2].innerHTML === comp &&
        htmlTest[4].innerHTML === comp &&
        htmlTest[6].innerHTML === comp)
    ) {
      matchCompleted = true;
      $("#table div").off("click");
      console.log('you lost')
      return lostResultDisplay();
    }
  }

  function wonResultDisplay() {
    $('#result')[0].innerHTML = '<h1 style="color: green;">You won!</h1>'
  }

  function lostResultDisplay() {
    $('#result')[0].innerHTML = '<h1 style="color: red;">You lost!</h1>'
  }

  function drawResultDisplay() {
    $('#result')[0].innerHTML = '<h1 style="color: purple;">Draw!</h1>'
  }

});

