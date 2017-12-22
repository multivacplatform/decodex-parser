const fs = require('fs');

const hoaxLinesFile = fs.createWriteStream("./data/hoax_lines.json");
const debunkLinesFile = fs.createWriteStream("./data/debunk_lines.json");

const _ = require("lodash");

let parsedJSON = require('./data/hoax_debunks.json');

Object.keys(parsedJSON.hoaxes).forEach(function(key) {
    // console.log("key: ", key, "second: ", parsedJSON.hoaxes[key]);
    let newJSON = {"link": key, "storyId": parsedJSON.hoaxes[key]};
    hoaxLinesFile.write(JSON.stringify(newJSON));
    hoaxLinesFile.write("\n");
});

Object.keys(parsedJSON.debunks).forEach(function(key) {
    let newJSON = {
        "storyId": key,
        "storyTitle": parsedJSON.debunks[key][0],
        "status": parsedJSON.debunks[key][1],
        "reason": parsedJSON.debunks[key][2],
        "verification": parsedJSON.debunks[key][3]
    };
    debunkLinesFile.write(JSON.stringify(newJSON));
    debunkLinesFile.write("\n");
});