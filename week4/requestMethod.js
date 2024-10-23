const express = require('express');

const users = [
	{
		name: "Michale",
		kidneys: [true, true] // Using an array to represent kidneys
	}
]

const app = express();

app.get("/", function(req, res) {
	// const name = users[0].name;
	const numofKidneys = users[0].kidneys.length;
	let numofHealthyKidneys = 0;
	// let name2 = users[1].name

	// Count the number of healthy kidneys
	users[0].kidneys.forEach((e) => e === true? numofHealthyKidneys++: null);
	const numofUnhealthyKidneys = numofKidneys - numofHealthyKidneys;

	res.json({
		
		numofKidneys,
		numofHealthyKidneys,
		numofUnhealthyKidneys
	})

	// res.json(`Hey ${name}!! You have ${numofKidneys} kidneys and ${numofHealthyKidneys === 2 ? "both" : "one"} good kidney.`);
});

  app.use(express.json())

app.post('/', function(req, res){
	// const name = req.body.name;
	// // const bodyPart = req.body.bodyPart;
	// const condition1 = req.body.condition1
	// const condition2 = req.body.condition2
	// users.push({name: toString(name), kidneys: [condition1, condition2]});

	const isHealthy = req.body.isHealthy

	users[0].kidneys.push(isHealthy)
	users[0].kidneys.push(isHealthy)

	res.json(`done`)
	
})

app.put('/', function(req, res){
	if(isThereAnyBadKidney()){
		for(let i = 0; i < users[0].kidneys.length; i++){
			users[0].kidneys[i] = true;
		}
	
		res.json({
			mag:'done boy'
		})
	} else{
		res.status(411).json('bro you have no bad kidneys')
	}
})

app.delete('/', function(req,res){
	if(isThereAnyBadKidney()){
		// for(let i = 0; i < users[0].kidneys.length; i++){
	// 	if(users[0].kidneys[i] === false){
	// 		users[0].kidneys.splice(i, 1);
	// 	}
	// }	

	users[0].kidneys = users[0].kidneys.filter(kidney => kidney !== false);
	res.json('unhealthy kidneys are removed')
	} else{
		res.status(411).json('you have no bad kidneys')
	}
})

app.listen(3000, function() {
	console.log('Starting the server on port 3000');
});


function isThereAnyBadKidney(){
	for(let i = 0; i < users[0].kidneys.length; i++){
		if(!users[0].kidneys[i]){
			return true
		}
	}
return false
}