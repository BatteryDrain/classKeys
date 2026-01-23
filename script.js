console.log("in script.js");

populate();



function populate() {
    content.replaceChildren();
    for(i=0; i<DATA.length; i++){
        place(i);
    }
}


function place(i) {
    fig = document.createElement('figure');
        figC = document.createElement('figcaption');
        figC.innerHTML = DATA[i][1];
        fig.appendChild(figC);
    content.appendChild(fig);
    console.log("placed");
}