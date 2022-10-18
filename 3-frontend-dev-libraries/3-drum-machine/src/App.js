import './App.css';
import React from 'react';
import {DrumPad, drumPads} from "./Components";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            volume: '50%',
            currentSound: '',
        }
        this.updateDisplay = this.updateDisplay.bind(this)
    }
    updateDisplay(soundID) {
        this.setState({
            currentSound: soundID,
        })

    }
    render() {
        return (
            <div className="App">
                <div id={'drum-machine'}>
                    <div id="drumPads">
                        {drumPads.map((drumPad, i, arr) => (
                            <DrumPad
                                padKey={arr[i].key}
                                soundID={arr[i].soundID}
                                url={arr[i].url}
                                updateDisplay={this.updateDisplay}
                            />
                        ))}
                    </div>
                    <div>
                        <div id={'controls'}>
                            <div id={'display'}>
                                {this.state.currentSound}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;

