// make an array called todo which will take id: ${id} task : todo,

let todo = []

const express = require('express')

const app = express()
let ids = 0;

// function randomNumGenerator(){
// 	return Math.floor(Math.random() * 100)
// }

app.use(express.json())

// get method
app.get('/', function(req, res){
	res.status(200).json({
		todo
	})
})

// post method
app.post('/', function(req, res){

	ids++;
	const {task} = req.body;
	if(!task){
		res.status(404).send('task is required')
	} else{
		todo.push({
			id: ids,
			task: task
		})
		res.status(200).send(`task has been successfully added. Please note your task id: ${ids}`)
	}
})

// put method
app.put('/', function(req, res){
	const {id, task} = req.body
	if(!task || !id){
		res.status(404).send('id and task is required');
	} 

	const taskId = todo.find((e)=> e.id === id)
	if(!taskId){
		res.status(404).send(`task is not found with this id: ${id}`)
	}
	
	taskId.task = task;
	res.status(200).send(`task has been updated of this id: ${id}`)
})

// delete method
app.delete('/', function(req, res){
	const {id} = req.body
	if(!id){
		res.status(404).send(`id is required`)
	}

	const initialLength = todo.length

	todo = todo.filter((e)=> e.id !== id);

	if(initialLength === todo.length){
		res.status(404).send(`there is no task with this id: ${id}`)
	} else{
		res.status(200).send(`task with this id: ${ids} is deleted successfully..`)
	}
})

app.listen(3000, function(){
	console.log('starting the server')
})