const path = require("path");
//const fs = require("fs"); //const fsp = fs.promises; // TO USE PROMISE VERSION (if not using fs-extra extension)
const fs = require("fs-extra");
//Often functions from the fs module are asynchronous (unless you use sync version)
//This means they take a callback as the last argument


async function writeToFileThenRead(dir, fileName, message){
    const FULL_FILENAME= path.join(dir, fileName);

    //Create a folder (using promise) [to use callback use fs.mkdir instead of fsp.mkdir]
    //fs.mkdirSync("TESTDIR"); //Synchronous version (must try/catch error)
    await fs.mkdirp(dir); //mkdirp instead of mkdir uses -p flag to avoid dir already exists error
    await fs.writeFile(FULL_FILENAME, message); //To just append file and not write to just use fs.appendFile
    console.log(`Successfully written message to: ${fileName}`);

    await fs.readFile(FULL_FILENAME, "utf-8")
        .then(data => console.log(`Data from ${fileName}: "${data}"`));

    await fs.rename(FULL_FILENAME, path.join(dir, "myOTHERfile.txt"));
    console.log("Renamed file...");
}
//As you may notice, many of filesystem functions are the same as linux terminal commands (e.g. chown chmod etc)

writeToFileThenRead(path.join(__dirname, "TESTDIR"), "myfile.txt", "HELLO WORLD!")
    .catch(err => console.log(err));