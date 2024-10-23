// const express = require('express')

// function sum (a,b){
// 	return a+b
// }

// const app = express();

// app.get('/', function(req, res){
// 	// const a = parseFloat(req.query.a);
// 	// const b = parseFloat(req.query.b);

// 	// if(isNaN(a) || isNaN(b)){
// 	// 	res.send('Provide provide valid number')
// 	// } else{
// 	// 	const ans = sum(a,b);
// 	// 	res.send(`the sum is ${ans}`);
// 	// }
// 	throw new Error('error aa gya bhai')
// })

// app.listen(3000, function(){
// 	console.log('server is running on port 3000')
// })


const fs = require('fs')
const { Command } = require('commander')

const program = new Command()

program
.name('word-count')
.description('read the file')
.version('1.4.0');

program
	.command('count')
	.description('count the words in the file')
	.argument('<file>', 'count the words')
	.action((file)=>{
		fs.readFile(file, 'utf-8', function(err, data){
			if(err){
				throw new Error('error aa gya bhai')
			} else{
				const words = data.split(" ").length;
				console.log(words)
			}
		})
	})

	program.parse(process.argv)