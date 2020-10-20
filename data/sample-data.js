/* 
this file makes a sample of the full data set
the full data can be found at 
  https://figshare.com/articles/Portal_Project_Teaching_Database/1314459
the full data set is 'surveys.csv'
this file is meant to be run on the command line
the seed used to generate data/data.csv was 'theseed'
*/

/*
-- command line args --
 inputFile: file to read from
 numLines: number of lines to keep
 outputFile: file to write
 seed: seed for random number generator
/*

/*
-- usage --
node path/to/sample-data.js path/to/surveys.csv 10 path/to/output.csv 'aseed'
*/

const fs = require('fs') 
const seedrandom = require('seedrandom')

const [inputFile, numLines, outputFile, seed] = process.argv.splice(2) 
let rng = seedrandom(seed) // initialize rng object
const lines = fs.readFileSync(inputFile, 'utf-8') 
    .split('\n') 
header = lines[0] 
const sample = lines.slice(1) 
    .map(line => [rng(), line])
    .sort((left, right) => { return left[0] - right[0] }) 
    .slice(0, parseInt(numLines)) 
    .map(pair => pair[1]) 
fs.writeFileSync(outputFile, header + '\n' + sample.join('\n'))