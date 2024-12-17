import React, { useState } from "react";
import Matchup from "./Matchup";
import { canAdvanceDiv } from "./Utils";

const Divisional = ({ initialBracket, advanceBracket }) => {
    const [bracket, setBracket] = useState(initialBracket);
    const [advanced, setAdvanced] = useState(false);

    const onWinnerSelect = (id, selection) => {
        if(advanced) {
            return;
        }
        const updated = { ...bracket };

        for(const conf of Object.keys(updated)) {
            const round = updated[conf].div;
            const matchup = round.matchups.find((m) => m.id === id);
            if(matchup) {
                matchup.winner = selection;
                break;
            }
        }
        setBracket(updated);
    }

    const handleClick = () => {
        advanceBracket(bracket);
        setAdvanced(true);
    }

    return (
        <div>
            {Object.keys(bracket).map((conf) => (
                <div key={conf}>
                    {bracket[conf].div.matchups.map((matchup, index) => (
                        <Matchup
                            key={index}
                            matchup={matchup}
                            top={145 + 472*index}
                            left={conf === "afc" ? 248 : 1116}
                            setWinner={onWinnerSelect}
                        />
                    ))}
                </div>
            ))}
            {advanced ? (
                <div/>
            ) : (
                <button className="advance-button" onClick={handleClick} disabled={!canAdvanceDiv(bracket)}>
                    CONTINUE
                </button>
            )}
        </div>
    )
}

export default Divisional;