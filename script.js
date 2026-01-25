console.log("in script.js");

populate();

lightmode.addEventListener("change", () => {
    if(lightmode.checked){
        content.style.backgroundColor = "rgba(205, 205, 205, 1)";
    } else {
        content.style.backgroundColor = "";
    }
});

function populate() {
    content.replaceChildren();
    for(let i=1; i<DATASORTED.length; i++){
        if(DATASORTED[i][1] != "" && DATASORTED[i][2] != ""){
            place(i);
        }
        count.innerHTML = content.childElementCount;
    }
}


function place(g) {
    const fig = document.createElement('figure');
        const figC = document.createElement('figcaption');
            figC.innerHTML = DATASORTED[g][1];
            fig.appendChild(figC);

        const foto = document.createElement("img");
            foto.alt = "game cover for " + DATASORTED[g][1];
            pict = DATASORTED[g][3];
            if (pict == "") {
                temp = findPicWithID(DATASORTED[g][0]);
                if (!temp) {
                    console.error("no steam code could be found for ID = " + g - 1);
                } else {
                    foto.src = `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${temp}/header.jpg`;
                    foto.onload = () => {
                        console.log("no picture found, assuming url");
                    };

                    foto.onerror = () => {
                        console.warn("Image failed:", foto.src);
                        console.error("no picture could be found, or assumed for " + DATASORTED[g][1] + " ID = " + g - 1);
                    };
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

function findPicWithID(ID){
    for(let i=0; i<PICS.length; i++){
        if(PICS[i][0] == ID){return PICS[i][1];}
    }
    return null;
}