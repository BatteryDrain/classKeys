SING = true;
MULTI = true;
WIND = true;
APLE = true;
LINX = true;

if (document.cookie.includes("-=")) {
    lightmode.checked = true;
    content.style.backgroundColor = "rgb(205, 205, 205)";
}

populate();

lightmode.addEventListener("change", () => {
    if (lightmode.checked) {
        content.style.backgroundColor = "rgb(205, 205, 205)";
        document.cookie = "-=true; path=/";
    } else {
        content.style.backgroundColor = "";
        document.cookie = "-=; Max-Age=0; path=/";
    }
    populate();
});

sing.addEventListener("change", () => {
    if(SING){
        if(!MULTI){
            multi.checked = true;
            MULTI = true;
        }
        SING = false;
    } else {
        SING = true;
    }
    populate();
});

multi.addEventListener("change", () => {
    if(MULTI){
        if(!SING){
            sing.checked = true;
            SING = true;
        }
        MULTI = false;
    } else {
        MULTI = true;
    }
    populate();
});

wind.addEventListener("change", () => {
    if(WIND){
        if(!APLE && !LINX){
            num = randomIntFromInterval(1,2);
            if(num == 1){
                aple.checked = true;
                APLE = true;
            } else {
                linx.checked = true;
                LINX = true;
            }
        }
        WIND = false;
    } else {
        WIND = true;
    }
    populate();
});

aple.addEventListener("change", () => {
    if(APLE){
        if(!WIND && !LINX){
            num = randomIntFromInterval(1,2);
            if(num == 1){
                wind.checked = true;
                WIND = true;
            } else {
                linx.checked = true;
                LINX = true;
            }
        }
        APLE = false;
    } else {
        APLE = true;
    }
    populate();
});

linx.addEventListener("change", () => {
    if(LINX){
        if(!WIND && !APLE){
            num = randomIntFromInterval(1,2);
            if(num == 1){
                wind.checked = true;
                WIND = true;
            } else {
                aple.checked = true;
                APLE = true;
            }
        }
        LINX = false;
    } else {
        LINX = true;
    }
    populate();
});

showOhide.addEventListener("click", () => {
    angle.classList.toggle("more");
    filters.classList.toggle("hide");
    if(filters.classList.contains("hide")){
        showOhide.innerHTML = "show filters";
    } else {
        showOhide.innerHTML = "hide filters";
    }
});



function populate() {
    content.replaceChildren();
    for(let i=0; i<DATASORTED.length; i++){
        if(DATASORTED[i][2] != ""){
            players = DATASORTED[i][4];
            if(players == "b" || (players == "s" && SING) || (players == "m" && MULTI)){
                w = (DATASORTED[i][4] != "");
                a = (DATASORTED[i][5] != "");
                l = (DATASORTED[i][6] != "");
                if((WIND && w) && (APLE && a) && (LINX && l)){
                    place(i);
                }
            }
        }
        count.innerHTML = content.childElementCount;
    }
}


function place(g) {
    const fig = document.createElement('figure');
        const figC = document.createElement('figcaption');
            figC.innerHTML = DATASORTED[g][1];
            if(lightmode.checked){
                figC.style.color = "rgb(0,0,0)";
            }
            fig.appendChild(figC);

        const foto = document.createElement("img");
            foto.classList.add("foto");
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
                        console.error("no picture could be found, or assumed for game id " + DATASORTED[g][0]);
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
        const div = document.createElement("div");
            div.classList.add("row");
            const p = document.createElement("p");
                if(lightmode.checked){
                    p.style.color = "rgb(0,0,0)";
                }
                if(DATASORTED[g][4] == "s"){
                    p.innerHTML = "singleplayer";
                } else {
                    if(DATASORTED[g][4] == "b"){
                        p.innerHTML = "multiplayer & singleplayer";
                    } else {
                        if(DATASORTED[g][4] == "m"){
                            p.innerHTML = "multiplayer";
                        } else {
                            p.innerHTML = "error";
                            console.error("singleplayer? not entered on game id " + DATASORTED[g][0]);
                        }
                    }
                }
                div.appendChild(p);
            div2 = document.createElement("div");
                div2.classList.add("row");
                div2.classList.add("div2");
                if(DATASORTED[g][5] != ""){
                    const pic = document.createElement("img");
                    pic.src = "assets/Windows.svg.png";
                    pic.alt = "windows logo";
                    pic.width = "20";
                    pic.height = "20";
                    div2.appendChild(pic);
                }
                if(DATASORTED[g][6] != ""){
                    const pic = document.createElement("img");
                    pic.src = "assets/Apple_white.svg.png";
                    pic.alt = "apple logo";
                    pic.width = "20";
                    pic.height = "20";
                    div2.appendChild(pic);
                }
                if(DATASORTED[g][7] != ""){
                    const pic = document.createElement("img");
                    pic.src = "assets/linux-white-logo.png";
                    pic.alt = "linux logo";
                    pic.width = "20";
                    pic.height = "20";
                    div2.appendChild(pic);
                }
                div.appendChild(div2);
            fig.appendChild(div);
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

// Source - https://stackoverflow.com/a/7228322
// Posted by Francisc, modified by community. See post 'Timeline' for change history
// Retrieved 2026-02-01, License - CC BY-SA 4.0

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}