module.exports = function (rawRows, config) {
    const normalizedResults = [];
    
    let i = config.startIndex;
    
    while (i < rawRows.length) {
        const eventRow = rawRows[i];
        const eventToPush = [];

        // 1. The first column is the event, so we'll add that to eventToPush
        let currentEvent = eventRow.a.trim();

        // 2. Identify crew names from column b onwards.
        const crewNames = [];
        for (let k = 1; k < Object.keys(eventRow).length; k++) {
            const colKey = String.fromCharCode(97 + k);
            const crewName = eventRow[colKey] ? eventRow[colKey].trim() : '';

            if (crewName) {
                crewNames.push(crewName);
            }
            else {
                break;
            }
        }
        
        // 3. Time detection
        const timeRowIndex = i + 1;
        if (timeRowIndex < rawRows.length) {
            const timeRow = rawRows[timeRowIndex];

            for (let k = 0; k < crewNames.length; k++) {
                const rank = k + 1;
                const crew = crewNames[k];
                const timeColKey = String.fromCharCode(98 + k);
                const finalTime = timeRow[timeColKey] ? timeRow[timeColKey].trim() : 'N/A'

                if (crew !== 'No Entry') {
                    eventToPush.push({
                        rank: rank.toString(),
                        crew: crew,
                        finalTime: finalTime
                    });
                }
            }

            normalizedResults.push({eventTitle: currentEvent, data: eventToPush});
            i += 2;
            continue;
            
        }



        i++;
    }
    return normalizedResults;
};