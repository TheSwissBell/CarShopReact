import React from 'react';

export default (props) => {
  const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

  const buttonClicked = () => {
    alert(`Car ${cellValue} deleted!`);
  };

  return (
    <span>
      <span>{cellValue}</span>&nbsp;
      <button onClick={() => buttonClicked()}>Delete</button>
    </span>
  );
};