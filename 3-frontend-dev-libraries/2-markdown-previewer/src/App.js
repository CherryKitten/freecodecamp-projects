import './App.css';
import Markdown from "marked-react"
import React from "react";
import defaultPreview from "./defaultPreview";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: defaultPreview,
            preview: defaultPreview,
            fullscreenEditor: false,
            fullscreenPreview: false,
        };
    }

    updateText = (event) => {
        this.setState({input: event.target.value, preview: event.target.value})
    }

    setFullscreen = (event, target) => {
        target === 'editor'
            ? this.state.fullscreenEditor === false
                ? this.setState({fullscreenEditor: true, fullscreenPreview: false})
                : this.setState({fullscreenEditor: false})
            : this.state.fullscreenPreview === false
                ? this.setState({fullscreenPreview: true, fullscreenEditor: false})
                : this.setState({fullscreenPreview: false})
    }

    render() {
        const editorStyle = {
            width: this.state.fullscreenEditor ? '80%' : '20%',
            display: this.state.fullscreenPreview ? 'none' : 'initial',
            opacity: this.state.fullscreenPreview ? '0' : '100',
            height: '80%',
            position: 'relative',

        }
        const previewStyle = {
            width: this.state.fullscreenPreview ? '80%' : '40%',
            display: this.state.fullscreenEditor ? 'none' : 'initial',
            opacity: this.state.fullscreenEditor ? '0' : '100',
            height: '80%',
            position: 'relative',
        }
        return (
            <div className={"App"} style={{position: 'relative'}}>
                <div style={editorStyle}>
                    <button
                        id={"setFullscreenEditor"}
                        style={{position: "absolute", right: 5, top: 5}}
                        onClick={ (e) => this.setFullscreen(e, 'editor') }
                    >
                        <i className="fa-sharp fa-solid fa-expand"></i>
                    </button>
                    <textarea
                        style={{resize: 'none', height: '100%', width: '100%'}}
                        id="editor"
                        onChange={this.updateText}
                        value={this.state.input}
                    ></textarea>
                </div>
                <div style={previewStyle}>
                    <button id={"setFullscreenPreview"}
                            style={{position: "absolute", right: 5, top: 5}}
                            onClick={ (e) => this.setFullscreen(e, 'preview') }
                    >
                        <i className="fa-sharp fa-solid fa-expand"></i>
                    </button>
                    <div id={'preview'} style={{height: '100%', width: '100%'}}>
                        <Markdown gfm={true} breaks={true}>
                            {this.state.preview}
                        </Markdown>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
