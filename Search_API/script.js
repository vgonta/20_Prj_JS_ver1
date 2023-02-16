// API ENDPOINT : `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`
const form = document.querySelector("form");
const input = document.querySelector("input");
const errorMessage = document.querySelector(".error-message");
const loader = document.querySelector(".loader");
const resultsDisplay = document.querySelector(".results-display");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    if (input.value === "") {
        errorMessage.textContent = "Wops, veuillez remplir le input";
        return;
    } else {
        errorMessage.textContent = "";
        loader.style.display = "flex";
        resultsDisplay.textContent = "";
        wikiApiCall(input.value);
    }
}

async function wikiApiCall(searchInput) {
    try {
        const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`);

        if (!response.ok) {
            throw new Error(`${response.status}`);
        }

        console.log(response);
        const data = await response.json();
        console.log(data);

        createCards(data.query.search);
    } catch(error) {
        errorMessage.textContent = `${error}`;
        loader.style.display = "none";
    }
}

function createCards(data) {
    if (!data.length) {
        errorMessage.textContent = "Wops, aucun résultat";
        loader.style.display = "none";
        return;
    } else {
        data.forEach(element => {
            const url = `https://en.wikipedia.org/?curid=${element.pageid}`;
            const card = document.createElement("div");
            card.className = "result-item";
            card.innerHTML = `
                <h3 class="result-title">
                    <a href=${url} target="_blank">${element.title}</a>;
                </h3>;
                <a href=${url} class="result-link" target="_blank">${url}</a>;
                <span class="result-snippet">${element.snippet}</span>;
                <br />;
            `;

            resultsDisplay.appendChild(card);
        });
        loader.style.display = "none";
    }
}