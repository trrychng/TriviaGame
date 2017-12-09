var timer= 15;
var score=0
var delay = 3;
var qc=0; //question counter 
var correct=0;
var wrong=0;
var noanswer=0;
var game = true;
var assets="assets/images/"


var data = [ //adding additional objects will increase the questions on trivia 
//ALWAY PUT RIGHT ANSWER in the first selection!
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




function generator(x){
  $("#game").empty();
  var checker =[];
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
  score=0
}



 function run() {
  if(data.length > qc)
  {
    console.log("starting question");
    intervalId = setInterval(count, 1000);
    generator();
  }
  else{
    console.log("gameover");
    gameover();
  }
       
}



function gameover(){
  $("#game").empty();
  var h1 =$("<h1>");
  score=(correct/data.length*100).toFixed(2);
  h1.html('<h1>GAME OVER</h1><p>Your Score is : '+score+'%</p>');

  $("#game").append(h1);
  qc=0;
  setTimeout(run,1000*delay*5);

  div =$("<div>");
  div.attr("id","stats")
  div.text("Correct answers :"+correct);
  $("#game").append(div);
  
  div =$("<div>");
  div.text("Incorrect answers :"+wrong);
  $("#stats").append(div);
  div =$("<div>");
  div.text("Unanswered :"+noanswer);
  $("#stats").append(div);

  correct=0;
  wrong=0;
  noanswer=0;
}



 function count() {
    //  Decrease number by one.
    timer--;
    if(timer===0){
    $('#Timeline').text("TIME'S UP!!!!!");
    answercheck(-1); } 
    $("#Time").html(timer);

}


function answercheck(x){
  clearInterval(intervalId);
  $("#board").empty();

  p = $("<p>");
  if(x ===0){
  p.text("THAT'S CORRECT! "+data[qc].answers[0]+".");
  p.addClass("text-secondary");
  correct++;
  }
  else {
  p.text("You selected " +data[qc].answers[x]+". The Correct Answer is "+data[qc].answers[0]+"!");
  p.addClass("text-secondary");
  if(timer===0){
    noanswer++;
  }
  else{
    wrong++;
  }


  }
  $("#board").append(p); //updates on HTML
  var Image = $("<img>");
  Image.attr("src", assets+data[qc].image);
  Image.attr("alt", "trivia image");
  $("#board").append(Image);
  assets

  game=false;
  reset();

  setTimeout(run,1000*delay);

}



run();


function buttonClick() { 
$(".answer").on("click", function() {
console.log($(this).attr("value"));
var selection =$(this).attr("value");
var x= parseInt(selection)
answercheck(x);

});
}




console.log(data.length);

console.log(data[qc].question);








// $("#Start").on("click", Start);






