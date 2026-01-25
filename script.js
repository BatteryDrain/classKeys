console.log("in script.js");

populate();

lightmode.addEventListener("change", () => {
    if(lightmode.checked){
        content.style = "backgroundColor: rgb(255, 255, 255);";
    }
});

async function populate() {
    content.replaceChildren();
    for(i=1; i<DATASORTED.length; i++){
        if(DATASORTED[i][1] != "" && DATASORTED[i][2] != ""){
            await place(i);
        }
        count.innerHTML = content.childElementCount;
    }
}


async function place(g) {
    fig = document.createElement('figure');
        figC = document.createElement('figcaption');
            figC.innerHTML = DATASORTED[g][1];
            fig.appendChild(figC);

        foto = document.createElement("img");
            foto.alt = "game cover for " + DATASORTED[g][1];
            pict = DATASORTED[g][3];
            if (pict == "") {
                temp = await findPicWithID(DATASORTED[g][0]);
                foto.src = "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/" + temp + "/header.jpg";
                if(await checkIfImageIsValid(temp)){
                    console.log("no picture fount assuming from steam code of: " + temp);
                } else {
                    console.error("no picture could be found, or assumed for " + DATASORTED[g][1] + " g = " + g - 1);
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
    for(i=0; i<PICS.length; i++){
        if(PICS[i][0] == ID){return PICS[i][1];}
    }
    return null;
}

function checkIfImageIsValid(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        
        img.onload = () => {
            console.log(`Image from ${url} loaded successfully.`);
            resolve(true); 
        };
        
        img.onerror = () => {
            console.error(`Image from ${url} failed to load.`);
            resolve(false);
        };
    });
}