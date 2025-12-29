module.exports = function (rawRows, config) {
    const normalizedSchedule = [];

    let i = config.headerRowIndex;

    while (i < rawRows.length) {
        const eventRow = rawRows[i];
        if (eventRow[config.eventIndex]) {
            const currentEvent = eventRow[config.eventIndex];
            const currentTime = eventRow[config.timeIndex];
            normalizedSchedule.push({
                eventTitle: currentEvent,
                time: currentTime
            });
        }
        i++;
    }
    return normalizedSchedule;
}

// Should in the end be: 
// {
//     eventTitle: '4b',
//     time: '8:35'
//   }