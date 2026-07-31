function initFloatingMenu(){

    buildMenu();

    initMenuToggle();

    initMenuLinks();

    initScrollSpy();

    initBackToTop();

}


function buildMenu(){

    const menuItems=document.querySelector(".menu-items");

    if(!menuItems)return;

    const currentPage=document.body.dataset.page;

    const page=portfolioPages.find(item=>item.id===currentPage);

    if(!page)return;

    menuItems.innerHTML=page.sections.map(section=>`
        <a href="#${section.id}" class="floating-link">
            ${section.label}
        </a>
    `).join("");

}


function initMenuToggle(){

    const menuButton=document.querySelector(".floating-menu-toggle");
    const menuPanel=document.querySelector(".menu-panel");

    if(!menuButton||!menuPanel)return;

    menuButton.addEventListener("click",()=>{

        menuPanel.classList.toggle("open");

    });

}


function initMenuLinks(){

    const menuPanel=document.querySelector(".menu-panel");
    const links=document.querySelectorAll(".floating-link");

    if(!menuPanel||!links.length)return;

    links.forEach(link=>{

        link.addEventListener("click",()=>{

            menuPanel.classList.remove("open");

            links.forEach(item=>{
                item.classList.remove("active");
            });

            link.classList.add("active");

        });

    });

}


function initScrollSpy(){

    const links=document.querySelectorAll(".floating-link");

    if(!links.length)return;

    const sections=[...links]
        .map(link=>{
            const id=link.getAttribute("href").substring(1);
            return document.getElementById(id);
        })
        .filter(Boolean);

    if(!sections.length)return;

    function updateActiveLink(){

        let currentSection=null;

        sections.forEach(section=>{

            const rect=section.getBoundingClientRect();

            if(rect.top<=200){
                currentSection=section;
            }

        });

        links.forEach(link=>{
            link.classList.remove("active");
        });

        if(currentSection){

            const activeLink=document.querySelector(
                `.floating-link[href="#${currentSection.id}"]`
            );

            if(activeLink){
                activeLink.classList.add("active");
            }

        }

    }

    window.addEventListener("scroll",updateActiveLink);

    updateActiveLink();

}

function initBackToTop(){

    const backButton=document.querySelector(".back-to-top");

    if(!backButton)return;

    backButton.addEventListener("click",()=>{

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });

    });

}