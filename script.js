console.log("in script.js");

populate();



function populate() {
    content.replaceChildren();
    for(i=1; i<DATASORTED.length; i++){
        if(DATASORTED[i][1] != "" && DATASORTED[i][3] != ""){
            place(i);
        }
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
                console.error("no image url for " + DATASORTED[g][1]);
            } else {
                foto.src = pict;
            }
            foto.style.backgroundColor = `hsl(${place * 108}, ${65}%, ${30}%)`;
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