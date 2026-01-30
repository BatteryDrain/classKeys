SMALLARRAY = [];
DATA = [[]];
DATASORTED = [[]];
MOVIETAGS = [[]];
WATCH = [[]];
PICS = [];


const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRz1Mx3lGUfZ4qkWlQu36zYPBfgYN6I_9AJy1ersgxtpczS9Y8V0T43KAvELTWOcSPBaLC69an09UGQ/pub?output=csv';

fetch(url)
.then(response => response.text())
.then(temp => {
    // console.log("CSV text:", temp);
    csvToBIGARRAY(temp);
})
.catch(error => {
    console.error('Error:', error);
});


function csvToBIGARRAY(csvString) {
    SMALLARRAY = csvString
    .toString().split("\r\n")
    .map(r => r.split(","));
    
    DATA = SMALLARRAY;
    for(d=0; d<DATA.length; d++){
        DATASORTED.push(DATA[d]);
    }

    for(i=0; i<DATASORTED.length; i++){
        if(DATASORTED[i] && DATASORTED[i][2] && DATASORTED[i][2] !== ""){
            temp = DATASORTED[i][2].split("/");
            PICS.push([parseInt(DATASORTED[i][0]), parseInt(temp[4])]);
        }
    }

    DATASORTED.splice(0, 1);

    // shuffle(DATASORTED);

    loadScript("script.js", () => {

    });
}

// Source - https://stackoverflow.com/a/2450976
// Posted by ChristopheD, modified by community. See post 'Timeline' for change history
// Retrieved 2026-01-29, License - CC BY-SA 4.0

function shuffle(array) {
  let currentIndex = array.length;
  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}
// let arr = [2, 11, 37, 42];
// shuffle(arr);
// console.log(arr);

function loadScript(src, callback) {
    const script = document.createElement("script");
    script.src = src;
    script.onload = callback;
    document.body.appendChild(script);
}