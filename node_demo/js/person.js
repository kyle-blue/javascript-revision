module.exports = class Person {
    constructor(name, age, height){
        this.name = name;
        this.age = age;
        this.height = height;
    }
    printInfo(){
        console.log(`Hello, my name is ${this.name}. I am ${this.age} years old and ${this.height} cm tall!`);
    }
    static scream(){
        console.log("ARHGGHRGHGHGHGHGHGH");
    }
};


