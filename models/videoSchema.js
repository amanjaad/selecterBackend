import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
  videoId:{
      type:mongoose.Schema.Types.ObjectId , ref:'user'
  },
  file:{
      type:String,
      default:null
  }
});

const videos = mongoose.model("videos", videoSchema);
export default videos;
