module.exports = function (rawRows) {
    const normalizedResults = [];
    
    // Start iterating from the fifth row (index 5) to skip the fixed header/title rows (0-4).
    // The first event row starts at index 5.
    let i = 5; 

    while (i < rawRows.length) {
        const eventRow = rawRows[i];

        // 1. EVENT BLOCK DETECTION (Row 1 of 2):
        // Check if Column 'a' starts with the event prefix.
        if (eventRow.a && eventRow.a.trim().startsWith('Results Event')) {
            const currentEvent = eventRow.a.trim();
            
            // 2. Identify Crew Names from the eventRow (Columns 'b' onwards)
            const crewNames = [];
            // Start checking from column 'b' (index 1 in the generic keys 'a', 'b', ...)
            for (let k = 1; k < Object.keys(eventRow).length; k++) {
                const colKey = String.fromCharCode(97 + k);
                const crewName = eventRow[colKey] ? eventRow[colKey].trim() : '';

                if (crewName) {
                    crewNames.push(crewName);
                } else {
                    break; // Stop if we hit a blank cell
                }
            }

            // 3. TIME ROW DETECTION (Row 2 of 2):
            const timeRowIndex = i + 1;
            if (timeRowIndex < rawRows.length) {
                const timeRow = rawRows[timeRowIndex];
                
                // Validate the time row marker (handling the slight variation "Finish Times" vs "Finish Time(s)")
                if (timeRow.a && timeRow.a.trim().startsWith('Finish Time')) {
                    
                    // 4. Process the results for this event block
                    for (let k = 0; k < crewNames.length; k++) {
                        const rank = k + 1;
                        const crew = crewNames[k];
                        const timeColKey = String.fromCharCode(98 + k); // Time starts at 'b' of timeRow
                        const finalTime = timeRow[timeColKey] ? timeRow[timeColKey].trim() : 'N/A';
                        
                        if (crew !== 'No Entry') {
                            normalizedResults.push({
                                eventTitle: currentEvent,
                                rank: rank.toString(),
                                crew: crew,
                                finalTime: finalTime
                            });
                        }
                    }
                    
                    // 5. ADVANCE THE COUNTER: Move past the two rows just processed (eventRow and timeRow)
                    i += 2; 
                    continue; // Skip the i++ at the bottom of the while loop
                }
            }
        }
        
        // If the row was not an event block, or if processing failed, advance by 1
        i++;
    }

    return [{ eventTitle: 'All Results', data: normalizedResults }];
};