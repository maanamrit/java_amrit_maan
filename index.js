require('dotenv').config()
const googleMapsClient = require('@google/maps').createClient({
  key: process.env.MAPS_API_KEY
});
const fs = require('fs');
const path = require('path');
const os = require('os');
var args = process.argv;
var stringify = require('csv-stringify');

googleMapsClient.places({
  query: args['2']
}, function(err, response) {
  if (!err) {
	const output = [];
    var res = response.json.results;
	res.forEach(function (val, index, array) {
			const row = [];
		    row.push(val.name);
			row.push(val.formatted_address);
			row.push(val.geometry.location.lat);
			row.push(val.geometry.location.lng);
			output.push(row);
		});
	stringify(output, (err, output) => {
       if (err) throw err;
	   const filename = path.join(__dirname, args['2']+'.csv');
       fs.writeFile(filename, output, (err) => {
         if (err) throw err;
         console.log(args['2']+'.csv saved.');
       });
    });	
		
  }
  else {
	  console.log(err);
  }
  
});