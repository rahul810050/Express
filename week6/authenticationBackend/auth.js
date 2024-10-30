const express = require('express')
const jwt = require('jsonwebtoken')
const zod = require('zod')

const emailShema = zod.string().email()
const passShema = zod.string().min(6)
const jwtPassword = 'secret'
const tokenBlockList = new Set()

const app = express()

app.use(express.json())

const users = [
	
]
// auth middleware to check the user is signed in or not
function auth(req, res, next){
	const token = req.headers['token'];
	req.token = token;
	if(tokenBlockList.has(token)){
		return res.status(400).send('Token is invalid. Please login again')
	}
	try{
		const verified = jwt.verify(token, jwtPassword)
		req.user = verified; // we can pass this value to the next function
		// console.log(verified);
		if(verified.loggedIn === true){
			next()
		} else{
			res.json({
				msg: "sorry mate!! you are not logged in. Please log in first"
			})
			return
		}
	} catch(error){
		res.json({
			msg: error.message
		})
	}
}

// GET endpoint to find all the users
app.get('/', function(req, res){
	res.sendFile(__dirname +"/public/auth.html")
})


// GET endpoint to find the particular user
app.get('/me', auth, function(req, res){
	const token = req.headers['token'];

	try{
		const verified = req.user
		// const verified = jwt.verify(token, jwtPassword);
		res.status(200).json(verified);
	} catch(error){
		res.status(404).json({
			error: error.message
		})
	}
})


// POST endpoint to sign up
app.post('/signup',async function(req, res){
	const {username, email, password} = req.body;
	if(typeof username === 'undefined' || typeof email === 'undefined' || typeof password === 'undefined'){
		res.status(400).send('Please provide all the details')
	}

	const emailCheck = emailShema.safeParse(email)
	const passCheck = passShema.safeParse(password)
	if(!emailCheck.success){
		return res.status(400).send('email is invalid...email should be this format: example@gmail.com')
	}
	if(!passCheck.success){
		return res.status(400).send('The password should be atleast length of 6')
	}

	for(let i = 0;i<users.length;i++){
		if(users[i].username === username){
			return res.status(500).send('this username is already taken')
		}
		if(users[i].email === 'email'){
			return res.status(500).send('this email is already taken')
		}
	}

	const newUser = {
		username: username,
		email: email,
		password: password,
		loggedIn: false
	}

	users.push(newUser);
	res.status(200).send('you have successfully signed up..go to Login page')
})

// POST endpoint to sign in
app.post('/signin',async function(req, res){
	const {username, email, password} = req.body;

	if(typeof username === 'undefined' || typeof email === 'undefined' || typeof password === 'undefined'){
		return res.status(500).send('Please provide all the details')
	}

	const userIndex = users.findIndex(
    (e) => e.username === username && e.email === email && e.password === password
  );

  if (userIndex === -1) {
    return res.status(400).send("User not found or invalid credentials.");
  }
	users[userIndex].loggedIn = true
  const token = jwt.sign(users[userIndex], jwtPassword);
  
  users[userIndex] = {
    ...users[userIndex],
    token: token
  }
	// console.log(users[userIndex])
	res.header('cookie', token)
	// res.status(200).send(`Logged in successfully...this is authentication JWT : ${token}. Dont share it with anyone else`)
	res.status(200).send(token)
	
})

// POST endpoint to sign out
app.post('/signout', auth, function(req, res){
	// const token = req.headers['token'];
	const token = req.token
	try{
		const verified = req.user // taking the value from the middleware
		// const verified = jwt.verify(token, jwtPassword);
		if(verified.loggedIn === true){
			verified.loggedIn = false;
			tokenBlockList.add(token)
			// console.log(verified)
			return res.status(200).send('You have successfully logged out')
		} else{
			return res.status(400).send('You are not signed in..go to log in page')
		}
	} catch(error){
		res.json({
			error: error.message
		})
	}
})

app.listen(3000, function(){
	console.log('server is on port 3000');
})