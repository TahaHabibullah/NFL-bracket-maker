import React, { useState } from "react";
import Matchup from "./Matchup";
import { teams } from "./teams";

const SuperBowl = ({ matchup }) => {
    const [winner, setWinner] = useState(null);
    const [advanced, setAdvanced] = useState(false);
    const [text, setText] = useState('');
    
    const onWinnerSelect = (id, selection) => {
        if(advanced) {
            return;
        }
        setWinner(selection);
    }

    const handleClick = () => {
        setAdvanced(true);
    }

    const handleChange = (e) => {
        setText(e.target.value.toUpperCase());
    };

    return (
        <div>
            <Matchup
                matchup={matchup}
                top={300}
                left={682}
                superBowl={true}
                setWinner={onWinnerSelect}
            />
            {advanced ? (
                <div>
                    <input
                        className="bracket-signature-input"
                        type="text"
                        value={text}
                        onChange={handleChange}
                        placeholder="Type name here..."
                    />
                    <div className="bracket-signature" style={{ top: "195px", left: "593px" }}>
                        <div className="bracket-signature-text">
                            {text}'S BRACKET
                        </div>
                    </div>
                </div>
            ) : (
                <button className="advance-button" onClick={handleClick} disabled={winner === null}>
                    CONTINUE
                </button>
            )}
            {winner ? (
                <div className={"bracket-team"} style={{ top: "778px", left: "682px" }}>
                    <img src={teams[winner.team]} alt={winner.team}/>
                </div>
            ) : (
                <div/>
            )}
        </div>
    )
}

export default SuperBowl;