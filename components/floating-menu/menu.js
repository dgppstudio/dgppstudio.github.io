function initFloatingMenu() {
    const menuButton = document.querySelector(".floating-menu-toggle");
    const menuPanel = document.querySelector(".menu-panel");

    menuButton.addEventListener("click", () => {
        menuPanel.classList.toggle("open");

        console.log(menuPanel.className);
    });
}