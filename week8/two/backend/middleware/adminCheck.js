const jwt = require('jsonwebtoken');


async function adminCheck(req, res, next){
	const token = req.headers.token;
	if(typeof token === 'undefined'){
		return res.status(404).json({
			msg: "no token found"
		})
	}

	try{
		const verified = jwt.verify(token, process.env.JWT_SECRET);
		// const admin = await adminModel.findOne({_id: verified.id})
		// console.log(admin)
		req.id = verified.id;
		next();
	} catch(error){
		res.status(404).json({
			error: error.message
		})
	}
}

module.exports = {
	adminCheck
}