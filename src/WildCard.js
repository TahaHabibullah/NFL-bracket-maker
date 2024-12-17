import React, { useState } from "react";
import Matchup from "./Matchup";
import { teams, seeds } from "./teams";
import { canAdvanceWc } from "./Utils";

const WildCard = ({ initialBracket, advanceBracket }) => {
    const [bracket, setBracket] = useState(initialBracket);
    const [advanced, setAdvanced] = useState(false);

    const onWinnerSelect = (id, selection) => {
        if(advanced) {
            return;
        }
        const updated = { ...bracket };

        for(const conf of Object.keys(updated)) {
            const round = updated[conf].wc;
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
                    {bracket[conf].wc.matchups.map((matchup, index) => (
                        <Matchup
                            key={index}
                            matchup={matchup}
                            top={70 + 308*index}
                            left={conf === "afc" ? 55 : 1309}
                            setWinner={onWinnerSelect}
                        />
                    ))}
                </div>
            ))}
            {advanced ? (
                <div/>
            ) : (
                <div>
                    <div className="bracket-team" style={{ top: "145px", left: "248px" }}>
                        <img src={teams[bracket.afc.wc.bye]} alt={bracket.afc.wc.bye}/>
                    </div>
                    <div className="bracket-team" style={{ top: "145px", left: "1116px" }}>
                        <img src={teams[bracket.nfc.wc.bye]} alt={bracket.nfc.wc.bye}/>
                    </div>
                    <div className="bracket-seed" style={{ top: "115px", left: "1116px" }}>
                        <img src={seeds[1]} alt={1}/>
                    </div>
                    <div className="bracket-seed" style={{ top: "115px", left: "248px" }}>
                        <img src={seeds[1]} alt={1}/>
                    </div>
                    <button className="advance-button" onClick={handleClick} disabled={!canAdvanceWc(bracket)}>
                        CONTINUE
                    </button>
                </div>
            )}
        </div>
    )
}

export default WildCard;