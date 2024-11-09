const jwt = require('jsonwebtoken')


async function userCheck(req, res, next){
	const token = req.headers.token;
	if(typeof token === 'undefined'){
		return res.status(404).json({
			msg: "token not found"
		})
	}

	try{
		const verified = jwt.verify(token, process.env.JWT_SECRET);
		// console.log(verified)
		// const user = await userModel.findById(verified.id)
		req.id = verified.id;
		next();
	} catch(error){
		res.status(500).json({
			error: error.message
		})
	}
}


module.exports = {
	userCheck
}