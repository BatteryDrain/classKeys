SING = true;
MULTI = true;
WIND = true;
APLE = true;
LINX = true;
CAP = null;

setconst();

function setconst() {
    if(window.innerWidth > 710){
        lightmodeSWT = document.getElementById("lightmode2");
        singSWT =document.getElementById("sing2");
        multiSWT = document.getElementById("multi2");
        windSWT = document.getElementById("wind2");
        apleSWT = document.getElementById("aple2");
        linxSWT = document.getElementById("linx2");
        sortSEL = document.getElementById("sort2");
        searchIN = document.getElementById("search2");
        countN = document.getElementById("count2");
    } else {
        lightmodeSWT = document.getElementById("lightmode");
        singSWT =document.getElementById("sing");
        multiSWT = document.getElementById("multi");
        windSWT = document.getElementById("wind");
        apleSWT = document.getElementById("aple");
        linxSWT = document.getElementById("linx");
        sortSEL = document.getElementById("sort");
        searchIN = document.getElementById("search");
        countN = document.getElementById("count");
    }
}

if (document.cookie.includes("-=")) {
    lightmodeSWT.checked = true;
    content.style.backgroundColor = "rgb(205, 205, 205)";
    foot.style.backgroundColor = "rgb(205, 205, 205)";
    document.body.style.backgroundColor = "rgb(205, 205, 205)";
}

populate();

lightmodeSWT.addEventListener("change", () => {
    if (lightmodeSWT.checked) {
        content.style.backgroundColor = "rgb(205, 205, 205)";
        foot.style.backgroundColor = "rgb(205, 205, 205)";
        document.body.style.backgroundColor = "rgb(205, 205, 205)";
        document.cookie = "-=true; path=/";
    } else {
        content.style.backgroundColor = "";
        foot.style.backgroundColor = "";
        document.body.style.backgroundColor = "";
        document.cookie = "-=; Max-Age=0; path=/";
    }
    populate();
});

singSWT.addEventListener("change", () => {
    if(SING){
        if(!MULTI){
            multiSWT.checked = true;
            MULTI = true;
        }
        SING = false;
    } else {
        SING = true;
    }
    populate();
});

multiSWT.addEventListener("change", () => {
    if(MULTI){
        if(!SING){
            singSWT.checked = true;
            SING = true;
        }
        MULTI = false;
    } else {
        MULTI = true;
    }
    populate();
});

windSWT.addEventListener("change", () => {
    if(WIND){
        WIND = false;
    } else {
        WIND = true;
    }
    populate();
});

apleSWT.addEventListener("change", () => {
    if(APLE){
        APLE = false;
    } else {
        APLE = true;
    }
    populate();
});

linxSWT.addEventListener("change", () => {
    if(LINX){
        LINX = false;
    } else {
        LINX = true;
    }
    populate();
});

showOhide.addEventListener("click", () => {
    toggleF();
});

pick.addEventListener("click", () => {
    searchIN.value = "";
    populate();
    temp = randomIntFromInterval(0, (CAP.length - 1));
    temp = CAP[temp].innerHTML;
    searchIN.value = temp;
    populate();
    clear();
});

clearBTN.addEventListener("click", () => {
    searchIN.value = "";
    console.log("search cleared");
    clear();
    populate();
});

logo.addEventListener("click", () => {
    searchIN.value = "";
    console.log("search cleared");
    clear();
    populate();
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
});


sortSEL.addEventListener("change", () => {
    populate();
});

searchIN.addEventListener("change", () => {
    populate();
    if(!filters.classList.contains("hide")){
        toggleF();
    }
    clear();
});

window.addEventListener('resize', function() {
    if(window.innerWidth > 710){
        document.documentElement.style.overscrollBehavior = "none";
    }
    setconst();
});

let scrollIntent = false;
let intentTimeout = null;
let gestureLock = false;

function markScrollIntent() {
    scrollIntent = true;

    clearTimeout(intentTimeout);
    intentTimeout = setTimeout(() => {
        scrollIntent = false;
    }, 200);
}

function tryTriggerFromInput() {
    if (!pageCanScroll() && !gestureLock) {
        gestureLock = true;

        if (!filters.classList.contains("hide")) {
            toggleF();
        }

        setTimeout(() => gestureLock = false, 250);
    }
}

function pageCanScroll() {
    return document.documentElement.scrollHeight > window.innerHeight;
}

window.addEventListener("wheel", () => {
    markScrollIntent();
    tryTriggerFromInput();
}, { passive: true });

window.addEventListener("touchmove", () => {
    markScrollIntent();
    tryTriggerFromInput();
}, { passive: true });

window.addEventListener("keydown", (e) => {
    const keys = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Space"];
    if (keys.includes(e.code)) {
        markScrollIntent();
        tryTriggerFromInput();
    }
});

window.addEventListener("scroll", () => {
    if (!scrollIntent || gestureLock) return;

    gestureLock = true;

    if (!filters.classList.contains("hide")) {
        toggleF();
    }

    setTimeout(() => {
        gestureLock = false;
        scrollIntent = false;
    }, 250);
});


function populate() {
    content.replaceChildren();
    if(sortSEL.value == "rand"){
        preplace(DATARAND);
    } else {
        if(sortSEL.value == "name"){
            preplace(DATANAME);
        } else { 
            preplace(DATASORTED);
        }
    }
    countN.innerHTML = content.childElementCount;
    document.body.style.overflowY = "hidden";
    CAP = document.querySelectorAll("figure > figcaption");
}

function preplace(list) {
    for(let i=0; i<list.length; i++){
        if(list[i][2] != ""){
            players = list[i][4];
            if(players == "b" || (players == "s" && SING) || (players == "m" && MULTI)){
                w = (list[i][5] != "");
                a = (list[i][6] != "");
                l = (list[i][7] != "");
                if((w && WIND == w) || (a && APLE == a) || (l && LINX == l)){
                    name = list[i][1].toLowerCase();
                    if(name.includes(searchIN.value.toLowerCase()) || searchIN.value == ""){
                        place(i, list);
                    }
                    
                }
            }
        }
    }
}


function place(g, data) {
    const fig = document.createElement('figure');
        const figC = document.createElement('figcaption');
            figC.innerHTML = data[g][1];
            if(lightmodeSWT.checked){
                figC.style.color = "rgb(0,0,0)";
            }
            fig.appendChild(figC);

        const foto = document.createElement("img");
            foto.classList.add("foto");
            foto.alt = "game cover for " + data[g][1];
            pict = data[g][3];
            if (pict == "") {
                temp = findPicWithID(data[g][0]);
                if (!temp) {
                    console.error("no steam code could be found for ID = " + g - 1);
                } else {
                    foto.src = `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${temp}/header.jpg`;
                    foto.onload = () => {
                        console.log("no picture found, assuming url");
                    };

                    foto.onerror = () => {
                        console.warn("Image failed:", foto.src);
                        console.error("no picture could be found, or assumed for game id " + data[g][0]);
                    };
                }
            } else {
                foto.src = pict;
            }
            foto.style.backgroundColor = "rgb(0, 0, 0)";
            foto.setAttribute("onclick", "goToLink(" + data[g][0] + ")");
            foto.loading = "lazy";
            foto.decoding = "async";
            fig.appendChild(foto);
        const div = document.createElement("div");
            div.classList.add("row");
            const p = document.createElement("p");
                if(lightmodeSWT.checked){
                    p.style.color = "rgb(0,0,0)";
                }
                if(data[g][4] == "s"){
                    p.innerHTML = "singleplayer";
                } else {
                    if(data[g][4] == "b"){
                        p.innerHTML = "singleplayer & multiplayer";
                    } else {
                        if(data[g][4] == "m"){
                            p.innerHTML = "multiplayer";
                        } else {
                            p.innerHTML = "error";
                            console.error("singleplayer? not entered on game id " + data[g][0]);
                        }
                    }
                }
                div.appendChild(p);
            div2 = document.createElement("div");
                div2.classList.add("row");
                div2.classList.add("div2");
                if(data[g][5] != ""){
                    const pic = document.createElement("img");
                    pic.src = "assets/Windows.svg.png";
                    pic.alt = "windows logo";
                    pic.width = "20";
                    pic.height = "20";
                    div2.appendChild(pic);
                }
                if(data[g][6] != ""){
                    const pic = document.createElement("img");
                    pic.src = "assets/Apple_white.svg.png";
                    pic.alt = "apple logo";
                    pic.width = "20";
                    pic.height = "20";
                    div2.appendChild(pic);
                }
                if(data[g][7] != ""){
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
            window.open(DATA[index][2], "_blank");
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

function toggleF(){
        angle.classList.toggle("more");
    filters.classList.toggle("hide");
    if(filters.classList.contains("hide")){
        showOhide.innerHTML = "show filters";
    } else {
        showOhide.innerHTML = "hide filters";
    }
}

function clear() {
    if(searchIN.value.length == 0){
        if(!clearBTN.classList.contains("hide")){
            clearBTN.classList.toggle("hide");
        }
    } else {
        if(clearBTN.classList.contains("hide")){
            clearBTN.classList.toggle("hide");
        }
    }
}