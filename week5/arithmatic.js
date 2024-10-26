const express = require('express');
const app = express();

// using query
app.get('/sum/:a/:b', function (req, res) {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);
  const sum = a + b;
  res.status(200).send(`The sum is: ${sum}`);
});
// using params
app.get('/sum/:a/:b', function (req, res) {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);
  const sum = a + b;
  res.status(200).send(`The sum is: ${sum}`);
});

app.get('/multiply/:a/:b', function (req, res) {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);
  const multiply = a * b;
  res.status(200).send(`The multiplication is: ${multiply}`);
});

app.get('/divide/:a/:b', function (req, res) {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);
  if (b === 0) {
    res.status(400).send("Division by zero is not allowed.");
  } else {
    const divide = a / b;
    res.status(200).send(`The division is: ${divide}`);
  }
});

app.get('/subtraction/:a/:b', function (req, res) {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);
  const subtraction = a - b;
  res.status(200).send(`The subtraction is: ${subtraction}`);
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
