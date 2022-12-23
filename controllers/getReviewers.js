const Reviewer = require('../models/Reviewer');

async function getRevirewers(req, res) {
    let response = []
    try
    {
        const reviewerList = await Reviewer.find();

        for(let i=0;i<reviewerList.length;i++)
        {
            response.push({
                "Name":reviewerList[i].full_name,
                "id":reviewerList[i]._id
            });
        }
        
        res.status(200).json(response);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message:"Internal Server Error"});
    }
}

module.exports = {
    getRevirewers
};