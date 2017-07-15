import React, { Component } from 'react';

class SolveContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      currentEquation: 0
    };
  }

  solverHandler = (event) => {
    this.setState((prevState, props) => ({
      score: prevState.score + 1,
      // TODO change to some kind of random fn? Math.floor(Math.random() * arr.length)
      currentEquation: (prevState.currentEquation + 1) % props.equations.length
    }));
  };

  render = () => {
    const eqs = this.props.equations;
    return (
      <div>
        <Score score={this.state.score} />
        <Solver equation={eqs[this.state.currentEquation]} correctAnswerHandler={this.solverHandler} />
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
  // HACK Not super safe, so we should make sure the input is sanitized elsewhere
  // prior to calling eval.
  return eval(equation);
};

export default SolveContainer;
