import './App.css';
import React from 'react';
import beep from './beep.mp3'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTimer: 'Session',
            sessionLength: 25,
            breakLength: 5,
            timeLeft: 1500,
            status: 'stopped',
        }
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.toggleTimer = this.toggleTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.decrementTimer = this.decrementTimer.bind(this);
        this.updateTimer = this.updateTimer.bind(this);
        this.finishTimer = this.finishTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.showTime = this.showTime.bind(this);
    }

    increment(type) {
        if (this.state.status === 'stopped') {
            if (type === 'session') {
                if (this.state.sessionLength < 60) {
                    this.setState({
                        sessionLength: this.state.sessionLength + 1,
                        timeLeft: this.state.timeLeft + 60,
                    })
                }
            } else {
                if (this.state.breakLength < 60) {
                    this.setState({breakLength: this.state.breakLength + 1})
                }
            }
        }
    }

    decrement(type){
        if (type === 'session'){
            if (this.state.sessionLength > 1){this.setState({sessionLength: this.state.sessionLength - 1})}
        } else {
            if (this.state.breakLength > 1){this.setState({breakLength: this.state.breakLength - 1})};
        }
    }

    resetTimer(){
        this.setState({
            activeTimer: 'Session',
            sessionLength: 25,
            breakLength: 5,
            status: 'stopped',
            timeLeft: 1500
        })
            this.stopTimer()
            document.getElementById('beep').pause()
            document.getElementById('beep').currentTime = 0;
    }

    stopTimer(){
        if (this.state.intervalID !== 0){
            clearInterval(this.state.intervalID)
            this.setState({
                intervalID: 0
            })
        }
    }

    toggleTimer(){
        if (this.state.status === 'stopped'){
            this.setState({
                status: 'running',
                timeLeft: this.state.sessionLength * 60,
            })
            this.updateTimer();
        } else if (this.state.status === 'running'){
            this.stopTimer()
            this.setState({
                status: 'paused'
            })
        } else if (this.state.status === 'paused'){
            this.setState({
                status: 'running',
            })
            this.updateTimer();
        } else if (this.state.status === 'finished'){
            this.setState({
                timeLeft: this.state.timeLeft + 1,
                status: 'running',
            })
            this.updateTimer()
        }
    }

    decrementTimer(){
        if (this.state.status === 'stopped'){return this.stopTimer()}
        if (this.state.timeLeft === 0){
            this.finishTimer();
        }
        if (this.state.status === 'running') {
            this.setState({
                timeLeft: this.state.timeLeft - 1,
            })
        }
    }

    updateTimer(){
            let intervalID = setInterval(() => {this.decrementTimer()}, 1000)
            this.setState({
                intervalID:  intervalID
            })
    }

    finishTimer(){
        clearInterval(this.state.intervalID)
        this.setState({
            intervalID: 0
        })
        let beep = document.getElementById('beep');
        let nextSession;
        let timeLeft;
        if (this.state.activeTimer === 'Session'){
            nextSession = 'Break';
            timeLeft = this.state.breakLength * 60;
        } else{
            nextSession = 'Session';
            timeLeft = this.state.sessionLength * 60;
        }
        this.setState({
            activeTimer: nextSession,
            timeLeft: timeLeft,
            status: 'finished'
        })
        beep.currentTime = 0
        beep.play()
        this.toggleTimer()
    }

    showTime(){
        let mins = (Math.floor(this.state.timeLeft / 60)).toString().padStart(2, '0');
        let secs = (this.state.timeLeft - mins * 60).toString().padStart(2, '0');
        return (mins + ':' + secs)
    }

    render() {
        return (
            <div id={'App'}>
                <div id={'controls'}>
                    <Controls type={'session'} time={this.state.sessionLength} increment={this.increment} decrement={this.decrement}/>
                    <Controls type={'break'} time={this.state.breakLength} increment={this.increment} decrement={this.decrement} />
                </div>
                <div id={'timer'}>
                    <div id={'timer-label'}>
                        {this.state.activeTimer}
                    </div>
                    <div id={'time-left'}>
                        {this.showTime()}
                    </div>
                    <div id={'timer-controls'}>
                        <div id={'start_stop'} onClick={this.toggleTimer}>
                            <i className="fa-solid fa-play"></i><i className="fa-solid fa-pause"></i>
                        </div>
                        <div id={'reset'} onClick={this.resetTimer}>
                            <i className="fa-solid fa-arrows-rotate"></i>
                        </div>
                    </div>
                </div>
                <audio id={'beep'} src={beep} preload='true'></audio>
            </div>
        );
    }
}

class Controls extends React.Component {
    render() {
        const type = this.props.type;
        return (
            <div id={type + '-controls'}>
                <div id={type + '-label'}>
                    {type} length
                </div>
                <div id={type + '-increment'} onClick={() => this.props.increment(type)}>
                    <i className={'fa-solid fa-arrow-up'}></i>
                </div>
                <div id={type + '-length'}>
                    {this.props.time}
                </div>
                <div id={type + '-decrement'} onClick={() => this.props.decrement(type)}>
                    <i className={'fa-solid fa-arrow-down'}></i>
                </div>
            </div>
        );
    }
}

export default App;
