import React, { Component } from 'react';
import './App.css';
import PrepContainer from './Prep';
import SolveContainer from './Solve';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 0, // 0 prep, 1 solve
      equations: [
        "8+1",
        "8*2",
        "8/2",
        "3+4"
      ]
    }
  }

  changeStage = () => {
    this.setState((prevState) => ({stage: !prevState.stage}));
  }

  tableChange = (equationList) => {
    this.setState({
      equations: equationList
    });
  }

  render() {

    const mainContainer = this.state.stage == 0 ?
        <PrepContainer equations={this.state.equations} updateEquations={this.tableChange} /> :
        <SolveContainer equations={this.state.equations} />;

    return (
      <div>
        {mainContainer}
        <button onClick={this.changeStage}>{this.state.stage == 0 ? 'Start' : 'Reset'}</button>
      </div>
    )
  }
}


export default App;
