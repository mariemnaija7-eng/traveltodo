document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("searchBtn");
    const clearBtn = document.getElementById("clearBtn");
    const searchInput = document.getElementById("searchInput");
    const resultsDiv = document.getElementById("results");

    if (searchBtn) {
        searchBtn.addEventListener("click", async () => {
            const keyword = searchInput.value.toLowerCase().trim();
            if (!keyword) return alert("Please enter a keyword.");

            const response = await fetch("travel_recommendation_api.json");
            const data = await response.json();

            let results = [];

            if (keyword.includes("beach")) results = data.beaches;
            else if (keyword.includes("temple")) results = data.temples;
            else if (keyword.includes("country")) results = data.countries;
            else alert("No results found for that keyword.");

            displayResults(results);
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            resultsDiv.innerHTML = "";
            searchInput.value = "";
        });
    }

    function displayResults(items) {
        resultsDiv.innerHTML = "";
        items.forEach(item => {
            const card = document.createElement("div");
            card.className = "result-card";
            card.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            `;
            resultsDiv.appendChild(card);
        });
    }
});
