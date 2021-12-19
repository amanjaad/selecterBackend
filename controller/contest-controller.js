import Contests from "../models/contestSchema.js";

const setContests = async(request , response) => {
    try {
        const newContest = new Contests(request.body);
        console.log(request.body);
        await newContest.save();
        response.status(200).json(newContest);
    } catch (error) {
        response.status(409).json({message:error.message});
    }
}
export default setContests;