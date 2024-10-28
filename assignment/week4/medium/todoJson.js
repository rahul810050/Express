const express = require('express');
const fs = require('fs');
const filename = './todo.json';


const app = express();
app.use(express.json());

// Helper function to read the JSON file and convert it to an object
function jsonToObject() {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf-8', (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') {
          // Return an empty tasks array if file not found
          return resolve({ tasks: [] });
        } else {
          return reject(new Error('File not found'));
        }
      }
      try {
        const jsonData = JSON.parse(data);
        resolve(jsonData);
      } catch (parseError) {
        reject(new Error('Error parsing JSON'));
      }
    });
  });
}

// Helper function to write an object to the JSON file
function insertTask(data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, JSON.stringify(data, null, 2), 'utf-8', (err) => {
      if (err) {
        return reject(new Error('Error writing to file'));
      }
      resolve();
    });
  });
}

// Endpoint to get all tasks
app.get('/', async (req, res) => {
  try {
    const jsonData = await jsonToObject();
    res.status(200).json(jsonData.tasks);
  } catch (error) {
    res.status(500).send(`Error fetching data: ${error.message}`);
  }
});

// Endpoint to add a new task
app.post('/', async (req, res) => {
  const { todo, completed } = req.body;
  const id = Math.floor(Math.random() * 100);

  if (typeof todo === 'undefined' || typeof completed === 'undefined') {
    return res.status(400).send('Please provide all the required details');
  }

  const time = new Date().toISOString();
  const newTask = { id: id, todo, completed, time };

  try {
    const jsonData = await jsonToObject();
    jsonData.tasks.push(newTask);
    await insertTask(jsonData);
    res.status(201).send(`Task added successfully. ID: ${newTask.id}`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to update a task
app.put('/', async (req, res) => {
  const { id, todo, completed } = req.body;

  if (typeof id === 'undefined') {
    return res.status(400).send('Please provide the task ID');
  }

  try {
    const jsonData = await jsonToObject();
    const task = jsonData.tasks.find((task) => task.id === id);

    if (!task) {
      return res.status(404).send(`No task found with ID: ${id}`);
    }

    if (typeof todo !== 'undefined') task.todo = todo;
    if (typeof completed !== 'undefined') task.completed = completed;

    await insertTask(jsonData);
    res.status(200).send(`Task with ID: ${id} updated successfully`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to delete a task
app.delete('/', async (req, res) => {
  const { id } = req.body;

  if (typeof id === 'undefined') {
    return res.status(400).send('Please provide a valid task ID');
  }

  try {
    const jsonData = await jsonToObject();
    const initialLength = jsonData.tasks.length;
    jsonData.tasks = jsonData.tasks.filter((task) => task.id !== id);

    if (jsonData.tasks.length === initialLength) {
      return res.status(404).send(`No task found with ID: ${id}`);
    }

    await insertTask(jsonData);
    res.status(200).send(`Task with ID: ${id} deleted successfully`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(3001, () => {
  console.log('Server running on port 3000');
});
