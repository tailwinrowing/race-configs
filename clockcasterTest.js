// clockcaster-test.js
const axios = require('axios');
const cheerio = require('cheerio');

const TARGET_URL = 'https://clockcaster.com/e/67';

async function testClockCaster() {
    try {
        const response = await axios.get(TARGET_URL);
        const html = response.data;

        const $ = cheerio.load(html);

        const portfolioItems = $('.portfolio-item');
        const tables = $('table');

        console.log(`Found ${portfolioItems.length} .portfolio-item sections`);
        console.log(`Found ${tables.length} tables`);

        if (portfolioItems.length > 0) {
            console.log('First .portfolio-item HTML snippet:\n', $(portfolioItems[0]).html().slice(0, 300));
        }

        if (tables.length > 0) {
            console.log('First table HTML snippet:\n', $(tables[50]).html().slice(900, 1000));
        }
    } catch (err) {
        console.error('Error fetching ClockCaster page:', err.message);
    }
}

testClockCaster();
