import React from 'react';

const Rank = ({ name, entries }) => {
    // const firstName = name.split(" ")[0];
    // const capName = firstName[0].toUpperCase() + firstName.substring(1);
    return(
        <div style={{ width: '100%', marginRight: 215 }}>
            <p className="white f3 ma0">
                { `Hi there! Your current entry count is...` }
            </p>
            <p className="white f1 ma0">
                { 5 }
            </p>
        </div>
    )
}

export default Rank;