const url = require("url");

//URL object allows you to easily separate and add URL elements
let myUrl = new URL("http://mywebsite.com:8000/somepage.html?id=101&status=active");

console.log(myUrl); //myUrl object

console.log("Full URL: " + myUrl.href); //Full URL
console.log("Host: " + myUrl.host); //Host name with port
console.log("Hostname: " + myUrl.hostname); //Host name without port
console.log("Path: " + myUrl.pathname); //Path after port or .com

//PARAMS (after question mark '?');
console.log("Params: " + myUrl.search); //Params section of URL
console.log("Params Object: " + myUrl.searchParams); //Params in an object
myUrl.searchParams.append("is_shit", "true"); //Can add and delete etc to params object
//We can also use forEach
console.log("Using foreach:");
myUrl.searchParams.forEach((value, key) => console.log(`${key}: ${value}`));