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
        <div><button id="start_stop" onClick={props.countdown}>Start</button><button id="reset" onClick={props.resetCountdown}>Reset</button><button id="stop" onClick={props.stopCountdown}>Stop</button></div>
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
    this.toggleWorkBreakSession = this.toggleWorkBreakSession.bind(this);
    this.updateText = this.updateText.bind(this);
    this.countdown = this.countdown.bind(this);
    this.stopCountdown = this.stopCountdown.bind(this);
    
  }

//setState is asynch so move the increment to the setState execution in the lifecycle
//https://stackoverflow.com/questions/39316376/how-to-use-the-increment-operator-in-react

  incrementSession = () => {
    if(this.state.sessionLength + 1 > 60){
      return;
    }
    if(this.state.workOrBreak === "Work Session") {
      this.setState((prevState, props) => ({
        sessionLength: prevState.sessionLength + 1,
        timeLeft: (prevState.sessionLength + 1).toString() + ":00"
      }));
    }
    if(this.state.workOrBreak === "Break Session") {
      this.setState((prevState, props) => ({
        sessionLength: prevState.sessionLength + 1
      }));
    }
  }

  decrementSession = () => {
    if(this.state.sessionLength - 1 <= 0) {
      return;
    }
    if (this.state.workOrBreak === "Work Session") {
      this.setState((prevState, props) => ({
        sessionLength: prevState.sessionLength -1,
        timeLeft: (prevState.sessionLength - 1).toString() + ":00"
      }));
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
    if(this.state.workOrBreak === "Break Sesssion") {
      this.setState((prevState, props) => ({
        breakLength: prevState.breakLength + 1,
        timeLeft: (prevState.breakLength + 1).toString() + ":00"
      }));
    }
    if(this.state.workOrBreak === "Work Session") {
      this.setState((prevState, props) => ({
        breakLength: prevState.breakLength + 1
      }));
    }
  }

  decrementBreak = () => {
    if(this.state.breakLength - 1 <= 0) {
      return;
    }
    if(this.state.workOrBreak === "Break Sesssion") {
      this.setState((prevState, props) => ({
        breakLength: prevState.breakLength - 1,
        timeLeft: (prevState.breakLength - 1).toString() + ":00"
      }));
    }
    if(this.state.workOrBreak === "Work Session") {
      this.setState((prevState, props) => ({
        breakLength: prevState.breakLength - 1
      }));
    }
  }

  resetCountdown = () => {      
    this.setState({ 
      sessionLength: 25,
      breakLength: 5, 
      workOrBreak: "Work Session",
      timerRunning: false,
      timeLeft: "25:00"
    });
  };

  toggleWorkBreakSession = () => {
    if(this.state.workOrBreak === "Work Session" ) {
      this.setState({
        workOrBreak: "Break Session"
      })
    }
    if(this.state.workOrBreak === "Break Session" ) {
      this.setState({
        workOrBreak: "Work Session"
      })
    }
  }

  updateText = () => {

    if (this.state.workOrBreak === "Work Session") {
      let readTime = this.state.timeLeft;
      let splitTime = readTime.split(":");
      let minsInt = parseInt(splitTime[0], 10);
      let secsInt = parseInt(splitTime[1], 10);
      let total = minsInt * 60 + secsInt;
      if (total > 0) {
        total--;
        let seconds = total % 60;
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        let timeLeftCalc = Math.floor(total / 60) + ":" + seconds;  //mins + ":" + seconds
        this.setState({
          timeLeft: timeLeftCalc
        })
      }
      if (total <= 0) {
        this.toggleWorkBreakSession();
        let timeLeftSet = this.state.breakLength + ":00";
        this.setState({
          timeLeft: timeLeftSet
        })
      }
    }


    if(this.state.workOrBreak == "Break Session") {
      let readBreakTime = this.state.timeLeft;
      let splitBreakTime = readBreakTime.split(':');
      let minsIntBreak = parseInt(splitBreakTime[0], 10);
      let secsIntBreak = parseInt(splitBreakTime[1], 10);
      let totalBreak = minsIntBreak * 60 + secsIntBreak;
      if (totalBreak > 0) {
        totalBreak--;
        let seconds = totalBreak % 60;
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        let timeLeftCalc = Math.floor(totalBreak / 60) + ":" + seconds;  //mins + ":" + seconds
        this.setState({
          timeLeft: timeLeftCalc
        })
      }
      if (totalBreak <= 0) {
        this.toggleWorkBreakSession();
        let timeLeftSet = this.state.SessionLength + ":00";
        this.setState({
          timeLeft: timeLeftSet
        })
      }
    }
  }

  countdown = function () {
    myTimer = window.setInterval(this.updateText, 1000);
   };
 
   stopCountdown = function () {
     window.clearInterval(myTimer);
   };


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
                     countdown={this.countdown}
                     stopCountdown={this.stopCountdown}
                     />
        </div>
      </div>
    );
  }
}

export default App;