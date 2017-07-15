import React, { Component } from 'react';

const PrepContainer = ({equations, updateEquations}) => {
  return (
    <div>
      <p>Prep</p>
      <EquationTable equations={equations} updateEquations={updateEquations} />
    </div>
  );
}

const EquationTable = ({equations, updateEquations}) => {
  const handleChange = (event) => {
      updateEquations(event.target.value.split('\n'));
  }

  return <textarea value={equations.join('\n')} onChange={handleChange} rows="12"></textarea>;
};

export default PrepContainer;
