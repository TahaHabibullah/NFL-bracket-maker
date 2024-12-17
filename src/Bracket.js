import React, { useEffect, useState } from "react";
import "./Bracket.css";
import templateImage from "./template.png";
import { parseStandings, initBracket, advanceWildcard, advanceDivisional, advanceChampionship } from "./Utils";
import axios from "axios";
import WildCard from "./WildCard";
import Divisional from "./Divisional";
import Championship from "./Championship";
import SuperBowl from "./SuperBowl";

const Bracket = () => {
	const restEndpoint = "http://cdn.espn.com/core/nfl/standings?xhr=1";
	const [initialBracket, setInitialBracket] = useState(null);
    const [currBracket, setCurrBracket] = useState(null);
    const [superBowl, setSuperBowl] = useState(null);

    const handleWcAdvance = (bracket) => {
        const wcDivs = document.querySelectorAll('div.bracket-team');
        wcDivs.forEach(div => {
            div.className = "bracket-team";
        });
        setCurrBracket(advanceWildcard(bracket));
    }

    const handleDivAdvance = (bracket) => {
        const divDivs = document.querySelectorAll('div.bracket-team');
        divDivs.forEach(div => {
            div.className = "bracket-team";
        });
        setCurrBracket(advanceDivisional(bracket));
    }

    const handleChampAdvance = (bracket) => {
        const champDivs = document.querySelectorAll('div.bracket-team');
        champDivs.forEach(div => {
            div.className = "bracket-team";
        });
        setSuperBowl(advanceChampionship(bracket));
    }

	const callRestApi = async () => {
		return axios.get(restEndpoint)
        .then((response) => {
            setInitialBracket(initBracket(parseStandings(response.data.content.standings.groups[0].groups), 
                              parseStandings(response.data.content.standings.groups[1].groups)));
        }).catch(error => {
            console.log(error);
        });
	};

	useEffect(() => {
		callRestApi();
	}, []);

    return (
        (initialBracket) ? (
            <div className="bracket-container">
                <div className="bracket-image">
                    <img src={templateImage} alt="Playoff Bracket Template" />
                    <WildCard initialBracket={initialBracket} advanceBracket={handleWcAdvance}/>
                    {currBracket ? (
                        <Divisional initialBracket={currBracket} advanceBracket={handleDivAdvance}/>
                    ) : (
                        <div/>
                    )}
                    {currBracket && currBracket.afc.champ ? (
                        <Championship initialBracket={currBracket} advanceBracket={handleChampAdvance}/>
                    ) : (
                        <div/>
                    )}
                    {superBowl ? (
                        <SuperBowl matchup={superBowl.matchup}/>
                    ) : (
                        <div/>
                    )}
                </div>
            </div>
        ) : (
            <div/>
        )
        
    );
};

export default Bracket;