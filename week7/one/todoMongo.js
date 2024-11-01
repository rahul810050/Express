const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { UserModel, TodoModel } = require('./pracDB');
const jwt = require('jsonwebtoken');
const jwtSecret = "secret";
mongoose.connect('mongodb+srv://rahul810050:Rahul%40naskar%40123@cluster0.sa000.mongodb.net/todo-app-database');
const bcrypt = require('bcrypt')
const {z} = require('zod')

app.use(express.json());

app.post('/signup', async function (req, res) {
  const requiredBody = z.object({
    username: z.string().min(3).max(100),
    email: z.string().min(3).max(100).email(),
    password: z.string().min(6).max(100).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*-])[A- Za-z\d!@#$%&*-]{8,}$/)
  })

  // const parseData = requiredBody.parse(req.body) // if we use this it either pass the value or if there is a error then it throws the error that's why we have to put it in the "trycatch"
  const parseDataSuccess = requiredBody.safeParse(req.body)

  if(!parseDataSuccess.success){
    return res.status(404).json({
      msg: "incorrect credentials",
      error: parseDataSuccess.error
    })
  }

  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      msg: "Please fill all the required fields",
    });
  }

  const hashedPass = await bcrypt.hash(password, 5);

  try {
    await UserModel.create({
      username: username,
      email: email,
      password: hashedPass,
    });
    res.status(200).send('Account created successfully');
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
});

app.post('/signin', async function (req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(403).send('Please fill all the required fields');
  }

  try {
    const user = await UserModel.findOne({
      email: email
    });

    if (!user) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if(passwordMatch){
      const token = jwt.sign(
        {
          id: user._id,
        },
        jwtSecret
      );
      res.status(200).json({
        token: token,
      });
    }

    
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

app.post('/todo', auth, async function (req, res) {
  const { description, completed } = req.body;
  const userId = req.id;

  if (!description || completed === undefined) {
    return res.status(500).send('Please fill all the details');
  }

  try {
    await TodoModel.create({
      description: description,
      completed: completed,
      userid: userId, // Corrected to `userid` to match schema
    });

    res.status(200).send('Todo is created successfully');
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
});

app.get('/todos', auth, async function (req, res) {
  const userId = req.id;

  try {
    const userTodos = await TodoModel.findOne({ userid: userId });
    console.log(userTodos);
    // if (userTodos.length > 0) {
    //   return res.status(200).json(userTodos);
    // } else {
    //   return res.status(404).send("No todos found for this user");
    // }
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
});

function auth(req, res, next) {
  const token = req.headers['token'];
  // console.log(token)

  if (!token) {
    return res.status(400).send('No token provided');
  }

  try {
    const verified = jwt.verify(token, jwtSecret);
    console.log(verified)
    req.id = verified.id;
    next();
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
}

app.listen(3000, () => console.log("Server is running on port 3000"));
