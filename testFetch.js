const vm = require('vm');
const fs = require('fs');
const { parseGoogleSheets } = require('/Users/maxolsen/rowing-scraper-api/scraper');

const config = {
    "scraperConfig": {
        "parserType": "GOOGLE_SHEETS",
        "spreadsheetId": "17ncXjfaURpFkV2xGgfbQmKizRVDleS8Ga7b4bJyp4jE",
        "sheetName": "Sheet1",
        "startIndex": 1,
        "postProcessorFile": "./cycTesting.js"
    },
    "scheduleConfig": {
        "parserType": "GOOGLE_SHEETS",
        "postProcessorFile": "./cycSchedule.js",
        "sheetName": "Sheet2",
        "spreadsheetId": "17ncXjfaURpFkV2xGgfbQmKizRVDleS8Ga7b4bJyp4jE",
        "startIndex": 1,
        "eventIndex": "a",
        "timeIndex": "b"
    }
}

// 1. Configuration
const DEV_MODE = true;
const LOCAL_PATH = `./cycTesting.js`;

// 2. The Loading Logic (refined)
async function loadParser() {
  if (DEV_MODE) {
    console.log("🛠️  Running in DEV_MODE: Loading from disk...");
    // Clear cache so changes in the file are picked up immediately
    delete require.cache[require.resolve(LOCAL_PATH)];
    console.log(LOCAL_PATH);
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
    const sampleData = await parseGoogleSheets(config.scraperConfig);

    console.log("🧪 Executing parser...");
    const result = await parser(sampleData, config.scheduleConfig);

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