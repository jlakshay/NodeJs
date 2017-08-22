const readline = require('readline')
const fs = require('fs')
let output = [];
let writejson = fs.createWriteStream('Aggregate.json')
const rl = readline.createInterface({
	input: fs.createReadStream('datafile.csv')
});
let popasia = 0,popeurope = 0,popafrica = 0,popnorthamercia = 0,popsouthamerica = 0,popaustralia = 0,popasia2010=0,popeurope2010=0,popafrica2010=0,popsouthamerica2010=0,popnorthamercia2010=0,popaustralia2010=0,popasia2011=0,popeurope2011=0,popafrica2011=0,popsouthamerica2011=0,popnorthamercia2011=0,popaustralia2011=0,popasia2012=0,popeurope2012=0,popafrica2012=0,popsouthamerica2012=0,popnorthamercia2012=0,popaustralia2012=0;
rl.on('line',(line) => {
	line.trim()
	.split('\n');
	let arr = line.split(",")
	let country = arr[0].replace(/['"]+/g, '');
	if(country === 'India' ||  country === 'China' || country === 'Japan' || country === 'Indonesia' || country === 'Republic of korea')
		{
		popasia2010+=parseFloat(arr[2].replace(/['"]+/g, ''));
		popasia2011+=parseFloat(arr[3].replace(/['"]+/g, ''));
		popasia2012+=parseFloat(arr[4].replace(/['"]+/g, ''));
		popasia += parseFloat(arr[5].replace(/['"]+/g, ''));
		}
	if(country === 'South Africa' || country === 'Saudi Arabia')
		{
		popafrica2010 += parseFloat(arr[2].replace(/['"]+/g, ''));
		popafrica2011 += parseFloat(arr[3].replace(/['"]+/g, ''));
		popafrica2012 += parseFloat(arr[4].replace(/['"]+/g, ''));
		popafrica += parseFloat(arr[5].replace(/['"]+/g, ''));
		}
	if(country === 'Australia')
		{
		popaustralia2010 += parseFloat(arr[2].replace(/['"]+/g, ''));
		popaustralia2011 += parseFloat(arr[3].replace(/['"]+/g, ''));
		popaustralia2012 += parseFloat(arr[4].replace(/['"]+/g, ''));
		popaustralia += parseFloat(arr[5].replace(/['"]+/g, ''));
		}
	if(country === 'Argentina' || country === 'Brazil')
		{
		popsouthamerica2010 += parseFloat(arr[2].replace(/['"]+/g, ''));
		popsouthamerica2011 += parseFloat(arr[3].replace(/['"]+/g, ''));
		popsouthamerica2012 += parseFloat(arr[4].replace(/['"]+/g, ''));
		popsouthamerica += parseFloat(arr[5].replace(/['"]+/g, ''));
		}
	if(country === 'Mexico' || country === 'Canada' || country === 'USA')
		{
		popnorthamercia2010 += parseFloat(arr[2].replace(/['"]+/g, ''));
		popnorthamercia2011 += parseFloat(arr[3].replace(/['"]+/g, ''));
		popnorthamercia2012 += parseFloat(arr[4].replace(/['"]+/g, ''));
		popnorthamercia += parseFloat(arr[5].replace(/['"]+/g, ''));
		}
	if(country === 'France' || country === 'Germany' || country === 'Italy' || country === 'United Kingdom' || country === 'Russia') 
		{	
		popeurope2010 += parseFloat(arr[2].replace(/['"]+/g, ''));
		popeurope2011 += parseFloat(arr[3].replace(/['"]+/g, ''));
		popeurope2012 += parseFloat(arr[4].replace(/['"]+/g, ''));
		popeurope += parseFloat(arr[5].replace(/['"]+/g, ''));
		}
});	
rl.on('close', function(line) {
	popasia=(popasia/5);
	popafrica=(popafrica/2);
	popsouthamerica=(popsouthamerica/2);
	popnorthamercia=(popnorthamercia/3);
	popeurope=(popeurope/5);
	output.push(
	{
		"Continent":"2010",
		"Asia": popasia2010,
		"Africa": popafrica2010,
		"South America":popsouthamerica2010,
		"North America": popnorthamercia2010,
		"Europe" :popeurope2010,
		"Austrila":popaustralia2010
	},
	{
		"Continent":"2011",
		"Asia": popasia2011,
		"Africa": popafrica2011,
		"South America":popsouthamerica2011,
		"North America": popnorthamercia2011,
		"Europe" :popeurope2011,
		"Austrila":popaustralia2011
	},
	{
		"Continent":"2012",
		"Asia": popasia2012,
		"Africa": popafrica2012,
		"South America":popsouthamerica2012,
		"North America": popnorthamercia2012,
		"Europe" :popeurope2012,
		"Austrila":popaustralia2012
	},
	{
		"Continent":"2013",
		"Asia": popasia,
		"Africa": popafrica,
		"South America":popsouthamerica,
		"North America": popnorthamercia,
		"Europe" :popeurope,
		"Austrila":popaustralia
	});
	console.log(output);
	writejson.write(JSON.stringify(output, null, 2),'UTF-8');
});
