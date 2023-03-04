const API_key = '9b5a648d8ac9f1a52e52001da54a7129';

let btn = document.querySelector('.form button'),
		tempeture_content  = document.querySelector('.tempeture'),
		location_content = document.querySelector('.location'),
		detail_content = document.querySelector('.detail'),
		image = document.querySelector('.image');

document.addEventListener('keyup', (e) => {
	if (e.keyCode == 13) get_location();
});
		
btn.addEventListener('click', (e) => {
	e.preventDefault();
	get_location();
});

function get_location() {
	let location = document.querySelector('.form input').value;
	get_data({location: location});
}

async function get_data(params = {}) {
	const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${params.location}&units=metric&appid=${API_key}`, {
		method: 'GET'
	});
	
	const data = await response.json();
	
	function handle_callback(data) {
		if (data.cod === '404') {
			image.style.backgroundImage = 'url()';
			image.innerHTML = `<span>Location not found</span>`;
			location_content.innerHTML = '';
			detail_content.innerHTML = '';
			return;
		}
		
		let tempeture = `${parseInt(data.main.temp)}<span>°C</span>`,
				name = data.name,
				feels_like = parseInt(data.main.feels_like),
				weather = data.weather[0].main,
				humidity = `
				<b class="text-center">
					<span><i class="fas fa-water"></i>Humidity</span>
					${parseInt(data.main.humidity)}%
				</b>
				`,
				wind_speed = `
				<b class="text-center">
					<span><i class="fas fa-wind"></i> Wind speed</span>
					${parseInt(data.wind.speed)}km/h
				</b>
				`;
		
		image.innerHTML = '';
		tempeture_content.innerHTML = tempeture;
		location_content.innerHTML = `${name} / Feels like ${feels_like}°`;
		detail_content.innerHTML = humidity + wind_speed;
		
		if (weather == 'Clear' || weather == 'Clouds' ) {
			image.style.backgroundImage = 'url(images/cloudy.png)';
		}
		
		if (weather == 'Rain') {
			image.style.backgroundImage = 'url(images/heavy_rain.png)';
		}
		
		if (weather == 'Snow') {
			image.style.backgroundImage = 'url(images/snow.png)';
		}
	}
	
	await handle_callback(data);
}