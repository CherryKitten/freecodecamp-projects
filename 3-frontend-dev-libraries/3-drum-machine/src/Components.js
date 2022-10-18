import React from "react";

export const drumPads = [
    {key: 'Q', soundID: 'Heater-1', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'},
    {key: 'W', soundID: 'Heater-2', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'},
    {key: 'E', soundID: 'Heater-3', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'},
    {key: 'A', soundID: 'Heater-4', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'},
    {key: 'S', soundID: 'Clap', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'},
    {key: 'D', soundID: 'Open-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'},
    {key: 'Z', soundID: 'Kick-n-Hat', url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'},
    {key: 'X', soundID: 'Kick', url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'},
    {key: 'C', soundID: 'Closed-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'},]

export class DrumPad extends React.Component {
    constructor(props) {
        super(props);

        this.playSound = this.playSound.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this)
    }
    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
    }

    handleKeyPress(event) {
        if (event.key.toUpperCase() === this.props.padKey) {
            this.playSound()
        }
    }

    playSound() {
        const sound = document.getElementById(this.props.padKey)
        sound.currentTime = 0;
        sound.play();
        this.props.updateDisplay(this.props.soundID.replace(/-/g, ' '));
    }

    render() {
        return (
            <div
                className={'drum-pad'}
                id={this.props.soundID}
                onClick={this.playSound}
            >
                <audio
                    src={this.props.url}
                    id={this.props.padKey}
                    className={'clip'}
                ></audio>
                {this.props.padKey}
            </div>
        )
    }
}
