import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      currentEquation: 0,
      equations: [
        "8+1",
        "8*2",
        "8/2",
        "3+4"
      ]
    }

    // necessary to access this.state when called from a different context
    // TODO check out the new initializer syntax for avoiding having to do this
    this.solverHandler = this.solverHandler.bind(this);
    this.tableChange = this.tableChange.bind(this);
  }

  solverHandler(event) {
    // TODO write an incrementByOne reducer instead which takes keys to increment
    this.setState((prevState, props) => ({
      score: prevState.score + 1,
      // TODO change to some kind of random fn? Math.floor(Math.random() * arr.length)
      currentEquation: (prevState.currentEquation + 1) % prevState.equations.length
    }));
  }

  tableChange(equationList) {
    this.setState({
      equations: equationList
    });
  }

  render() {
    // TODO add timer, add best score add landing view and solving view, add styling, ...
    const eqs = this.state.equations;
    return (
      <div>
        <div><EquationTable equations={this.state.equations} updateEquations={this.tableChange} /></div>
        <div>
          <Score score={this.state.score} />
          <Solver equation={eqs[this.state.currentEquation]} correctAnswerHandler={this.solverHandler} />
        </div>
      </div>
    );
  }
};

const Score = ({score}) => {
  return <div><p>Your score: {score}</p></div>;
};

const Solver = ({equation, correctAnswerHandler}) => {
  const correctAnswer = parseEquation(equation);

  const changeHandler = (event) => {
    if (event.target.value == correctAnswer) {
      correctAnswerHandler();  // increase score and get next equation
      event.persist(); // necessary to avoid the event being released due to pooling
      setTimeout(() => {event.target.value = ""}, 220);
    }
  };

  return (
    <div>
      <p>{equation}</p>
      <input type="text" onChange={changeHandler} />
    </div>
  );
};

const parseEquation = (equation) => {
  // Not super safe, so we should make sure the input is sanitized elsewhere
  // prior to calling eval.
  return eval(equation);
};

const EquationTable = ({equations, updateEquations}) => {
  const handleChange = (event) => {
      updateEquations(event.target.value.split('\n'));
  }

  return <textarea value={equations.join('\n')} onChange={handleChange} rows="12"></textarea>;
};

export default App;
