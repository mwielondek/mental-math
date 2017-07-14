var app = document.getElementById('app');

// TODO change to ES6 import statements?
var React = require('react');
var ReactDOM = require('react-dom');

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      currentEquation: 0
    }

    // necessary to access this.state when called from a different context
    this.solverHandler = this.solverHandler.bind(this);
  }

  solverHandler(event) {
    // TODO write an incrementByOne reducer instead which takes keys to increment
    this.setState((prevState, props) => ({
      score: prevState.score + 1,
      // TODO change to some kind of random fn
      currentEquation: (prevState.currentEquation + 1) % props.equations.length
    }));
  }

  render() {
    // TODO add timer, add best score, add equations table (eg simple textarea)
    // add landing view and solving view, add styling, ...
    const eqs = this.props.equations;
    return (
      <div>
        <Score score={this.state.score} />
        <Solver equation={eqs[this.state.currentEquation]} scoreHandler={this.solverHandler} />
      </div>
    );
  }
};
Main.defaultProps = {
  equations: [
    "8+1",
    "8*2",
    "8/2",
    "3+4"
  ]
};

const Score = ({score}) => {
  return <div><p>Your score: {score}</p></div>;
};

const Solver = ({equation, scoreHandler}) => {
  const correctAnswer = parseEquation(equation);

  const changeHandler = (event) => {
    if (event.target.value == correctAnswer) {
      scoreHandler();  // increase score and get next equation
      event.persist(); // necessary to avoid the event being released
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
}

ReactDOM.render(
  <Main />,
  app
);
