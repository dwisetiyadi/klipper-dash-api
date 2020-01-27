const fs = require("fs-extra");
const path = require('path');
const exec = require('child_process').exec;
require('dotenv').config();

// create compiled code directory
fs.mkdirpSync('dist');
console.log(`dist directory created`);
