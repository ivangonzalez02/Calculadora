"use client"
import React, { Component } from 'react';
import './page.module.css';

class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      display: '0',
      currentInput: '',
      operator: '',
      prevInput: ''
    };
  }

  handleNumberClick = (num) => {
    const { display, currentInput, operator } = this.state;

    if (display === '0' || operator === '=') {
      this.setState({
        display: num.toString(),
        currentInput: num.toString(),
        operator: ''
      });
    } else {
      this.setState({
        display: currentInput + num.toString(),
        currentInput: currentInput + num.toString()
      });
    }
  };

  handleOperatorClick = (op) => {
    const { display, currentInput, operator, prevInput } = this.state;

    if (operator === '') {
      this.setState({
        operator: op,
        prevInput: currentInput,
        currentInput: ''
      });
    } else if (operator === '=') {
      this.setState({
        operator: op,
        prevInput: display,
        currentInput: ''
      });
    } else {
      const result = this.calculate(prevInput, currentInput, operator);
      this.setState({
        display: result.toString(),
        operator: op,
        prevInput: result.toString(),
        currentInput: ''
      });
    }
  };

  handleEqualsClick = () => {
    const { prevInput, currentInput, operator } = this.state;

    if (prevInput !== '' && currentInput !== '' && operator !== '=') {
      const result = this.calculate(prevInput, currentInput, operator);
      this.setState({
        display: result.toString(),
        operator: '=',
        prevInput: result.toString(),
        currentInput: ''
      });
    }
  };

  handleClearClick = () => {
    this.setState({
      display: '0',
      currentInput: '',
      operator: '',
      prevInput: ''
    });
  };

  calculate = (num1, num2, operator) => {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    switch (operator) {
      case '+':
        return num1 + num2;
      case '-':
        return num1 - num2;
      case '*':
        return num1 * num2;
      case '/':
        return num1 / num2;
      case '%':
        return (num1 / 100) * num2;
      default:
        return 0;
    }
  };

  render() {
    return (
      <div className="calculator">
        <div className="display">{this.state.display}</div>
        <div className="buttons">
          <div className="row">
            <button onClick={() => this.handleNumberClick(7)}>7</button>
            <button onClick={() => this.handleNumberClick(8)}>8</button>
            <button onClick={() => this.handleNumberClick(9)}>9</button>
            <button onClick={() => this.handleOperatorClick('/')}>/</button>
          </div>
          <div className="row">
            <button onClick={() => this.handleNumberClick(4)}>4</button>
            <button onClick={() => this.handleNumberClick(5)}>5</button>
            <button onClick={() => this.handleNumberClick(6)}>6</button>
            <button onClick={() => this.handleOperatorClick('*')}>*</button>
          </div>
          <div className="row">
            <button onClick={() => this.handleNumberClick(1)}>1</button>
            <button onClick={() => this.handleNumberClick(2)}>2</button>
            <button onClick={() => this.handleNumberClick(3)}>3</button>
            <button onClick={() => this.handleOperatorClick('-')}>-</button>
          </div>
          <div className="row">
            <button onClick={() => this.handleNumberClick(0)}>0</button>
            <button onClick={this.handleClearClick}>C</button>
            <button onClick={this.handleEqualsClick}>=</button>
            <button onClick={() => this.handleOperatorClick('+')}>+</button>
          </div>
          <div className="row">
            <button onClick={() => this.handleOperatorClick('%')}>%</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;