	const readline = require('readline'); //interface to read one line at a time from stream
    const fs = require('fs'); //library to read and write data
    const rl = readline.createInterface({
     input: fs.createReadStream('datafile.csv','utf-8') //read the csv file 
    });
    let country1,divide=[5,2,1,3,2,5];
    let asia1=['India','China','Japan','Indonesia','Republic of korea'],africa1=['Saudi Arabia','South Africa'],south_america1=['Argentina','Brazil'],north_america1=['Mexico','Canada','USA'];
    let europe1=['France','Germany','Italy','United Kingdom','Russia'];
    let continent1=new Array(6).fill(0),continentgdp1=new Array(6).fill(0),continentname1=['Asia','Africa','Australia','North America','South America','Europe'];
	let writejson1 = fs.createWriteStream('../json/Continent.json');
    function sum(arr){
    	return ((parseInt(arr[2].replace(/['"]+/g, '')))+(parseInt(arr[3].replace(/['"]+/g, '')))+(parseInt(arr[4].replace(/['"]+/g, '')))+(parseInt(arr[5].replace(/['"]+/g, ''))));
    }
    function sumgdp(arr){
    	return ((parseInt(arr[8].replace(/['"]+/g, '')))+(parseInt(arr[9].replace(/['"]+/g, '')))+(parseInt(arr[10].replace(/['"]+/g, '')))+(parseInt(arr[10].replace(/['"]+/g, ''))));
    }
    let writejson2 = fs.createWriteStream('../json/Population.json'),writejson3 = fs.createWriteStream('../json/Gdp.json'),writejson4 = fs.createWriteStream('../json/Purchase.json'),writejson = fs.createWriteStream('../json/Growth.json');
	let population1=[0,0,0,0],gdp1=[0,0,0,0],year=[2010,2011,2012,2013],popdiff=[0,0,0,0],purchasediff=[0,0,0,0],i=0,j=0,c=0,count=0,country=new Array(20).fill(0),gdp=new Array(20).fill(0),population=new Array(20).fill(0),purchase_power=new Array(20).fill(0);
    let output2=[],output3=[],output4=[],output=[],output1=[];   
        rl.on('line', (line) => {
    let arr=line.split('\n');
    	arr=line.split(',');
	if(count!=0)
		{
			country[c]=arr[0].replace(/['"]+/g, '');     /*names of all the countries*/
			population[c]= parseInt(arr[5].replace(/['"]+/g, ''));  // population of year 2013 of all country
			gdp[c]= parseInt(arr[11].replace(/['"]+/g, ''));		//gdp of year 2013 of all country	
			purchase_power[c]= parseInt(arr[23].replace(/['"]+/g, '')); //purchase power of 2013 of all countries
			country1=arr[0].replace(/['"]+/g, ''); 
			for(i=0;i<4;i++)										
			{
				population1[c+i]+= parseInt(arr[i+2].replace(/['"]+/g, ''));		 // calculate the population of all the years
			}
			for(i=0;i<4;i++)
			{
				gdp1[c+i]+= parseInt(arr[i+21].replace(/['"]+/g, ''));			//calculate the gdp of all the years
			}
			if(asia1.includes(country1))
			{
				continent1[0]+= sum(arr);
				continentgdp1[0]+=sumgdp(arr);
			}
			if(africa1.includes(country1))
			{
				continent1[1]+= sum(arr);
				continentgdp1[1]+=sumgdp(arr);
			}
			if(country1 === 'Australia')
			{
				continent1[2]+= sum(arr);
				continentgdp1[2]+=sumgdp(arr);
			}
			if(south_america1.includes(country1)){
				continent1[3]+= sum(arr);
				continentgdp1[3]+=sumgdp(arr);
			}
			if(north_america1.includes(country1)){
				continent1[4]+= sum(arr);
				continentgdp1[4]+=sumgdp(arr);
			}
			if(europe1.includes(country1)){
				continent1[5]+= sum(arr);
				continentgdp1[5]+=sumgdp(arr);
			}
			c++;
		}	//variable values which are numbers
		count++;
    });
	rl.on('close', ()=>{
		for(i=0;i<20;i++)
		{
			output2.push({
				"Country": country[i],
				"Population" : population[i]
			})
		}
		writejson2.write(JSON.stringify(output2, null, 2),'UTF-8'); //write the data in json	
		for(i=0;i<20;i++)
		{
			output3.push({
				"Country": country[i],
				"GDP" : gdp[i]
			})
		}
		writejson3.write(JSON.stringify(output3, null, 2),'UTF-8'); //write the data in json	
		for(i=0;i<20;i++)
		{
			output4.push({
				"Country": country[i],
				"PurchasePower" : purchase_power[i]
			})
		}
			writejson4.write(JSON.stringify(output4, null, 2),'UTF-8'); //write the data in json		
		for(i=0;i<3;i++) //push the difference of the corresponding years
		{
			output.push({
				"Year": year[i],
				"PopulationGrowth" : population1[i+1]-population1[i],
				"PurchaseGrowth" : gdp1[i+1]-gdp1[i]
			})
		}
			writejson.write(JSON.stringify(output, null, 2),'UTF-8'); //write the data in json	
		for(i=0;i<6;i++)
		{
			output1.push({
				"Continent": continentname1[i],
				"AggregatePopulation" : continent1[i]/divide[i],
				"AggregateGdp" : continentgdp1[i]/divide[i]
			})
		}
			writejson1.write(JSON.stringify(output1, null, 2),'UTF-8'); //write the data in json	
	 });