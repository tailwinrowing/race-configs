const vm = require('vm');
const fs = require('fs');
const { parseGoogleSheets } = require('/Users/maxolsen/rowing-scraper-api/scraper');

const currentConfig = {
        "parserType": "GOOGLE_SHEETS",
        "spreadsheetId": "1-aTT9eMX49i1_T3UHOTG8eAzN65PQo8HLGH_hRQKLP8",
        "sheetName": "Sheet1",
        "headerRowIndex": 5,
        "postProcessorFile": "./longBeachSchedule.js"
    }
  
const scheduleConfig = {
  "headerRowIndex": 6,
  "eventIndex": 'c',
  "timeIndex": 'b'
}

// 1. Configuration
const DEV_MODE = true;
const LOCAL_PATH = `./longBeachSchedule.js`;

// 2. The Loading Logic (refined)
async function loadParser() {
  if (DEV_MODE) {
    console.log("🛠️  Running in DEV_MODE: Loading from disk...");
    // Clear cache so changes in the file are picked up immediately
    delete require.cache[require.resolve(LOCAL_PATH)];
    return require(LOCAL_PATH);
  }
  
  // Production logic (simplified for this test script)
  console.log("🌐 Running in PROD_MODE: Fetching remote...");
  // ... your fetch/vm logic here ...
}

// 3. The Test Runner
async function runTest() {
  try {
    const parser = await loadParser();

    // Mock data: Replace this with a sample string your scraper usually gets
    const sampleData = await parseGoogleSheets(currentConfig);

    console.log("🧪 Executing parser...");
    const result = await parser(sampleData, scheduleConfig);

    console.log("------------------------------------");
    console.log("✅ PARSER OUTPUT:");
    console.dir(result, { depth: null, colors: true });
    console.log("------------------------------------");

    // Optional: Add a simple assertion
    if (!result || Object.keys(result).length === 0) {
        console.warn("⚠️  Warning: Parser returned an empty object.");
    }

  } catch (err) {
    console.error("❌ CRITICAL ERROR during test:");
    console.error(err);
  }
}

runTest();