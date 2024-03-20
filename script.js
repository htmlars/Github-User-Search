function hideAlert() {
    document.querySelector(".alert").style.display = "none";
}

function showAlert() {
    document.querySelector(".alert").style.display = "flex";
}

document.querySelector(".x").addEventListener("click", hideAlert);

async function fetchData() {
    try {
        const username = document.getElementById("search").value.toLowerCase();
        const url = `https://api.github.com/users/${username}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        const displayText = (text) => text || "";

        hideAlert();
        document.getElementById("html_url").href = data.html_url;
        document.getElementById("pfp").src = data.avatar_url;
        document.getElementById("username").textContent = "@" + data.login;
        document.getElementById("bio").textContent = displayText(data.bio);
        document.getElementById("followers").textContent = data.followers;
        document.getElementById("following").textContent = data.following;
        document.getElementById("repos").textContent = data.public_repos;

        const location = displayText(data.location);
        const company = displayText(data.company);
        const locationCard = document.querySelector(".dox .card:nth-child(1)");
        const companyCard = document.querySelector(".dox .card:nth-child(2)");

        if (location || company) {
            if (location) {
                document.getElementById("location").textContent = location;
                locationCard.style.display = "flex";
            } else {
                locationCard.style.display = "none";
            }

            if (company) {
                document.getElementById("company").textContent = company;
                companyCard.style.display = "flex";
            } else {
                companyCard.style.display = "none";
            }

            document.querySelector(".dox").style.display = "flex";
        } else {
            document.querySelector(".dox").style.display = "none";
        }
    } catch (error) {
        console.error(error);
        showAlert();
    }
}

document.getElementById("search").addEventListener("keypress", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        fetchData();
    }
});


