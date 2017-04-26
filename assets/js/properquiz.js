
 var questions = [
        {
            question: "Which actor turned down the role of Neo in the Matrix?",
            choices: ["Will Smith", "Leonardo Dicaprio", "Christian Bale", "Tom Cruise"],
            correctAnswer: 0
        },
        {
            question: "Who directed Pulp Fiction?",
            choices: ["Steven Spielberg", "Ridley Scott", "Quentin Tarantino", "Martin Scorcese"],
            correctAnswer: 2
        },
        {
            question: "What is Christopher Nolan's Highest Grossing Film?",
            choices: ["The Prestige", "The Dark Knight Rises", "The Dark Knight", "Interstellar"],
            correctAnswer: 2

        },
        {
            question: "Which film won the Oscar for best Picture in 2015?",
            choices: ["The Revenant", "Spotlight", "The Big Short", "The Martian"],
            correctAnswer: 1
        },
        {   
            question: "Which movie was NOT directed by Michael Bay?",
            choices: ["Pearl Harbor", "Transformers", "Bad Boys 2", "Pacific Rim"], 
            correctAnswer: 3

        }]; 

var questionCounter = 0; //Tracks question number
var selections =[]; //Array containing user choices
var quiz = $('#quiz'); //Quiz div object

// Display initial question
$('#quiz').hide();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    displayNext();
    questionCounter++
    
  });
  
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }

   // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right!!!');
    return score;
  }
  
