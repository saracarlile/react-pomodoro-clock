import React, { Component } from 'react';
import './App.css';

function Controls (props) {
    return (
      <div className="controls">
        <div className="sessionPanel">
          <p id="session-label">Session Length</p>
          <p id="sessoin-time"><button id="session-increment" disabled={props.timerRunning} onClick={props.incrementSession}>+</button><span id="session-length">{props.sessionLength}</span><button id="session-decrement"  disabled={props.timerRunning} onClick={props.decrementSession}>-</button></p>
        </div>
        <div className="breakPanel">
          <p id="break-label">Break Length</p>
          <p id="break-time"><button id="break-increment" disabled={props.timerRunning} onClick={props.incrementBreak}>+</button><span id="break-length">{props.breakLength}</span><button id="break-decrement" onClick={props.decrementBreak}>-</button></p>
        </div>
      </div>
    );
}



function TimePanel (props){
    return (
      <div className="time-panel">
        <div>
          <p id="timer-label">{props.workOrBreak}</p>
        </div>
        <div>
          <p id="time-left">{props.timeLeft}</p>
        </div>
        <div><button id="start_stop" onClick={props.stopStartCountdown}>Start</button><button id="reset" onClick={props.resetCountdown}>Reset</button></div>
        <audio id="beep" src="https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3" ></audio>
      </div>
    );
}

let myTimer = null; //global variable for myTimer to be used with window.setInterval()


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      sessionLength: 25,
      breakLength: 5, 
      workOrBreak: "Work Session",
      timerRunning: false,
      timeLeft: "25:00"
    }

    this.incrementSession = this.incrementSession.bind(this);
    this.decrementSession = this.decrementSession.bind(this);
    this.decrementBreak = this.decrementBreak.bind(this);
    this.incrementBreak = this.incrementBreak.bind(this);
    this.resetCountdown = this.resetCountdown.bind(this);
    this.updateText = this.updateText.bind(this);
    this.stopStartCountdown = this.stopStartCountdown.bind(this);
    this.playSound = this.playSound.bind(this);
    this.stopSound = this.stopSound.bind(this);
  }


  playSound = () => {
    let target = document.getElementById("beep");
    target.play();
/*    this.props.setDisplay(this.props.string);
    target.parentNode.className="drum-pad-active";
    setTimeout(() => { target.parentNode.className="drum-pad"; }, 1000);*/
}

stopSound = () => {
  let target = document.getElementById("beep");
  target.pause();
  target.currentTime = 0;
}

//setState is asynch so move the increment to the setState execution in the lifecycle
//https://stackoverflow.com/questions/39316376/how-to-use-the-increment-operator-in-react


  incrementSession = () => {
    if(this.state.sessionLength + 1 > 60) {
      return;
    }
    if(this.state.sessionLength <= 8) {
      if (this.state.workOrBreak === "Work Session") {
        this.setState((prevState, props) => ({
          sessionLength: prevState.sessionLength + 1,
          timeLeft: "0" + (prevState.sessionLength + 1).toString() + ":00"
        }));
      }
    }
    if(this.state.sessionLength >= 9){
      if (this.state.workOrBreak === "Work Session") {
        this.setState((prevState, props) => ({
          sessionLength: prevState.sessionLength + 1,
          timeLeft: (prevState.sessionLength + 1).toString() + ":00"
        }));
      }
    }
    if(this.state.workOrBreak === "Break Session") {
      this.setState((prevState, props) => ({
        sessionLength: prevState.sessionLength + 1
      }));
    }
  }

  

  incrementBreak = () => {
    if(this.state.breakLength + 1 > 60){
      return;
    }
    if(this.state.breakLength <= 8) {
      if(this.state.workOrBreak === "Break Sesssion") {
        this.setState((prevState, props) => ({
          breakLength: prevState.breakLength + 1,
          timeLeft: "0" + (prevState.breakLength + 1).toString() + ":00"
        }));
      }
    }
    if(this.state.breakLength >= 9 ) {
      if(this.state.workOrBreak === "Break Sesssion") {
        this.setState((prevState, props) => ({
          breakLength: prevState.breakLength + 1,
          timeLeft: (prevState.breakLength + 1).toString() + ":00"
        }));
      }
    }
    if(this.state.workOrBreak === "Work Session") {
      this.setState((prevState, props) => ({
        breakLength: prevState.breakLength + 1
      }));
    }
  }

  decrementSession = () => {
    if(this.state.sessionLength - 1 <= 0) {
      return;
    }
    if(this.state.sessionLength <= 10) {
      if (this.state.workOrBreak === "Work Session") {
        this.setState((prevState, props) => ({
          sessionLength: prevState.sessionLength -1,
          timeLeft: "0" + (prevState.sessionLength - 1).toString() + ":00"
        }));
      }
    }
    if(this.state.sessionLength >= 11){
      if (this.state.workOrBreak === "Work Session") {
        this.setState((prevState, props) => ({
          sessionLength: prevState.sessionLength -1,
          timeLeft: (prevState.sessionLength - 1).toString() + ":00"
        }));
      }
    }
    if(this.state.workOrBreak === "Break Session") {
      this.setState((prevState, props) => ({
        sessionLength: prevState.sessionLength + 1
      }));
    }
  }

  decrementBreak = () => {
    if(this.state.breakLength - 1 <= 0) {
      return;
    }
    if(this.state.breakLength <= 10 ) {
      if(this.state.workOrBreak === "Break Sesssion") {
        this.setState((prevState, props) => ({
          breakLength: prevState.breakLength - 1,
          timeLeft: "0" + (prevState.breakLength - 1).toString() + ":00"
        }));
      }
    }
    if(this.state.breakLength >= 11 ) {
      if(this.state.workOrBreak === "Break Sesssion") {
        this.setState((prevState, props) => ({
          breakLength: prevState.breakLength - 1,
          timeLeft: (prevState.breakLength - 1).toString() + ":00"
        }));
      }
    }
    if(this.state.workOrBreak === "Work Session") {
      this.setState((prevState, props) => ({
        breakLength: prevState.breakLength - 1
      }));
    }
  }

  resetCountdown = () => {  
    this.stopSound();
    this.setState({ 
      sessionLength: 25,
      breakLength: 5, 
      workOrBreak: "Work Session",
      timerRunning: false,
      timeLeft: "25:00"
    });
    window.clearInterval(myTimer);   
  };



  updateText = () => {
    
    if (this.state.workOrBreak === "Work Session") {
      let readTime = this.state.timeLeft;
      let splitTime = readTime.split(":");
      let minsInt = parseInt(splitTime[0], 10);
      let secsInt = parseInt(splitTime[1], 10);
      let total = minsInt * 60 + secsInt;
      total--;
      if(total >= 60) {
        let seconds = total % 60;
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        let timeLeftCalc = Math.floor(total / 60) + ":" + seconds;  //mins + ":" + seconds
        this.setState({
          timeLeft: timeLeftCalc.toString()
        })
      }
      if(total < 60) {
        let clockTime;
        if (total < 10) {
           clockTime = "00:0" + total.toString();  
        }
        else {
          clockTime = "00:" + total.toString();
        }
        this.setState({
          timeLeft: clockTime
        })
      }
      if (total === -1) {  //after timer reaches 00:00
        window.clearInterval(myTimer);
        let timeLeftSet;
        if(this.state.breakLength >= 10) {
          timeLeftSet = this.state.breakLength.toString() + ":01";
        }
        if(this.state.breakLength < 10) {
          timeLeftSet = "0" + this.state.breakLength.toString() + ":01";
        }
        this.setState({
          workOrBreak: "Break Session",
          timeLeft: timeLeftSet
        })
        this.playSound();
        setTimeout(() => {
          myTimer = window.setInterval(this.updateText, 1000);
        }, 400);
       
      }
    }


    if(this.state.workOrBreak == "Break Session") {
      let readBreakTime = this.state.timeLeft;
      let splitBreakTime = readBreakTime.split(':');
      let minsIntBreak = parseInt(splitBreakTime[0], 10);
      let secsIntBreak = parseInt(splitBreakTime[1], 10);
      let total = minsIntBreak * 60 + secsIntBreak;
      total--;
      if(total >= 60) {
        let seconds = total % 60;
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        let timeLeftCalc = Math.floor(total / 60) + ":" + seconds;  //mins + ":" + seconds
        this.setState({
          timeLeft: timeLeftCalc.toString()
        })
      }
      if(total < 60) {
        let clockTime;
        if (total < 10) {
           clockTime = "00:0" + total.toString();  
        }
        else {
          clockTime = "00:" + total.toString();
        }
        this.setState({
          timeLeft: clockTime
        })
      }
      if (total === -1) {  //after timer reaches 00:00
        window.clearInterval(myTimer);
        let timeLeftSet;
        if(this.state.sessionLength >= 10) {
          timeLeftSet = this.state.sessionLength.toString() + ":01";
        }
        if(this.state.sessionLength < 10) {
          timeLeftSet = "0" + this.state.sessionLength.toString() + ":01";
        }
        this.setState({
          workOrBreak: "Work Session",
          timeLeft: timeLeftSet
        })
        this.playSound();
        setTimeout(() => {
          myTimer = window.setInterval(this.updateText, 1000);
        }, 400);
      }
    }
  }



  stopStartCountdown = () => {
    if(this.state.timerRunning === false){
      myTimer = window.setInterval(this.updateText, 1000);
      this.setState({
        timerRunning: true,
      })
    }
    if(this.state.timerRunning === true){
      window.clearInterval(myTimer);
      this.setState({
        timerRunning: false
      })
    }
  }



  render() {
    return (
      <div id="container">
        <div id="pomorodo-clock">
          <div className="title"><h1>Pomorodo Clock</h1></div>
          < Controls sessionLength={this.state.sessionLength}
                     breakLength={this.state.breakLength}
                     timerRunning={this.state.timerRunning} 
                     incrementSession={this.incrementSession}
                     incrementBreak={this.incrementBreak}
                     decrementSession={this.decrementSession}
                     decrementBreak={this.decrementBreak}
          />
          < TimePanel sessionLength={this.state.sessionLength}
                     breakLength={this.state.breakLength}
                     timerRunning={this.state.timerRunning} 
                     workOrBreak={this.state.workOrBreak}
                     resetCountdown={this.resetCountdown}
                     timeLeft={this.state.timeLeft}
                     stopStartCountdown={this.stopStartCountdown}
                     />
        </div>
      </div>
    );
  }
}

export default App;
