const headerContainer = document.querySelector("#header-container");

fetch("components/header/header.html")
    .then(response => {

        return response.text();

    })
    .then(data => {

        headerContainer.innerHTML = data;

    });