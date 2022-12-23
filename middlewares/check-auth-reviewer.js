const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try 
    {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET);
        req.userData = decoded;

        if(req.userData.userType == "Reviewer")
        {
            next();
        }
        else throw new Error(401);
    }

    catch (error) 
    {
        return res.status(401).json({
            message: 'Auth failed!, Login First as a Reviewer to proceed!'
        });
    }
};