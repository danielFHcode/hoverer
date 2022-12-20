const fs = require('fs');
const gen = require('./gen');
const files = require("./files");

for (const file of [files.src]) {
    fs.watch(file, gen);
}