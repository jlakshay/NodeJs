let output = [],output1=[];
const readline = require('readline')
const fs = require('fs')
let writejson = fs.createWriteStream('Population_Growth.json');
let writejson1 = fs.createWriteStream('Purchase_Growth.json');
const rl = readline.createInterface({
	input: fs.createReadStream('datafile.csv')
});
let jsonFromLine = {},jsonFromLine1={};
rl.on('line',(line) => {
	line.trim()
	.split('\n');
	let arr = line.split(",")
	let arrpopulation2010=parseFloat(arr[2].trim().replace(/['"]+/g, ''));
	let arrpopulation2013=parseFloat(arr[5].trim().replace(/['"]+/g, ''));
	let populationdiff=Math.abs(arrpopulation2013-arrpopulation2010);
	//console.log(populationdiff);
	let Purchase2010=parseFloat(arr[14].trim().replace(/['"]+/g, ''));
	let Purchase2013=parseFloat(arr[17].trim().replace(/['"]+/g, ''));
	let arraydiff=Math.abs(arrpopulation2013-arrpopulation2010);
	//console.log(arraydiff);
	jsonFromLine.Country=arr[0].trim().replace(/['"]+/g, '');
	jsonFromLine.Population_Difference = populationdiff;
	
	jsonFromLine1.Country=arr[0].trim().replace(/['"]+/g, '');
	jsonFromLine1.Purchase_Power_Difference=arraydiff;
	if (jsonFromLine.country !== "European Union"){
		output.push(jsonFromLine);
	}
	if (jsonFromLine1.country !== "European Union"){
		output1.push(jsonFromLine1);
	}
});
rl.on('close', function(line) {
	//console.log(output);
	writejson.write(JSON.stringify(output, null, 2),'UTF-8');
	writejson1.write(JSON.stringify(output1, null, 2),'UTF-8');	
});

