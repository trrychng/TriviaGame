var timer= 15;
var score = 0;
var delay = 3;
var qc=0; //question counter 
var correct=0;
var wrong=0;
var noanswer=0;
var game = true;


var data = [ //adding additional objects will increase the questions on trivia
  {
    question: "Who was in the boy band N'SYNC?",
    answers: ["Chris Kirkpatrick", "Justin Bieber","Mariah Carey","Donald Trump"],
  },

  {
    question: "From the TV show Saved by the Bell, what is Screech's Real Name?",
    answers: ["Dustin Neil Diamond", "Geri Halliwell","Paul Gascoigne","Cherie Blair"],
  }

]




function generator(x){
  $("#game").empty();
  var checker =[];
  var p = $("<p>"); 
  console

  p = $("<p>");  // creates div 
  p.html('<p id=Timeline> Timer: <span id="Time">'+timer+'</span> seconds</p>'); // add class
  $("#game").append(p)

  p = $("<p>");
  p.attr('id', "board")
  p.text(data[qc].question);
  p.addClass("text-secondary");
  $("#game").append(p); //displays question on HTML


  while(data[qc].answers.length > checker.length){  //creates #'s of button based on numButtons
    var i=Math.floor(Math.random()*(data[qc].answers.length));
    if(checker.indexOf(i) === -1){ //ensures no duplicate
      console.log(i);
      checker.push(i); //start pushing to array
      console.log(checker);
      p = $("<p>");  // creates div 
      p.addClass("answer"); // add class
      p.attr('value', i); // adds values
      p.text(data[qc].answers[i]); // text  for button
      $("#board").append(p); //appends to div buttons
    }
  }
  buttonClick();
}



function reset(){
  timer= 15;
  qc++;
}



 function run() {
  if(data.length > qc)
  {
    console.log("starting question");
    intervalId = setInterval(Game, 1000);
    generator();
  }
  else{
    console.log("gameover");
  }
  
  

    
}



 function Game() {


      //  Decrease number by one.
    timer--;
    if(timer===0){
    // $('#Timeline').html('<h1>T"OUT OF TIME"</h1>);
    answercheck(-1); } 
    //  Show the number in the #show-number tag.
    $("#Time").html(timer);

}


function answercheck(x){
  clearInterval(intervalId);
  $("#board").empty();
  var p = $("<p>"); 
  p = $("<p>");

  if(x ===0){
  p.text("CORRECT!");
  p.addClass("text-secondary");

  }
  else {
  p.text("The Correct Answer is "+data[qc].answers[0]);
  p.addClass("text-secondary");
  if(timer===0){
    noanswer++;
  }
  else{
    wrong++;
  }


  }
  $("#board").append(p); //displays question on HTML
  // --------- TERRY ADD IMAGE URL -------------

  game=false;
  reset();
  setTimeout(run,1000*delay);

}



run();


function buttonClick() { 
$(".answer").on("click", function() {
console.log($(this).attr("value"));
var selection =$(this).attr("value");

answercheck(selection);




});
}




console.log(data.length);

console.log(data[qc].question);








// $("#Start").on("click", Start);






