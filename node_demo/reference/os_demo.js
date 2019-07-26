const os = require("os"); //Computer info

//OS
console.log(os.platform());

//CPU
console.log(os.arch()); //CPU architecture
console.log(os.cpus()); //CPU Cores info (big object)

//MEMORY (RAM)
console.log(`Free Memory: ${(os.freemem() / 1073741824).toFixed(2)} GB`); //Maths done to convert to GB
console.log(`Max Memory: ${(os.totalmem() / 1073741824).toFixed(2)} GB`); //Maths done to convert to GB

//OTHER
console.log(os.homedir()); //Home dir of current user

console.log(os.uptime() + " seconds"); //Uptime / time since last restart