const http = require("https");
 
const options = {
	"method": "GET",
	"hostname": "api.ambeedata.com",
	"port": null,
	"path": "/weather/latest/by-lat-lng?lat=12.9889055&lng=77.574044",
	"headers": {
		"x-api-key": "API_KEY",
		"Content-type": "application/json"
	}
};
 
const req = http.request(options, function (res) {
	const chunks = [];
 
	res.on("data", function (chunk) {
		chunks.push(chunk);
	});
 
	res.on("end", function () {
		const body = Buffer.concat(chunks);
		console.log(body.toString());
	});
});
 
req.end();