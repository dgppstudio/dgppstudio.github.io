function loadComponent(containerId, componentPath, callback) {
    const container = document.querySelector(`#${containerId}`);

    fetch(componentPath)
        .then(response => response.text())
        .then(data => {
            container.innerHTML = data;

            if (callback) {
                callback();
            }
        });
}

loadComponent(
    "header-container",
    "components/header/header.html"
);

loadComponent(
    "footer-container",
    "components/footer/footer.html"
);

loadComponent(
    "floating-menu-container",
    "components/floating-menu/menu.html",
    initFloatingMenu
);