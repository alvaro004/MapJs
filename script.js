const container = document.querySelector('.content');
let flag = false;

// initialize the map on the "map" div with a given center and zoom
const map = new L.Map('mapid', {
	center: new L.LatLng(-23.442, -58.443),
	zoom: 5,
});

// create a new tile layer
const tileUrl = 'https://tile.thunderforest.com/atlas/{z}/{x}/{y}{r}.png?apikey=c00e6dcfcbd24a638cffb510c683ae10',
	layer = new L.TileLayer(tileUrl, { maxZoom: 18 });

//add a market
const marker = new L.marker([-23.442, -58.443], {
	draggable: true,
	autoPan: true,
});

// add the layer to the map
map.addLayer(layer);
map.addLayer(marker);

//show the latitude and longitude of the marker
marker.on('moveend', function (e) {
	const data = e.target._latlng;
	const { lat, lng } = data;
	whereAmI(lat, lng);
});

const whereAmI = function (lat, lng) {
	fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
		.then(response => {
			// console.log(response);
			if (!response.ok) {
				throw new Error(`Warning: This Api only admit 3 request per second!`);
			}
			return response.json();
		})
		.then(data => {
			if (!data) {
				throw new Error('unvalid adress');
			} else {
				// console.log(data);
				const prov = data.prov;
				return prov;
			}
		})
		.then(result => {
			if (!result) {
				throw new Error('Province not found');
			} else {
				getCountryData(result);
			}
		})
		.catch(err => {
			console.log(`Something went wrong, ${err.message}`);
			alert(err.message);
		});
};

const getJSON = function (url, errorMesg = 'Something went wrong!') {
	return fetch(`${url}`).then(response => {
		if (!response.ok) {
			throw new Error(`${errorMesg} (${response.status})`);
		}
		return response.json();
	});
};

const getCountryData = function (country) {
	getJSON(`https://restcountries.eu/rest/v2/alpha/${country}`, `Country not found`)
		.then(data => {
			rendercountry(data);
		})
		.catch(err => {
			console.error(`${err}, something went wrong`);
			renderError(err.message);
		});
};

const rendercountry = function (data) {
	const countryName = data.nativeName;
	const CapitalName = data.capital;
	const dataPopulation = (data.population / 1000000).toFixed(1);
	const dataLanguage = data.languages[0].nativeName;

	const html = `
		<div class="container-txt">
			<h1>Pais: ${countryName}</h1>
			<h1>Capital: ${CapitalName}</h1>
			<h1>Poblacion: ${dataPopulation}</h1>
			<h1>Lenguaje: ${dataLanguage}</h1>
		</div>
	  `;

	container.insertAdjacentHTML('beforeend', html);
	const doc = document.querySelector('.container-txt');

	if (flag) {
		doc.remove();
		flag = false;
	} else {
		flag = true;
	}
	console.log(flag);
};

const renderError = function (err) {
	const TxtMessage = `<h1>${err}, something went wrong</h1>`;
	container.insertAdjacentHTML('beforeend', TxtMessage);
};
