import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, boxArray, request }) => {
    let status = <div></div>;
    let space = <div className="ma6"></div>;

    if (imageUrl !== '') {
        if (request === true) {
            status = <h4>detecting...</h4>
        } else if (request === 400) {
            status = <h3 style={{ color: 'firebrick' }}>Please enter a valid URL.</h3>
        } else {
            if (request === 'no-service') {
                status = <h3 style={{ color: 'firebrick' }}>Ooops! The server seems to be down. Please come back later.</h3>
            }
            space = <div></div>
        }
    }

    const boxes = boxArray.map((values, i) => {
        const { top_row, right_col, bottom_row, left_col } = values;
        return <div key={i} className="bounding-box" style={{ top: `${ top_row }%`, right: `${ 100 - right_col }%`, 
        bottom: `${ 100 - bottom_row }%`, left: `${ left_col }%` }}></div>
    })

    return(
        <div className="center flex-column">
            { status }
            <div className="center relative ma1 mt2">
                <img alt='' src={ imageUrl } width="500px" height="auto" />
                { boxes }
            </div>
            { space }
        </div>
    )
}

export default FaceRecognition;