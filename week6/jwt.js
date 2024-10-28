const jwt = require('jsonwebtoken')

const details = {
	name: 'Rahul',
	accountNumber: 87645987234,
}

// const token = jwt.sign(details, 'secret');
// console.log(token)

// this token is the checkbook which is created using "secret" hence this token will be only verified by this secret
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUmFodWwiLCJhY2NvdW50TnVtYmVyIjo4NzY0NTk4NzIzNCwiaWF0IjoxNzMwMTA2NTI4fQ._H-rzEUOv7fFoHlroiYF5L6ks2JN2L4cIFKtPpW0s3c


const duplicateToken = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUmFodWwiLCJhY2NvdW50TnVtYmVyIjo4NzY0NTk4NzIzNCwiaWF0IjoxNzMwMTA3NTExfQ.gYBToBBIPq5Bx11mC5rBEZOeDO6RCNFAAGoqeBfZtV8", 'secret');
console.log(duplicateToken)