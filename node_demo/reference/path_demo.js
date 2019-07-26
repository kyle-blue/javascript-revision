const path = require("path");

console.log("FULL __filename: " + __filename); //Dir and filename
console.log("Base name: " + path.basename(__filename)); //Just file name / base name
console.log("Ext name: " + path.extname(__filename)); //Just extension name
console.log("Dir name: " + path.dirname(__filename)); //Just directory name

//To separate all of these into an object use path.parse:
const fileInfo = path.parse(__filename);
console.table(fileInfo);
console.log("Base from parsed path object: " + fileInfo.base);

//We can also concatenate paths:
console.log("Person module: " + path.join(fileInfo.dir, "..", "js", "person.js")); //This can have any number of args / folders per arg
