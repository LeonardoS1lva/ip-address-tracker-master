const txtIP = document.getElementById("input-ip");
const btnSearch = document.getElementById("button-search");

const ipAddress = document.getElementById("ip-address");
const locationIP = document.getElementById("location");
const timezone = document.getElementById("timezone");
const isp = document.getElementById("isp");

var map;

async function getAPIDatas(ip) {
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_DhcxC1VuRTxXuvRdajCipkUQbT6UO&ipAddress=${ip}&domain=${ip}`;

    try {
        const response = await fetch(url);
        const result = await response.json();
        ipAddress.innerHTML = result.ip;
        locationIP.innerHTML = `${result.location.city}, ${result.location.region}, ${result.location.country}`;
        timezone.innerHTML = `UTC ${result.location.timezone}`;
        isp.innerHTML = result.isp;
        showMap(result.location.lat, result.location.lng);
    }
    catch (error) {
        alert(error);
    }
}

function showMap(lat, long) {

    if (!map) {

        map = L.map('map').setView([lat, long], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    } else {
        map.setView([lat, long], 13);
    }

    var iconMarker = L.icon({
        iconUrl: "./images/icon-location.svg",
    });

    if (typeof map.marker !== 'undefined') {
        map.removeLayer(map.marker);
    }

    map.marker = L.marker([lat, long], { icon: iconMarker }).addTo(map);

}

btnSearch.addEventListener("click", () => {
    getAPIDatas(txtIP.value);
});

txtIP.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        getAPIDatas(txtIP.value);
    }
});

getAPIDatas("");