const portfolioPages = [
    {
        title: "Inicio",
        url: "/index.html"
    },
    {
        title: "Reinicio 50+",
        url: "/reinicio50.html"
    },
    {
        title: "Sitio CamPack",
        url: "/sitiocampack.html"
    },
    {
        title: "App CamPack",
        url: "/appcampack.html"
    },
    {
        title: "Apps",
        url: "/aplicaciones.html"
    },
    {
        title: "Sitios",
        url: "/sitios.html"
    },
    {
        title: "Identidad",
        url: "/identidad.html"
    }
];

function initFooter(){

    const previousLink=document.querySelector(".footer-prev");
    const nextLink=document.querySelector(".footer-next");

    if(!previousLink || !nextLink) return;

    const currentPage=window.location.pathname.split("/").pop() || "index.html";

    const currentIndex=portfolioPages.findIndex(page=>page.url.replace("/","")===currentPage);

    if(currentIndex===-1) return;

    const previousPage=portfolioPages[currentIndex-1];
    const nextPage=portfolioPages[currentIndex+1];

    if(previousPage){

        previousLink.href=previousPage.url;
        previousLink.innerHTML=`
            <small>Proyecto anterior</small>
            <span>← ${previousPage.title}</span>
        `;

    }else{

        previousLink.style.visibility="hidden";

    }

    if(nextPage){

        nextLink.href=nextPage.url;
        nextLink.innerHTML=`
            <small>Proyecto siguiente</small>
            <span>${nextPage.title} →</span>
        `;

    }else{

        nextLink.style.visibility="hidden";

    }

}