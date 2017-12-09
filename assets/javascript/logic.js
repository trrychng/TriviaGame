var timer= 15; //timer for question
var delay = 3; //timer for answer
var assets="assets/images/" //map to images in root.

//declaring game variables
var score=0
var qc=0; //question counter 
var correct=0; //user correct
var wrong=0; //user wrong
var noanswer=0; //user unanswered
var game = true; //boolean filed no used at the moment.



var data = [ //adding additional objects will increase the questions on trivia 
//CORRECT ANSWER should be the first array in answers in object so answer[0] is marked as correct.
  {
    question: "Who was in the boy band N'SYNC?",
    answers: ["Chris Kirkpatrick", "Justin Bieber","Mariah Carey","Donald Trump"],
    image: "nsync.jpg",
  },

  {
    question: "From the TV show Saved by the Bell, what is Screech's Real Name?",
    answers: ["Dustin Neil Diamond", "Geri Halliwell","Paul Gascoigne","Cherie Blair"],
    image: "screech.jpg",
  },

  {
    question: "What animal is Pinky from the TV show Pinky and the Brain?",
    answers: ["Mouse", "Snake","Pokemon","Donald Trump"],
    image: "brainpinky.jpg",
  },

{
    question: "In X-Men, what was Logan's alias?",
    answers: ["Wolverine", "Magneto","Rogue","Gambit"],
    image: "wolverine.jpg",
  },

{
    question: "Which one of these is NOT a cast on Teenage Mutant Ninja Turtles?",
    answers: ["Pikachu", "April","Shredder","Beebop"],
    image: "tmnt.jpeg",
  },

{
    question: "In Dragon Ball Z, Goku is what race?",
    answers: ["Saiyan", "Human","Chinese","European"],
    image: "dbz.jpg"
  }

]




function generator(x){  // function generates the time / question / answer
  $("#game").empty(); //empties out the div as correct answer + image are removed
  var checker =[]; // variable to ensure there are no duplicates and clears
  
  p = $("<p>");  // creates div 
  p.html('<p id=Timeline> Timer: <span id="Time">'+timer+'</span> seconds</p>'); // add class
  
  $("#game").append(p) //appends this to game div

  p = $("<p>"); //creates question
  p.attr('id', "board")  // creates ID board for question
  p.text(data[qc].question); //add text with question from data variable
  p.addClass("text-secondary question"); // add class to this
  $("#game").append(p); //appends game div with new div of board


  while(data[qc].answers.length > checker.length){ //randomize the answer selections
    var i=Math.floor(Math.random()*(data[qc].answers.length)); //same as above but random number generator
    if(checker.indexOf(i) === -1){ //ensures no duplicate
      console.log(i);  //logs
      checker.push(i); //start pushing to array if answer is used
      console.log(checker); //logs
      p = $("<p>");  // creates div 
      p.addClass("answer"); // add class
      p.attr('value', i); // adds values
      p.text(data[qc].answers[i]); // text for button
      $("#board").append(p); //appends to div #board
    }
  }
  // buttonClick();  // remapping purposes 'old way of doing Jquery class listener' < search for this to enable old way
}



function reset(){
  timer= 15; // resets timer
  qc++; //determines which question you are on
  score=0 //resets score calculation from GameOver function
}



 function run() {
  if(data.length > qc) //ensures that there are still questions to be generated
  {
    console.log("starting question"); 
    intervalId = setInterval(count, 1000); // timers
    generator(); //generates the HTML function
  }
  else{
    console.log("gameover");  //if no more  qc in data this game will be over
    gameover(); //game over function
  }
       
}



function gameover(){ //gameover function
  $("#game").empty(); //empty game div
  h1 =$("<h1>"); //header1 html
  score=(correct/data.length*100).toFixed(2); //ensures 2 decimal for percentage
  h1.html('<h1>GAME OVER</h1><p>Your Score is : '+score+'%</p>'); //updates text with score

  $("#game").append(h1); //updates html
  
  setTimeout(run,1000*delay*4); // longer wait time for delay allows user see score + stats

  div =$("<div>"); //creates stats of correct, wrong, and unanswered to html
  div.attr("id","stats")
  div.text("Correct answers :"+correct);
  $("#game").append(div);
  
  div =$("<div>");
  div.text("Incorrect answers :"+wrong);
  $("#stats").append(div);
  div =$("<div>");
  div.text("Unanswered :"+noanswer);
  $("#stats").append(div);

  qc=0; //restarts question for new game
  correct=0; //restarts correct answer for new game 
  wrong=0;  //restarts wrong answer for new game 
  noanswer=0; //restarts unaswer answer for new game 
}



 function count() { //timer for the questions to display
    //  Decrease number by one.
    timer--; //reduced timer by 1
    if(timer===0){ // if timer is 0 it will submit -1 to answer  function
    $('#Timeline').text("TIME'S UP!!!!!");
    answercheck(-1); } 
    $("#Time").html(timer);  //update time on html

}


function answercheck(x){
  clearInterval(intervalId); //stops timer.
  $("#board").empty();  //clears the display

  p = $("<p>"); //clears html to show CORRECT answer
  if(x ===0){ //if user selected first answer[0] this will be correct
  p.text("THAT'S CORRECT! "+data[qc].answers[0]+"."); // update text
  p.addClass("text-secondary"); //adding class
  correct++; //updates correct
  }
  else { //otherwise user enter incorrect answer or times out
  p.text("You selected " +data[qc].answers[x]+". The Correct Answer is "+data[qc].answers[0]+"!");//updates text
  p.addClass("text-secondary");//add class
  if(timer===0){ //if timer is 0 updates noanswer variable
    noanswer++;
  }
  else{ //if user enter wrong answer updates wrong
    wrong++;
  }


  } // creates image tag off data object image
  $("#board").append(p); //updates on HTML
  var Image = $("<img>");
  Image.attr("src", assets+data[qc].image);
  Image.attr("alt", "trivia image");
  $("#board").append(Image);
  assets

  game=false;
  reset(); //reset function is ran so it will continue to next question reset variables such as timers and +1 to question count

  setTimeout(run,1000*delay); //runs next set of question generation

}



run(); //starts the game. should probably create on click start game.


$(document.body).on("click", ".answer", function() { // listener on answer

console.log($(this).attr("value")); //logs
var selection =$(this).attr("value"); //assigns user inut to selection
var x= parseInt(selection); // converts user input(string) to integer 
answercheck(x); //passes int from variable x to answercheck function

});


//---- old way of doing Jquery class listener
// function buttonClick() { 
// $(".answer").on("click", function() {
// console.log($(this).attr("value"));
// var selection =$(this).attr("value");
// var x= parseInt(selection)
// answercheck(x);

// });
// }




console.log(data.length); //log

console.log(data[qc].question); // log
 







// $("#Start").on("click", Start);






