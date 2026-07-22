const projectNav = document.querySelector(".project-nav");

const toggle = document.querySelector(".project-nav-toggle");

toggle.addEventListener("click", () => {

    projectNav.classList.toggle("open");

});

document.addEventListener("click",(e)=>{

    if(!projectNav.contains(e.target)){

        projectNav.classList.remove("open");

    }

});

const links=document.querySelectorAll(".project-nav a");

links.forEach(link=>{

    link.addEventListener("click",()=>{

        projectNav.classList.remove("open");

    });

});
