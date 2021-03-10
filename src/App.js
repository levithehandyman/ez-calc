import React, {Component} from 'react';
import './App.css';
import ResultComponent from './components/ResultComponent';
import KeypadComponent from './components/KeypadComponent';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result:''
    }
  }

  onClick = button => {

    if(button === '='){
        this.calculate()
    }

    else if(button === 'AC'){
        this.reset()
    }
    else if(button === 'back'){
        this.backspace()
    }

    else {
        this.setState({
            result: this.state.result + button
        })
    }
};

  calculate = () => {
    try {
        this.setState({
            result: (eval(this.state.result) || '' ) + '' //NEVER use eval! unless you dont super care because its a one page calculator..
        })
    } catch (e) {
        this.setState({
            result: 'error'
        })

    }
};

reset = () => {
    this.setState({
        result: ''
    })
};

backspace = () => {
    this.setState({
        result: this.state.result.slice(0, -1)
    })
};

  render(){
    return (
      <div>
        <div className='calculator-body' id='calculator'>
          <h1>js calculator</h1>
          <ResultComponent result={this.state.result}/>
          <KeypadComponent onClick={this.onClick} />
        </div>
      </div>
  );

  }  
}

export default App;
