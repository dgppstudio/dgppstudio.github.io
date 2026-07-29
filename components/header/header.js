function initHeader() {

    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".main-navigation");

    if (!menuButton || !navigation) return;

    menuButton.addEventListener("click", () => {

        navigation.classList.toggle("open");

        const isOpen = navigation.classList.contains("open");

        menuButton.setAttribute("aria-expanded", isOpen);

    });

}