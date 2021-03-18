import React, {Component} from 'react';
import './App.css';
import ResultComponent from './components/ResultComponent';
import KeypadComponent from './components/KeypadComponent';

class App extends React.Component{
  constructor() {
    super();
    this.state = {
      result:  '0',
      decimalCheck: true
    };
  }
  
  onClick = (key) => {
    const operator = ['+', '-', '*', '/'];
    if (key === '=') {
      this.calculate();
    } else if (key ==='←'){
      this.setState({
        result: this.state.result.slice(0, -1) 
      });
    } else if (key === 'AC') {
      this.clear();
    } else if (key === '.') {
        if (this.state.decimalCheck) {
          this.setState({
            result: this.state.result === '0' ? key : this.state.result + key,
            decimalCheck: false
          });
        }
    } else{
      if (operator.includes(key)) {
        let now = this.state.result[this.state.result.length -1];
        let then = this.state.result[this.state.result.length -2];
        let so = this.state.result;
        if (key != '-') {
          if (now == '-' && operator.includes(then)) {
            so = this.state.result.slice(0, -1);
            so = so.slice(0, -1);
          } else if (operator.includes(now)) {
            so = this.state.result.slice(0, -1);
          }
        }
        this.setState({
          result: this.state.result === '0' ? key : so + key,
          decimalCheck: true
        });
      } else {
        this.setState({
          result: this.state.result ==='0' ? key : this.state.result + key
        });
      }
    }
  };
  
  
  calculate = () => {
    try {
      this.setState({
        result: (eval(this.state.result) || '0') + ''
      });
    } catch (e) {
      this.setState({
        result: 'error'
      });
    }
  }
  
  clear = () => {
    this.setState({
      result:'0',
      decimalCheck: true
    });  
  }; 
  
  render() { 
   return <KeypadComponent result={this.state.result} onClick={this.onClick} />;
    }
  }

export default App;
