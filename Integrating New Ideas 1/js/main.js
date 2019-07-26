document.addEventListener("DOMContentLoaded", init);
function init(){
    let listItems = document.getElementById("sideBar").getElementsByClassName("listItem");

    for(let i in listItems){
        if(listItems.hasOwnProperty(i)){
            let title = listItems[i].firstElementChild.innerText.toLowerCase();
            listItems[i].addEventListener("click", () => updateMainBox(title));
        }
    }
}

async function getData(URL){
    try{
        return await tryGetData(URL);
    }catch(err){
        alert(err);
        console.log(err);
    }
}

async function tryGetData(URL){
    const jsonData = await fetch(URL);
    if (!jsonData.ok)
        throw Error(`Failed to fetch from: ${URL}`);
    return await jsonData.json();
}

async function updateMainBox(title) {
    let mainBox = document.getElementById("mainBox");
    const URL = `https://jsonplaceholder.typicode.com/${title}`;

    let data = await getData(URL);

    while(mainBox.firstChild)
        mainBox.removeChild(mainBox.firstChild);

    for(let i = 0; i < data.length; ++i){
        let entries = Object.entries(data[i]);
        let text = "";
        for(let i = 0; i < entries.length; i++){
            if(typeof entries[i][1] === "object")
                entries[i][1] = Object.entries(entries[i][1]);
            text += entries[i][0] + ": " + entries[i][1] + "\n";
        }
        let row = document.createElement("DIV");
        row.className = "listItem";
        let rowDescription = document.createElement("P");
        rowDescription.className = "listItemDesc";
        rowDescription.innerText = text;

        mainBox.appendChild(row);
        row.appendChild(rowDescription);

    }
}