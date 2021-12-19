import  mongoose  from "mongoose";

const contestSchema = mongoose.Schema({
    contestId:{
        type:mongoose.Schema.Types.ObjectId , ref:'prospectForm',
        default:null
    },
    participantId:{
        type:mongoose.Schema.Types.ObjectId , ref:"user",
        default:null
    },
    quiz:{
        type:Object,
        default:null
    }
})

const contests = mongoose.model('contests' , contestSchema);
export default contests;