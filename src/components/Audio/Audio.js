import React, { Component } from 'react';
import './Audio.css';
import audio from './audio.mp3';

class Audio extends Component {
    componentDidMount() {
        this.sound = document.getElementById("audio");
        this.play = document.getElementById("play");
        this.pause = document.getElementById("pause");
    }

    playSound = () => {
        this.sound.play();
        this.play.classList.toggle("dn");
        this.pause.classList.toggle("dn");
    }

    pauseSound = () => {
        this.sound.pause();
        this.play.classList.toggle("dn");
        this.pause.classList.toggle("dn");
    }

    render() {
        return(
            <div>
                <audio loop id="audio">
                    <source src={ audio } type="audio/mpeg" />
                </audio>
                <button className="btn">
                    <i id="play" className="fa fa-play-circle-o" onClick={ this.playSound }></i>
                    <i id="pause" className="fa fa-pause-circle-o dn" onClick={ this.pauseSound }></i>
                </button>
            </div>
        )
    }
}

export default Audio;