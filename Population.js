	const readline = require('readline');
    const fs = require('fs');
    const rl = readline.createInterface({
     input: fs.createReadStream('datafile.csv','utf-8')
    });
	let myWriteStream1 = fs.createWriteStream('gdp.json'),myWriteStream2 = fs.createWriteStream('purchase_power.json'),myWriteStream = fs.createWriteStream('Population.json'),i,value=[],index=[],pop2013 = {},population=0,country="",count = 0,value1=[],index1=[],gdp2013 = {},gdp=0,value2=[],index2=[],purchase_power2013 = {},purchase_power=0;
    rl.on('line', (line) => {
        line.split('\n');
        let arr = line.split(',');
		country=arr[0].replace(/['"]+/g, '');
		if(count!=0)
		{
			population= parseInt(arr[5].replace(/['"]+/g, ''));
			gdp= parseInt(arr[11].replace(/['"]+/g, ''));
			purchase_power= parseInt(arr[23].replace(/['"]+/g, ''));
		}		
		else
		{	
			population = arr[5].replace(/['"]+/g, '');
			gdp = arr[11].replace(/['"]+/g, '');
			purchase_power = arr[23].replace(/['"]+/g, '');
		}
        if(country!=="European Union")
		{
            index.push(country);
            value.push(population);
			index1.push(country);
            value1.push(gdp);
			index2.push(country);
            value2.push(purchase_power);
			count++;
        }
    });
	rl.on('close', function(){
		for(i in index)
		{
        pop2013[index[i]] = [];
                   pop2013[index[i]].push({
                       "Country " : index[i],
                       "Population":value[i]
                       }); 
		}
	myWriteStream.write(JSON.stringify(pop2013,null,2));
		for(i in index1)
			{
			gdp2013[index1[i]] = [];
			gdp2013[index1[i]].push({
			"Country " : index1[i],
			"GDP":value1[i]
			 }); 
			}
	myWriteStream1.write(JSON.stringify(gdp2013,null,2));
		for(i in index2)
		{
			purchase_power2013[index2[i]] = [];
			purchase_power2013[index2[i]].push({
			"Country " : index2[i],
			"Purchase_Power":value2[i]
             }); 
		}
	myWriteStream2.write(JSON.stringify(purchase_power2013,null,2));
    });