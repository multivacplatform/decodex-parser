const fs = require('fs');

const hoaxLinesFile = fs.createWriteStream("./data/hoax_lines.json");
const hoaxJSONArrayFile = fs.createWriteStream("./data/hoax_array.json");

const debunkLinesFile = fs.createWriteStream("./data/debunk_lines.json");
const debunkJSONArrayFile = fs.createWriteStream("./data/debunk_array.json");

const _ = require("lodash");

let parsedJSON = require('./data/hoax_debunks.json');


//map hoaxes to JSON Lines
Object.keys(parsedJSON.hoaxes).forEach(function(key) {
    // console.log("key: ", key, "second: ", parsedJSON.hoaxes[key]);
    let newJSON = {"link": key, "storyId": parsedJSON.hoaxes[key]};
    hoaxLinesFile.write(JSON.stringify(newJSON));
    hoaxLinesFile.write("\n");
});

//map hoaxes to JSON Array
let hoaxJSONArray = {};
hoaxJSONArray.hits = [];
Object.keys(parsedJSON.hoaxes).forEach(function(key) {
    hoaxJSONArray.hits.push({"link": key, "storyId": parsedJSON.hoaxes[key]});

});
hoaxJSONArrayFile.write(JSON.stringify(hoaxJSONArray));


//map debunks to JSON Lines
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


//map debunks to JSON Array
let debunksJSONArray = {};
debunksJSONArray.hits = [];
Object.keys(parsedJSON.debunks).forEach(function(key) {
    debunksJSONArray.hits.push(
        {
            "storyId": key,
            "storyTitle": parsedJSON.debunks[key][0],
            "status": parsedJSON.debunks[key][1],
            "reason": parsedJSON.debunks[key][2],
            "verification": parsedJSON.debunks[key][3]
        }
    );

});
debunkJSONArrayFile.write(JSON.stringify(hoaxJSONArray));
