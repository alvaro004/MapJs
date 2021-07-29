// const target = document.querySelector('#map');
// const mymap = L.map('mapid').setView([-23.442, -58.443], 5);

// L.tileLayer('https://tile.thunderforest.com/atlas/{z}/{x}/{y}{r}.png?apikey=c00e6dcfcbd24a638cffb510c683ae10').addTo(
// 	mymap
// );

// const marker = L.marker([-23.442, -58.443]).addTo(mymap);

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
marker.on('move', function (e) {
	// console.log(e);
	const data = e.latlng;
	const { lat, lng } = data;
	console.log(lat, lng);
});

// const getCountryData = function (country) {
// 	// calling the promise - Country 1
// 	getJSON(`https://restcountries.eu/rest/v2/name/${country}`, `Country not found`)
// 		.then(([data]) => {
// 			console.log(data);
// 		})
// 		.catch(err => {
// 			console.error(`${err}, something went wrong`);
// 			renderError(`Something went wrong ${err.message}, try again!`);
// 		});
// };
