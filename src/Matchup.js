import React from "react";
import { teams, seeds } from "./teams";

const Matchup = ({ matchup, top, left, superBowl, setWinner}) => {
    const { id, home, away, winner } = matchup;

    const handleSelect = (e) => {
        const element = e.currentTarget;
        if(element.id.includes("home")) {
            setWinner(id, home);
        }
        else {
            setWinner(id, away);
        }
    };

    return (
        <div>
            <div 
                id={`home${id}`}
                className={`bracket-team ${winner === home ? "selection" : ""}`} 
                onClick={handleSelect} 
                style={{ top: `${top}px`, left: `${left}px` }}
            >
                <img src={teams[home.team]} alt={home.team}/>
            </div>
            <div
                id={`away${id}`}
                className={`bracket-team ${winner === away ? "selection" : ""}`} 
                onClick={handleSelect} 
                style={{ top: `${top+(superBowl ? 277 : 147)}px`, left: `${left}px` }}
            >
                <img src={teams[away.team]} alt={away.team}/>
            </div>
            {superBowl ? (
                <div/>
            ) : (
                <div>
                    <div className="bracket-seed" style={{ top: `${top-30}px`, left: `${left}px` }}>
                        <img src={seeds[home.seed]} alt={home.seed}/>
                    </div>
                    <div className="bracket-seed" style={{ top: `${top+117}px`, left: `${left}px` }}>
                        <img src={seeds[away.seed]} alt={away.seed}/>
                    </div>
                </div>  
            )}
        </div>
    )
}

export default Matchup;