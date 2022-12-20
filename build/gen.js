const fs = require('fs');
const builder = require('./builder');
const files = require("./files");

if (!fs.existsSync(files.distFold)) fs.mkdirSync(files.distFold);
const gen = () => builder(files.src, files.dist);
gen();
module.exports = gen;