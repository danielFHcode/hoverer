const babel = require('@babel/core');
const fs = require('fs');
const utils = require('./utils');

/**
 * @param {string[]} dirs 
 */
function read (dirs) {
    /** @type {string[]} */
    const files = [];
    for (const dir of dirs) {
        files.push(fs.readFileSync(dir));
    }
    return files;
}

/**
 * @callback processFuncCallback
 * @param {string} file
 * @returns {string} The proceeded file.
 */
const processFuncs = {
    normal (file) {
        let processedFile = file;
        processedFile = babel.transform(file, {
            "presets": [[
                "@babel/env",
                {
                    "targets": "<0.25%, not dead",
                    "modules": "umd"
                }
            ]],
            moduleId: "hoverer"
        });
        return processedFile.code;
    },
    min (file) {
        let processedFile = file;
        processedFile = babel.transform(file, {
            "presets": [[
                "@babel/env",
                {
                    "targets": "<0.25%, not dead",
                    "modules": "umd"
                }
            ]],
            moduleId: "hoverer",
            generatorOpts: {
                comments: false
            },
            minified: true
        });
        return processedFile.code;
    },
    ES6Modules (file) {
        let processedFile = file;
        processedFile = babel.transform(file, {
            "presets": [[
                "@babel/env",
                {
                    "targets": "<0.25%, not dead",
                    "modules": false
                }
            ]],
            "moduleId": "hoverer"
        });
        return processedFile.code;
    }
}

/**
 * @param {string[]} files 
 * @param {processFuncCallback} processFunc
 */
function process (files, processFunc = processFuncs.normal) {
    /** @type {string[]} */
    const processedFiles = [];
    for (const file of files) {
        processedFiles.push(processFunc(file));
    }
    return processedFiles;
}

/**
 * @param {string[]} files 
 * @param {string[]} dirs 
 */
function write (files, dirs) {
    if (files.length !== dirs.length) throw new Error("Write Error: `files` and `dirs` arrays need to have the same length");
    for (let i in files) {
        fs.writeFileSync(dirs[i], files[i]);
    }
}

/**
 * @param {Object.<string, string>} map - A dict where the key is the input file's directory and the value is the output file's directory.
 * @param {processFuncCallback} processFunc
 */
function build (map, processFunc) {
    const inDirs = utils.map(map, (outDir, inDir) => inDir);
    const outDirs = utils.map(map, (outDir) => outDir);
    let build;
    build = read(inDirs);
    build = process(build, processFunc);
    build = write(build, outDirs)
}

/**
 * @param {string} inDir 
 * @param {string} outDir 
 */
function generateFiles (inDir, outDir) {
    // Make sure `outDir` doesn't with '.js' so a different file extension can be added later.
    outDir = outDir.trim();
    if (utils.getLastChs(outDir, 3) === '.js') {
        outDir = utils.trimStrSides(outDir, 0, 3);
    }

    build(
        utils.generateDict([inDir], [`${outDir}.js`]),
        processFuncs.normal
    );
    build(
        utils.generateDict([inDir], [`${outDir}.min.js`]),
        processFuncs.min
    );
    build(
        utils.generateDict([inDir], [`${outDir}.module.js`]),
        processFuncs.ES6Modules
    );
    
}
module.exports = generateFiles;
