const weather   = require('weather-js');
const axios     = require('axios');
const converter = {
  fahrenheitToCelsius(fahrenheit) {
    return Math.round((fahrenheit - 32) * (5 / 9));
  }
}

module.exports = {
  getWeather(req, res) {
    weather.find({
      search: 'Jakarta',
      degreeType: 'C'
    }, function (err, result) {
      if (err) {
        console.log(err)
      }
      res.status(200).json({
        message: 'Success get weather data!',
        data: result[0].current
      })
    });
  },
  getWeatherByAddress(address) {
    const encodedAddress = encodeURIComponent(address);
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;
    return new Promise((resolve, reject) => {
      axios.get(geocodeUrl)
        .then((response) => {
          if (response.data.status === 'ZERO_RESULTS') {
            reject('Unable to find that address.');
          }
          const lat = response.data.results[0].geometry.location.lat;
          const lng = response.data.results[0].geometry.location.lng;
          const weatherUrl = `https://api.forecast.io/forecast/4a04d1c42fd9d32c97a2c291a32d5e2d/${lat},${lng}`;
          return axios.get(weatherUrl);
        }).then((response) => {
          const temperature = response.data.currently.temperature;
          const apparentTemperature = response.data.currently.apparentTemperature;
          const summary = response.data.hourly.summary;
          resolve(`${address} current temperature ${converter.fahrenheitToCelsius(temperature)} C. Summary: ${summary}`);
        }).catch((e) => {
          if (e.code === 'ENOTFOUND') {
            reject('Unable to connect to API servers.');
          } else {
            reject(e.message);
          }
        });
    })
  }
}