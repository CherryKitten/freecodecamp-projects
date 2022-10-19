import './App.css';
import React from "react";
import meow from './meow.mp3'

const numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '0',
            firstNumber: '',
            currentOperator: '',
            display: '0',
            negative: false,
        }
        this.clear = this.clear.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleOperator = this.handleOperator.bind(this);
        this.handleDecimal = this.handleDecimal.bind(this);
        this.handleEquals = this.handleEquals.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    updateState(changed){

        let display;
        let input = this.state.input;
        let currentOperator = this.state.currentOperator;
        let firstNumber = this.state.firstNumber;
        let negative = this.state.negative
        for (let v in changed){
            // eslint-disable-next-line no-eval
            eval(v + " =  changed[v] ");
        }

        currentOperator === ''
            ? firstNumber === ''
                ? display = input
                : display = firstNumber
            : display = firstNumber + currentOperator + input;

        this.setState({
            display: display,
            input: input,
            currentOperator: currentOperator,
            firstNumber: firstNumber,
            negative: negative,
        })
    }

    clear() {
        this.setState({
            input: '0',
            firstNumber: '',
            currentOperator: '',
            display: '0',
            negative: false,
        })
    }

    handleInput(i) {
        let input = this.state.input;
        let firstNumber = this.state.firstNumber;
        let currentOperator = this.state.currentOperator;
        let negative = this.state.negative;
        if (input === '0'){
            input = i.toString();
            if (firstNumber !== '' && currentOperator === ''){firstNumber = ''}
        } else {
            input = input + i.toString()
        }
        if (negative === true){input = input * -1 }
        this.updateState({input: input, firstNumber: firstNumber})
    }

    handleDecimal() {
        let input = this.state.input.toString();
        if (input.match(/\./)){
            return false
        } else {
                input = input + '.'
        }

        this.updateState({input: input})
    }

    handleOperator(operator) {
        let op;
        let input = this.state.input;
        let firstNumber = this.state.firstNumber;
        let prevOperator = this.state.currentOperator;
        let negative = false;

        if (firstNumber === '') {
            firstNumber = input
        } else {
            if (prevOperator !== '' && input !== '0'){
                firstNumber = this.handleEquals()
                prevOperator = ''
            }
        }

        switch (operator){
            case 'add':
                op = '+'
                break;
            case 'subtract':
                if (prevOperator !== ''){
                    negative = true
                    op = prevOperator;
                } else {
                    op = '-'
                }
                break;
            case 'multiply':
                op = '*'
                break;
            case 'divide':
                op = '/'
                break;
            default:
                break;
        }
        this.updateState({
            currentOperator: op,
            firstNumber: firstNumber,
            input: '0',
            negative: negative,
        })
    }

    handleEquals(){
        let firstNumber = Number(this.state.firstNumber)
        let secondNumber = Number(this.state.input)
        let operator = this.state.currentOperator
        let result = 0
        switch(operator){
            case '+':
                result = firstNumber + secondNumber
                break;
            case '-':
                result = firstNumber - secondNumber
                break;
            case '*':
                result = firstNumber * secondNumber
                break;
            case '/':
                result = firstNumber / secondNumber
                break;
            default:
                break;
        }
        this.updateState({
            firstNumber: result.toString(),
            currentOperator: '',
            input: '0',
        })
        return result
    }

    render() {
        let audio = new Audio(meow);
        return (
            <div className="App">
                <div className={'Calculator'}>
                    <div id={'displayBox'}>
                        <div id={'display'}>{this.state.display}</div>
                        <div>{this.state.input}</div>
                    </div>

                    {numbers.map((name, i) => (
                        <div className={'number'} id={name} onClick={() => this.handleInput(i)}>{i}</div>
                    ))}
                    <div id={'add'} className={'operator'} onClick={() => this.handleOperator('add')}>
                        <i className="fa-sharp fa-solid fa-plus" ></i>
                    </div>
                    <div id={'subtract'} className={'operator'} onClick={() => this.handleOperator('subtract')}>
                        <i className="fa-sharp fa-solid fa-minus"></i>
                    </div>
                    <div id={'multiply'} className={'operator'} onClick={() => this.handleOperator('multiply')}>
                        <i className="fa-sharp fa-solid fa-xmark"></i>
                    </div>
                    <div id={'divide'} className={'operator'} onClick={() => this.handleOperator('divide')}>
                        <i className="fa-sharp fa-solid fa-divide"></i>
                    </div>

                    <div id={'equals'} onClick={() => {this.handleEquals()}}>
                        =
                    </div>
                    <div id={'clear'} onClick={this.clear}>
                        C
                    </div>
                    <div id={'decimal'} onClick={() => {
                        this.handleDecimal()
                    }}>
                        .
                    </div>
                    <div id={'cat'} onClick={() => audio.play()}>
                        <i className="fa-solid fa-paw"></i>
                    </div>
                </div>
            </div>
        );
    }
}
