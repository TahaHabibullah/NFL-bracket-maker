export function parseStandings(data) {
    let result = new Array(7);
    for(let i = 0; i < data.length; i++) {
        let division = data[i].standings.entries;
        for(let j = 0; j < division.length; j++) {
            let team = division[j].team;
            let seed = parseInt(team.seed);
            if(seed <= 7) {
                result[seed-1] = team.displayName;
            }
        }
    }
    return result;
}

export function initBracket(afcData, nfcData) {
    return {
        afc: {
            wc: {
                bye: afcData[0],
                matchups: [
                    { id: 1, home: { team: afcData[1], seed: 2 }, away: { team: afcData[6], seed: 7 }, winner: null },
                    { id: 2, home: { team: afcData[3], seed: 4 }, away: { team: afcData[4], seed: 5 }, winner: null },
                    { id: 3, home: { team: afcData[2], seed: 3 }, away: { team: afcData[5], seed: 6 }, winner: null },
                ]
            },
            div: null,
            champ: null,
        },
        nfc: {
            wc: {
                bye: nfcData[0],
                matchups: [
                    { id: 4, home: { team: nfcData[1], seed: 2 }, away: { team: nfcData[6], seed: 7 }, winner: null },
                    { id: 5, home: { team: nfcData[3], seed: 4 }, away: { team: nfcData[4], seed: 5 }, winner: null },
                    { id: 6, home: { team: nfcData[2], seed: 3 }, away: { team: nfcData[5], seed: 6 }, winner: null },
                ]
            },
            div: null,
            champ: null,
        }
    }
}

export function canAdvanceWc(bracket) {
    const afcMatchups = bracket.afc.wc.matchups;
    const nfcMatchups = bracket.nfc.wc.matchups;
    for(const m of afcMatchups) {
        if(m.winner === null) {
            return false;
        }
    }
    for(const m of nfcMatchups) {
        if(m.winner === null) {
            return false;
        }
    }
    return true;
}

export function advanceWildcard(bracket) {
    const updated = { ...bracket };
    const afcWinners = bracket.afc.wc.matchups.map(matchup => matchup.winner).sort((a, b) => a.seed - b.seed);
    const nfcWinners = bracket.nfc.wc.matchups.map(matchup => matchup.winner).sort((a, b) => a.seed - b.seed);
    const afcDiv = {
        matchups: [
            { id: 7, home: { team: bracket.afc.wc.bye, seed: 1 }, away: afcWinners[2], winner: null },
            { id: 8, home: afcWinners[0], away: afcWinners[1], winner: null },
        ]
    }
    const nfcDiv = {
        matchups: [
            { id: 9, home: { team: bracket.nfc.wc.bye, seed: 1 }, away: nfcWinners[2], winner: null },
            { id: 10, home: nfcWinners[0], away: nfcWinners[1], winner: null },
        ]
    }

    updated.afc.div = afcDiv;
    updated.nfc.div = nfcDiv;
    return updated;
}

export function canAdvanceDiv(bracket) {
    const afcMatchups = bracket.afc.div.matchups;
    const nfcMatchups = bracket.nfc.div.matchups;
    for(const m of afcMatchups) {
        if(m.winner === null) {
            return false;
        }
    }
    for(const m of nfcMatchups) {
        if(m.winner === null) {
            return false;
        }
    }
    return true;
}

export function advanceDivisional(bracket) {
    const updated = { ...bracket };
    const afcWinners = bracket.afc.div.matchups.map(matchup => matchup.winner).sort((a, b) => a.seed - b.seed);
    const nfcWinners = bracket.nfc.div.matchups.map(matchup => matchup.winner).sort((a, b) => a.seed - b.seed);
    const afcChamp = {
        matchup: {
            id: 11, 
            home: afcWinners[0], 
            away: afcWinners[1], 
            winner: null,
        }
    }
    const nfcChamp = {
        matchup: {
            id: 12, 
            home: nfcWinners[0], 
            away: nfcWinners[1], 
            winner: null,
        }
    }

    updated.afc.champ = afcChamp;
    updated.nfc.champ = nfcChamp;
    return updated;
}

export function canAdvanceChamp(bracket) {
    if(bracket.afc.champ.matchup.winner === null) {
        return false;
    }
    if(bracket.nfc.champ.matchup.winner === null) {
        return false;
    }
    return true;
}

export function advanceChampionship(bracket) {
    const afcWinner = bracket.afc.champ.matchup.winner;
    const nfcWinner = bracket.nfc.champ.matchup.winner;
    const superBowl = {
        matchup: {
            id: 13,
            home: nfcWinner,
            away: afcWinner,
            winner: null
        }
    }

    return superBowl;
}