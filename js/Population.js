	const readline = require('readline'); //interface to read one line at a time from stream
    const fs = require('fs'); //library to read and write data
    const rl = readline.createInterface({
     input: fs.createReadStream('datafile.csv','utf-8') //read the csv file 
    });
	let output6=[],output5=[],output4=[],output3=[],output2=[],gdpasia=0,gdpafrica=0,popafrica=0,gdpeurope=0,gdpaustralia=0,gdpnorthamercia=0,gdpsouthamerica=0,popeurope=0,popnorthamercia=0,popsouthamerica=0,popaustralia =0,gdpasia2010=0,popasia=0,gdpeurope2010=0,gdpafrica2010=0,gdpsouthamerica2010=0,gdpnorthamercia2010=0,gdpaustralia2010=0,gdpasia2011=0,gdpeurope2011=0,gdpafrica2011=0,gdpsouthamerica2011=0,gdpnorthamercia2011=0,gdpaustralia2011=0,gdpasia2012=0,gdpeurope2012=0,gdpafrica2012=0,gdpsouthamerica2012=0,gdpnorthamercia2012=0,gdpaustralia2012=0,popasia2010=0,popeurope2010=0,popafrica2010=0,popsouthamerica2010=0,popnorthamercia2010=0,popaustralia2010=0,popasia2011=0,popeurope2011=0,popafrica2011=0,popsouthamerica2011=0,popnorthamercia2011=0,popaustralia2011=0,popasia2012=0,popeurope2012=0,popafrica2012=0,popsouthamerica2012=0,popnorthamercia2012=0,popaustralia2012=0;
	let output = [],output1 = [],writejson = fs.createWriteStream('../json/Aggregate.json'),myWriteStream1 = fs.createWriteStream('../json/Population.json'), myWriteStream2 = fs.createWriteStream('../json/gdp.json'), myWriteStream3 = fs.createWriteStream('../json/purchase_power.json'), myWriteStream4 = fs.createWriteStream('../json/Population_Growth.json');
	let i,j,value=[],index=[],value1=[],index1=[],value2=[],index2=[],value3=[],index3=[],value4=[],index4=[],pop2013 = {},gdp2013 = {},purchase_power2013 = {},popgrowth = {},purchase_growth={},country=[],population=0,gdp=0,purchase_power=0,arrpopulation2010=0,arrpopulation2013=0,Purchase2010=0,Purchase2013=0,arraydiff=0,populationdiff=0,count = 0;
    rl.on('line', (line) => {
    	let func=(arr)=>{
			arr.sort((a,b)=>{
	        return b.Population - a.Population;
	    	});
		} //sort function
		let func1=(arr)=>{
			arr.sort((a,b)=>{
	        return b.gdp - a.gdp;
	    	});
		} //sort function
		let func2=(arr)=>{
			arr.sort((a,b)=>{
	        return b.Purchase_Power - a.Purchase_Power;
	    	});
		} //sort functionPurchase_Power

		let jsonFromLine = {},jsonFromLine1={},jsonFromLine2={},jsonFromLine3={},jsonFromLine4={}; //object creation
        line.split('\n'); //split the data to a new tab
        let arr = line.split(',');//split the data after each ,		
		country=arr[0].replace(/['"]+/g, ''); //takes the country names
		if(count!=0)
		{
			population= parseInt(arr[5].replace(/['"]+/g, ''));
			gdp= parseInt(arr[11].replace(/['"]+/g, ''));
			purchase_power= parseInt(arr[23].replace(/['"]+/g, ''));
			arrpopulation2010=parseFloat(arr[2].trim().replace(/['"]+/g, ''));
			arrpopulation2011=parseFloat(arr[3].trim().replace(/['"]+/g, ''));
			popdiff11=(arrpopulation2011-arrpopulation2010);
			arrpopulation2012=parseFloat(arr[4].trim().replace(/['"]+/g, ''));
			popdiff12=(arrpopulation2012-arrpopulation2011);
		 	arrpopulation2013=parseFloat(arr[5].trim().replace(/['"]+/g, ''));
		 	popdiff13=(arrpopulation2013-arrpopulation2012);
		 	Purchase2010=parseFloat(arr[14].trim().replace(/['"]+/g, ''));
		 	Purchase2011=parseFloat(arr[15].trim().replace(/['"]+/g, ''));
		 	purchasediff11=(Purchase2011-Purchase2010);
		 	Purchase2012=parseFloat(arr[16].trim().replace(/['"]+/g, ''));
		 	purchasediff12=(Purchase2012-Purchase2011);
		 	Purchase2013=parseFloat(arr[17].trim().replace(/['"]+/g, ''));
		 	purchasediff13=(Purchase2013-Purchase2012);
		}		//variable values which are numbers
		else
		{	
			population = arr[5].replace(/['"]+/g, '');
			gdp = arr[11].replace(/['"]+/g, '');
			purchase_power = arr[23].replace(/['"]+/g, '');
			arrpopulation2010=arr[2].trim().replace(/['"]+/g, '');
			arrpopulation2011=arr[3].trim().replace(/['"]+/g, '');
			arrpopulation2012=arr[4].trim().replace(/['"]+/g, '');
			arrpopulation2013=arr[5].trim().replace(/['"]+/g, '');
			Purchase2010=arr[14].trim().replace(/['"]+/g, '');
			Purchase2011=arr[15].trim().replace(/['"]+/g, '');
			Purchase2012=arr[16].trim().replace(/['"]+/g, '');
			Purchase2013=arr[17].trim().replace(/['"]+/g, '');
		} 	//variable values which are string and trim them
		jsonFromLine.country=country;
		jsonFromLine.Population=population;
		jsonFromLine1.country=country;
		jsonFromLine1.gdp=gdp;
		jsonFromLine2.country=country;
		jsonFromLine2.Purchase_Power=purchase_power;
		jsonFromLine4.country=country;
		jsonFromLine4.Purchase_Growth=arraydiff; //setting the object property
        if(country!=="European Union")
		{
			func(output2);
			output2.push(jsonFromLine);
			func1(output3);
			output3.push(jsonFromLine1);
			func2(output4);
			output4.push(jsonFromLine2);
            //pushing the value in json
			count++;
        }
        /*Below code checks  the country name and assign them to a continent*/
        if(country === 'India' ||  country === 'China' || country === 'Japan' || country === 'Indonesia' || country === 'Republic of korea')
		{
			popasia2010+=parseFloat(arr[2].replace(/['"]+/g, '')); //take the value of each country and add for the year 2010   
			popasia2011+=parseFloat(arr[3].replace(/['"]+/g, '')); //take the value of each country and add for the year 2011  
			popasia2012+=parseFloat(arr[4].replace(/['"]+/g, '')); //take the value of each country and add for the year 2012  
			popasia += parseFloat(arr[5].replace(/['"]+/g, '')); //take the value of each country and add for the year 2013
			popasiatotal=(popasia2010+popasia2011+popasia2012+popasia)/4; //aggregate of the population
			//console.log("popasia total"+Popasiatotal); 
			gdpasia2010+=parseFloat(arr[8].replace(/['"]+/g, '')); //take the value of each country and add for the year 2010   
			gdpasia2011+=parseFloat(arr[9].replace(/['"]+/g, '')); //take the value of each country and add for the year 2011  
			gdpasia2012+=parseFloat(arr[10].replace(/['"]+/g, '')); //take the value of each country and add for the year 2012
			gdpasia+= parseFloat(arr[11].replace(/['"]+/g, '')); //aggregate of the population
			gdpasiatotal=(gdpasia2010+gdpasia2011+gdpasia2012+gdpasia)/4; //aggregate of the gdp
		}
		if(country === 'South Africa' || country === 'Saudi Arabia')
		{
			popafrica2010 += parseFloat(arr[2].replace(/['"]+/g, ''));
			popafrica2011 += parseFloat(arr[3].replace(/['"]+/g, ''));
			popafrica2012 += parseFloat(arr[4].replace(/['"]+/g, ''));
			popafrica+= parseFloat(arr[5].replace(/['"]+/g, ''));
			popafricatotal=(popafrica2010+popafrica2011+popafrica2012+popafrica)/4;
			gdpafrica2010 += parseFloat(arr[8].replace(/['"]+/g, ''));
			gdpafrica2011 += parseFloat(arr[9].replace(/['"]+/g, ''));
			gdpafrica2012 += parseFloat(arr[10].replace(/['"]+/g, ''));
			gdpafrica+= parseFloat(arr[11].replace(/['"]+/g, ''));
			gdpafricatotal=(gdpafrica2010+gdpafrica2011+gdpafrica2012+gdpafrica)/4;
		}
		if(country === 'Australia')
		{
			popaustralia2010 += parseFloat(arr[2].replace(/['"]+/g, ''));
			popaustralia2011 += parseFloat(arr[3].replace(/['"]+/g, ''));
			popaustralia2012 += parseFloat(arr[4].replace(/['"]+/g, ''));
			popaustralia += parseFloat(arr[5].replace(/['"]+/g, ''));
			popaustraliatotal=(popaustralia2010+popaustralia2011+popaustralia2012+popaustralia)/4;
			gdpaustralia2010 += parseFloat(arr[8].replace(/['"]+/g, ''));
			gdpaustralia2011 += parseFloat(arr[9].replace(/['"]+/g, ''));
			gdpaustralia2011 += parseFloat(arr[10].replace(/['"]+/g, ''));
			gdpaustralia+= parseFloat(arr[11].replace(/['"]+/g, ''));
			gdpaustraliatotal=(gdpaustralia2010+gdpaustralia2011+gdpaustralia2012+gdpaustralia)/4;
		}
		if(country === 'Argentina' || country === 'Brazil')
		{
			popsouthamerica2010 += parseFloat(arr[2].replace(/['"]+/g, ''));
			popsouthamerica2011 += parseFloat(arr[3].replace(/['"]+/g, ''));
			popsouthamerica2012 += parseFloat(arr[4].replace(/['"]+/g, ''));
			popsouthamerica+= parseFloat(arr[5].replace(/['"]+/g, ''));
			popsouthamericatotal=(popsouthamerica2010+popsouthamerica2011+popsouthamerica2012+popsouthamerica)/4;
			gdpsouthamerica2010 += parseFloat(arr[8].replace(/['"]+/g, ''));
			gdpsouthamerica2011 += parseFloat(arr[9].replace(/['"]+/g, ''));
			gdpsouthamerica2012 += parseFloat(arr[10].replace(/['"]+/g, ''));
			gdpsouthamerica= parseFloat(arr[11].replace(/['"]+/g, ''));
			gdpsouthamericatotal=(gdpsouthamerica2010+gdpsouthamerica2011+gdpsouthamerica2012+gdpsouthamerica)/4;
		}
		if(country === 'Mexico' || country === 'Canada' || country === 'USA')
		{
			popnorthamercia2010 += parseFloat(arr[2].replace(/['"]+/g, ''));
			popnorthamercia2011 += parseFloat(arr[3].replace(/['"]+/g, ''));
			popnorthamercia2012 += parseFloat(arr[4].replace(/['"]+/g, ''));
			popnorthamercia+= parseFloat(arr[5].replace(/['"]+/g, ''));
			popnorthamerciatotal=(popnorthamercia2010+popnorthamercia2011+popnorthamercia2012+popnorthamercia)/4;
			gdpnorthamercia2010 += parseFloat(arr[8].replace(/['"]+/g, ''));
			gdpnorthamercia2011+= parseFloat(arr[9].replace(/['"]+/g, ''));
			gdpnorthamercia2012+= parseFloat(arr[10].replace(/['"]+/g, ''));
			gdpnorthamercia+= parseFloat(arr[11].replace(/['"]+/g, ''));
			gdpnorthamerciatotal=(gdpnorthamercia2010+gdpnorthamercia2011+gdpnorthamercia2012+gdpnorthamercia)/4;
		}
		if(country === 'France' || country === 'Germany' || country === 'Italy' || country === 'United Kingdom' || country === 'Russia') 
		{	
			popeurope2010 += parseFloat(arr[2].replace(/['"]+/g, ''));
			popeurope2011 += parseFloat(arr[3].replace(/['"]+/g, ''));
			popeurope2012 += parseFloat(arr[4].replace(/['"]+/g, ''));
			popeurope += parseFloat(arr[5].replace(/['"]+/g, ''));
			popeuropetotal=(popeurope2010+popeurope2011+popeurope2012+popeurope)/4;
			gdpeurope2010+= parseFloat(arr[8].replace(/['"]+/g, ''));
			gdpeurope2011+= parseFloat(arr[9].replace(/['"]+/g, ''));
			gdpeurope2012 += parseFloat(arr[10].replace(/['"]+/g, ''));
			gdpeurope+= parseFloat(arr[11].replace(/['"]+/g, ''));
			gdpeuropetotal=(gdpeurope2010+gdpeurope2011+gdpeurope2012+gdpeurope)/4;
		}
    });
	rl.on('close', ()=>{
		myWriteStream1.write(JSON.stringify(output2, null, 2),'UTF-8'); //write the data in json
		myWriteStream2.write(JSON.stringify(output3, null, 2),'UTF-8');
		myWriteStream3.write(JSON.stringify(output4, null, 2),'UTF-8');
	
	output5.push({ /* push t he population and purchase difference */
	"Year":2011,
	"Population_Growth":popdiff11,
	"Purchase_Growth":purchasediff11
	},
	{
	"Year":2012,
	"Population_Growth":popdiff12,
	"Purchase_Growth":purchasediff12
	},
	{
	"Year":2013,
	"Population_Growth":popdiff13,
	"Purchase_Growth":purchasediff13
	});
	myWriteStream4.write(JSON.stringify(output5, null, 2),'UTF-8');/* push t he population and gdp of all teh continents */
	output.push({
	"Continent":"Asia",
	"Population":popasiatotal,
	"gdp":gdpasiatotal
	},
	{
	"Continent":"Africa",
	"Population":popafricatotal,
	"gdp":gdpafricatotal
	},
	{
	"Continent":"Europe",
	"Population":popeuropetotal,
	"gdp":gdpeuropetotal
	},
	{
	"Continent":"North_America",
	"Population":popnorthamerciatotal,
	"gdp":gdpnorthamerciatotal
	},
	{
	"Continent":"South_America",
	"Population":popsouthamericatotal,
	"gdp":gdpsouthamericatotal
	},
	{
	"Continent":"Australia",
	"Population":popaustraliatotal,
	"gdp":gdpaustraliatotal
	});
	writejson.write(JSON.stringify(output, null, 2),'UTF-8');
 });