import React from 'react';
import ReactDOM from "react-dom";
import IndexComponent from "./IndexComponent";

class GameComponent extends React.Component {

    constructor(props){
        super(props);
        this.state={
            questions:[],
            score:0,
            questionsNum:0,
            questionCounter:-1
        }
    }

    componentDidMount() {
        this.setState({
            questions: Array.from(this.props.questions),
            score: 0,
            questionsNum: Array.from(this.props.questions).length,
            questionCounter: -1
        }, () => {
            this.newQuestion();
        })
    }

    render () {
        return(
            <div id="game-form">
                <h4 id="timer"/>
                <h2 id="questionContainer"/>
                <div id="buttonContainer" class="btn-grid"/>
                <div id="control" className="control"/>
            </div>
        );
    }


    newQuestion=()=>{
        if(++this.state.questionCounter==this.state.questionsNum)
            this.endGame();
        else
            this.appendQuestion();
    }

    appendQuestion=()=>{
        var seconds=20;
        var timer=document.getElementById("timer");
        var x = setInterval( ()=> {
            timer.innerHTML = "seconds left:"+seconds;
            seconds-=1;
            if(seconds<0) {
                clearInterval(x);
                timer.innerHTML="";
                this.newQuestion();
            }
        }, 1000);

        var question=this.state.questions[this.state.questionCounter];
        var wrong = question.incorrect_answers;
        var correctAnswer = question.correct_answer;
        var text = question.question;

        var body=document.getElementById("body");

        var questionContainer = document.getElementById("questionContainer");
        questionContainer.innerHTML = text;

        var buttonContainer=document.getElementById("buttonContainer");
        buttonContainer.innerHTML="";

        var control=document.getElementById("control");
        control.innerHTML="";

        var incorrectAnswers = wrong.split("*next*");

        var answersNumber = incorrectAnswers.length + 1;
        var correctIndex = Math.floor(Math.random() * answersNumber); //genera random index for a correct answer

        for (let i = 0; i < answersNumber; ++i) {
            var button = document.createElement("button");

            if (i != correctIndex) {
                button.className="btn wrong";
                button.innerHTML = this.getRandomElement(incorrectAnswers);
                button.onclick=(event)=>{
                    event.preventDefault();
                    body.className="wrong";
                    clearInterval(x);
                    timer.innerHTML="";
                    this.newQuestion();
                }
            }

            else {
                button.className="btn";
                button.innerHTML = correctAnswer;
                button.onclick = (event) => {
                    event.preventDefault();
                    body.className="correct";
                    this.state.score++;
                    clearInterval(x);
                    timer.innerHTML="";
                    this.newQuestion();
                }
            }

            buttonContainer.appendChild(button);

        }

        var nextButton = document.createElement("button");
        nextButton.innerHTML="Skip";
        nextButton.className="btn next-btn";

        nextButton.onclick=(event)=>{
            clearInterval(x);
            timer.innerHTML="";
            this.newQuestion();
            body.className=""
        }

        control.appendChild(nextButton);

    }

    getRandomElement(array){
        var index=Math.floor(Math.random() * array.length);
        var element=array[index];
        array.splice(index, 1);
        return element;
    }

    endGame() {

        document.getElementById("body").className="";

        var game_form=document.getElementById("game-form")
        game_form.innerHTML="";

        var big_header=document.createElement("h1");
        big_header.innerHTML="Congratulations!"+" &#x1F389;";
        game_form.appendChild(big_header);

        var score_header=document.createElement("h3");
        score_header.innerHTML="Total score:"+this.state.score+"/"+this.state.questionsNum;
        game_form.appendChild(score_header);

        var control=document.createElement("div");
        control.className="control";

        var restartButton=document.createElement("button");
        restartButton.className="btn";
        restartButton.innerHTML="Play again";

        restartButton.onclick=(event)=>{
            event.preventDefault();
            ReactDOM.render(<IndexComponent/>, document.getElementById('root'));
        };

        control.appendChild(restartButton);
        game_form.appendChild(control);

    }

}

export default GameComponent
