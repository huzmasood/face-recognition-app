import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ inputChange, buttonSubmit }) => {
    const onEnter = (event) => {
        if (event.keyCode === 13) {
            buttonSubmit()
        }
    }
    return(
        <div>
            <p className="f3 mt1">
                <span>This</span> <span>Magic</span> <span>Brain</span> <span>will</span> <span>detect</span> <span>faces</span> {" "}
                <span>in</span> <span>your</span> <span>pictures.</span> <span>Give</span> <span>it</span> <span>a</span> {" "}
                <span>try!</span>
            </p>
            <div className="form center pa4 br3 shadow-5">
                <input className="pa2 w-70 f4" type="text" onChange={ inputChange } placeholder="image url here..."
                onKeyDown={ onEnter } />
                <button className="detect w-30 grow ph3 pv2 white bg-light-purple" onClick={ buttonSubmit }>Detect</button>
            </div>
        </div>
    )
}

export default ImageLinkForm;