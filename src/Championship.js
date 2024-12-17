import React, { useState } from "react";
import Matchup from "./Matchup";
import { canAdvanceChamp } from "./Utils";

const Championship = ({ initialBracket, advanceBracket }) => {
    const [bracket, setBracket] = useState(initialBracket);
    const [advanced, setAdvanced] = useState(false);

    const onWinnerSelect = (id, selection) => {
        if(advanced) {
            return;
        }
        const updated = { ...bracket };

        if(id === 11) {
            updated.afc.champ.matchup.winner = selection;
        }
        else if(id === 12) {
            updated.nfc.champ.matchup.winner = selection;
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
                    <Matchup
                        matchup={bracket[conf].champ.matchup}
                        top={381}
                        left={conf === "afc" ? 443 : 921}
                        setWinner={onWinnerSelect}
                    />
                </div>
            ))}
            {advanced ? (
                <div/>
            ) : (
                <button className="advance-button" onClick={handleClick} disabled={!canAdvanceChamp(bracket)}>
                    CONTINUE
                </button>
            )}
        </div>
    )
}

export default Championship;