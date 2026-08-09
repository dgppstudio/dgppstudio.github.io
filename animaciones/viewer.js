// ======================================
// Configuración general
// ======================================

const defaults = {

    bg:"#8898A8",

    width:220,

    height:220,

    scale:1,

    x:0,

    y:0,

    fit:"contain",

    stopFrame:null

};


// ======================================
// Animaciones
// ======================================

let animations = [

    { name:"Intro Sitio LMS", file:"animaciones/introLogoLMS.svg", fit:"fill", bg:"#ffffff" },

    { name:"Gamification Sitio LMS", file:"animaciones/game.json", bg:"#009ee2", width:220, height:220, scale:.8, x:40, y:35 },

    { name:"Apps Sitio LMS", file:"animaciones/moviles.json", bg:"#009ee2", width:220, height:220, scale:.8, x:40, y:35 },
    
    { name:"Logo Punto Abordo", file:"animaciones/logoPA.json", bg:"#242047", width:400, height:220, scale:.5, x:0, y:25 },
   
    { name:"Autobus Punto Abordo", file:"animaciones/autobus.json", bg:"#242047", width:280, height:220, scale:.75, x:0, y:35 },

    { name:"Feria Punto Abordo", file:"animaciones/animFeria-01.svg", fit:"contain", bg:"#242047" },

    { name:"Logo GrillUp", file:"animaciones/logoGrillUp.json", bg:"#1B1B1B", width:1920, height:1080, scale:.20, x:0, y:0, stopFrame:null },

    { name:"Emails Punto Abordo", file:"animaciones/compu.json", bg:"#242047", width:520, height:220, scale:.6, x:20, y:-10 },

    { name:"Logo 25 Años LMS", file:"animaciones/logo25LMS.json", bg:"#ffffff", width:1920, height:1080, scale:.20, x:0, y:0, stopFrame:235 }

];


// ======================================
// Grid
// ======================================

const grid = document.getElementById("grid");

animations.forEach((anim,index)=>{

    const card = document.createElement("div");

    card.className = "card";

    card.innerHTML = `

        <div class="viewer" id="viewer${index}">

        <div class="stage" id="stage${index}"></div>

        </div>

        <div class="title">${anim.name}</div>
        

    `;

    grid.appendChild(card);

    loadAnimation(anim,index);

});



// ======================================
// Carga
// ======================================

function loadAnimation(anim,index){

    const config = {

        ...defaults,

        ...anim

    };


    const viewer = document.getElementById(`viewer${index}`);

    const stage = document.getElementById(`stage${index}`);


    viewer.style.width = "220px";
    viewer.style.height = "220px";
    viewer.style.background = config.bg;

    stage.style.width = config.width + "px";
    stage.style.height = config.height + "px";


    stage.style.transform = `

        translate(-50%,-50%)

        translate(${config.x}px,${config.y}px)

        scale(${config.scale})

    `;



    // ======================================
    // SVG
    // ======================================

    if(config.file.toLowerCase().endsWith(".svg")){

    fetch(config.file)

    .then(r => r.text())

    .then(svg => {

        stage.innerHTML = svg;

        const el = stage.querySelector("svg");

        if(el){

            el.style.width="100%";
            el.style.height="100%";

        }

    });

    return;

}



    // ======================================
    // JSON
    // ======================================

    fetch(config.file)

    .then(r=>r.json())

    .then(json=>{

        // -----------------------------
        // SnapSVGAnimator
        // -----------------------------

        if(json.DOMDocument){

            const svg = new SVGAnim(

                json,

                config.width,

                config.height,

                24

            );

            svg.mc.gotoAndStop(svg.mc.m_frameCount);

            viewer.addEventListener("mouseenter", ()=>{

            svg.mc.gotoAndPlay(1);

            });

            // ocupa todo el stage
            svg.s.node.style.width = "100%";
            svg.s.node.style.height = "100%";

            // importante
            svg.s.node.style.display = "block";

            // mantiene la relación
            svg.s.attr({

                preserveAspectRatio:"xMidYMid meet"

            });


            stage.appendChild(svg.s.node);

            return;

        }



        // -----------------------------
        // Lottie
        // -----------------------------

        if(json.v){

    stage.innerHTML = "";

    const animation = lottie.loadAnimation({

        container: stage,

        renderer: "svg",

        loop: true,

        autoplay: false,

        animationData: json,

        rendererSettings:{
            preserveAspectRatio:"xMidYMid meet"
        }

    });

    animation.addEventListener("DOMLoaded", () => {

    animation.goToAndStop(
    config.stopFrame ?? animation.totalFrames,
    true
    );

    viewer.addEventListener("mouseenter", () => {
        animation.goToAndPlay(0, true);
    });

    viewer.addEventListener("mouseleave", () => {
    animation.goToAndStop(
    config.stopFrame ?? animation.totalFrames,
    true
    );
    });

    });

    animation.stop();

    viewer.addEventListener("mouseenter", () => animation.play());
    viewer.addEventListener("mouseleave", () => {
    animation.stop();
    });

    animation.addEventListener("DOMLoaded", ()=>{

        const svg = stage.querySelector("svg");

        if(svg){

            svg.style.width="100%";
            svg.style.height="100%";
            svg.style.display="block";

        }

    });

    return;

}

    })

    .catch(error=>{

        console.log(config.file,error);

    });

}