console.log("in script.js");

populate();

lightmode.addEventListener("change", () => {
    if(lightmode.checked){
        content.style = "backgroundColor: rgb(255, 255, 255);";
    }
});

function populate() {
    content.replaceChildren();
    for(i=1; i<DATASORTED.length; i++){
        if(DATASORTED[i][1] != "" && DATASORTED[i][2] != ""){
            place(i);
        }
        count.innerHTML = content.childElementCount;
    }
}


function place(g) {
    fig = document.createElement('figure');
        figC = document.createElement('figcaption');
            figC.innerHTML = DATASORTED[g][1];
            fig.appendChild(figC);

        foto = document.createElement("img");
            foto.alt = "game cover for " + DATASORTED[g][1];
            pict = DATASORTED[g][3];
            if (pict == "") {
                if(g < PICS.length){
                    foto.src = "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/" + PICS[g][4] + "/header.jpg";
                    console.log("no picture fount assuming from steam code of: " + PICS[g][4]);
                }
            } else {
                foto.src = pict;
            }
            foto.style.backgroundColor = "rgb(0, 0, 0)";
            foto.setAttribute("onclick", "goToLink(" + DATASORTED[g][0] + ")");
            foto.loading = "lazy";
            foto.decoding = "async";
            fig.appendChild(foto);
    content.appendChild(fig);
}

function goToLink(number){
    for(index=0; index<DATA.length; index++){
        if(DATA[index][0] == number){
            window.open(DATA[index][2], "_self");
        }
    }
}