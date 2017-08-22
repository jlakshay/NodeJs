const readline = require('readline')
const fs = require('fs')
let output = [];
let writejson = fs.createWriteStream('Aggregate_gdp.json')
const rl = readline.createInterface({
	input: fs.createReadStream('datafile.csv')
});
let gdpasia = 0,gdpeurope = 0,gdpafrica = 0,gdpnorthamercia = 0,gdpsouthamerica = 0,gdpaustralia = 0,gdpasia2010=0,gdpeurope2010=0,gdpafrica2010=0,gdpsouthamerica2010=0,gdpnorthamercia2010=0,gdpaustralia2010=0,gdpasia2011=0,gdpeurope2011=0,gdpafrica2011=0,gdpsouthamerica2011=0,gdpnorthamercia2011=0,gdpaustralia2011=0,gdpasia2012=0,gdpeurope2012=0,gdpafrica2012=0,gdpsouthamerica2012=0,gdpnorthamercia2012=0,gdpaustralia2012=0;
rl.on('line',(line) => {
	line.trim()
	.split('\n');
	let arr = line.split(",")
	let country = arr[0].replace(/['"]+/g, '');
	if(country === 'India' ||  country === 'China' || country === 'Japan' || country === 'Indonesia' || country === 'Republic of korea')
		{
		gdpasia2010+=parseFloat(arr[8].replace(/['"]+/g, ''));
		gdpasia2011+=parseFloat(arr[9].replace(/['"]+/g, ''));
		gdpasia2012+=parseFloat(arr[10].replace(/['"]+/g, ''));
		gdpasia += parseFloat(arr[11].replace(/['"]+/g, ''));
		}
	if(country === 'South Africa' || country === 'Saudi Arabia')
		{
		gdpafrica2010 += parseFloat(arr[8].replace(/['"]+/g, ''));
		gdpafrica2011 += parseFloat(arr[9].replace(/['"]+/g, ''));
		gdpafrica2012 += parseFloat(arr[10].replace(/['"]+/g, ''));
		gdpafrica += parseFloat(arr[11].replace(/['"]+/g, ''));
		}
	if(country === 'Australia')
		{
		gdpaustralia2010 += parseFloat(arr[8].replace(/['"]+/g, ''));
		gdpaustralia2011 += parseFloat(arr[9].replace(/['"]+/g, ''));
		gdpaustralia2012 += parseFloat(arr[10].replace(/['"]+/g, ''));
		gdpaustralia += parseFloat(arr[11].replace(/['"]+/g, ''));
		}
	if(country === 'Argentina' || country === 'Brazil')
		{
		gdpsouthamerica2010 += parseFloat(arr[8].replace(/['"]+/g, ''));
		gdpsouthamerica2011 += parseFloat(arr[9].replace(/['"]+/g, ''));
		gdpsouthamerica2012 += parseFloat(arr[10].replace(/['"]+/g, ''));
		gdpsouthamerica += parseFloat(arr[11].replace(/['"]+/g, ''));
		}
	if(country === 'Mexico' || country === 'Canada' || country === 'USA')
		{
		gdpnorthamercia2010 += parseFloat(arr[8].replace(/['"]+/g, ''));
		gdpnorthamercia2011 += parseFloat(arr[9].replace(/['"]+/g, ''));
		gdpnorthamercia2012 += parseFloat(arr[10].replace(/['"]+/g, ''));
		gdpnorthamercia += parseFloat(arr[11].replace(/['"]+/g, ''));
		}
	if(country === 'France' || country === 'Germany' || country === 'Italy' || country === 'United Kingdom' || country === 'Russia') 
		{	
		gdpeurope2010 += parseFloat(arr[8].replace(/['"]+/g, ''));
		gdpeurope2011 += parseFloat(arr[9].replace(/['"]+/g, ''));
		gdpeurope2012 += parseFloat(arr[10].replace(/['"]+/g, ''));
		gdpeurope += parseFloat(arr[11].replace(/['"]+/g, ''));
		}
});	
rl.on('close', function(line) {
	gdpasia=(gdpasia/5);
	gdpafrica=(gdpafrica/2);
	gdpsouthamerica=(gdpsouthamerica/2);
	gdpnorthamercia=(gdpnorthamercia/3);
	gdpeurope=(gdpeurope/5);
	output.push(
	{
		"Continent":"2010",
		"Asia": gdpasia2010,
		"Africa": gdpafrica2010,
		"South America":gdpsouthamerica2010,
		"North America": gdpnorthamercia2010,
		"Europe" :gdpeurope2010,
		"Austrila":gdpaustralia2010
	},
	{
		"Continent":"2011",
		"Asia": gdpasia2011,
		"Africa": gdpafrica2011,
		"South America":gdpsouthamerica2011,
		"North America": gdpnorthamercia2011,
		"Europe" :gdpeurope2011,
		"Austrila":gdpaustralia2011
	},
	{
		"Continent":"2012",
		"Asia": gdpasia2012,
		"Africa":gdpafrica2012,
		"South America":gdpsouthamerica2012,
		"North America": gdpnorthamercia2012,
		"Europe" :gdpeurope2012,
		"Austrila":gdpaustralia2012
	},
	{
		"Continent":"2013",
		"Asia": gdpasia,
		"Africa": gdpafrica,
		"South America":gdpsouthamerica,
		"North America": gdpnorthamercia,
		"Europe" :gdpeurope,
		"Austrila":gdpaustralia
	});
	console.log(output);
	writejson.write(JSON.stringify(output, null, 2),'UTF-8');
});
