import User from "../models/userSchema.js";
import Prospect from "../models/prospectFormSchema.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Video from '../models/videoSchema.js';
import mongodb from 'mongodb';
import fs from 'fs';

dotenv.config();

export const userLogin = async (request, response) => {
  //console.log(request.body);
  try {
    // Get user input
    const { email, password } = request.body;
    let user = await User.findOne({
      email
     // password: request.body.password,
    });
    // Validate user input
    if (!(email && password)) {
      response.status(400).send("All input is required");
    }

    //console.log(user);
    if (user && (await bcrypt.compare(password, user.password))){
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      //user.token = token;
      response.setHeader("auth-token" , token.toString());
      return response
        .status(200)
        .json(`${request.body.email} login successfull`);
      }
    else return response.status(401).json("Invalid credentials");
  } catch (error) {
    console.log("Error: ", error.message);
  }
};

export const userRegistration = async (request, response) => {
  const {
    firstname,
    lastname,
    email,
    phone,
    dob,
    gender,
    city,
    state,
    country,
    password,
    profilepic,
    bio,
    likedislike,
    interestedin,
  } = request.body;

  const encryptedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    firstname,
    lastname,
    email,
    phone,
    dob,
    gender,
    city,
    state,
    country,
    password:encryptedPassword,
    profilepic,
    bio,
    likedislike,
    interestedin,
  });

  try {
    await newUser.save();

    
    // Create token
    const token = jwt.sign(
      { user_id: newUser._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    // Create token
    //user.token = token;
    response.setHeader("auth-token" , token.toString());
    newUser.token = token;
    response.status(200).json(`${request.body.email} registered successfully`);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

export const createProspect = async (request , response) => {
  const {
    name,
    phone,
    email,
    gender,
    birthday,
    race,
    maritalstatus,
    height,
    weight,
    state,
    city,
    picture,
    wantkids,
    havekids,
    lookingfor,
    lovalanguage,
    hobbies,
    createdAt
  } = request.body;

  const newProspect = new Prospect({
    name,
    phone,
    email,
    gender,
    birthday,
    race,
    maritalstatus,
    height,
    weight,
    state,
    city,
    picture,
    wantkids,
    havekids,
    lookingfor,
    lovalanguage,
    hobbies,
    createdAt,
  })
  try {
    await newProspect.save({});
    response.status(201).json(newProspect);
  } catch (error) {
    response.status(409).json({ message: error.message }); 
  }
}
export const getSelector = async (request , response) => {
  try {
    const selector = await User.findOne(request.params.id);
    console.log(selector.email);
    response.status(201).json(selector);
  } catch (error) {
    console.log("Error: ", error.message);
  }
}

export const videoUpload = async(request,response) => {
  const url = "mongodb+srv://aman:JPXvlwCTk8jPnbxg@cluster0.hqgfg.mongodb.net/SELECTER?retryWrites=true&w=majority";
  // Sorry about this monstrosity -- just for demo purposes
  mongodb.MongoClient.connect(url, function (error, client) {
    if (error) {
      res.json(error);
      return;
    }
    // connect to the videos database
    const db = client.db('videos');

    // Create GridFS bucket to upload a large file
    const bucket = new mongodb.GridFSBucket(db);

    // create upload stream using GridFS bucket
    const videoUploadStream = bucket.openUploadStream('bigbuck');

    // You can put your file instead of bigbuck.mp4
    const videoReadStream = fs.createReadStream('./bigbuck.mp4');

    // Finally Upload!
    videoReadStream.pipe(videoUploadStream);

    // All done!
    response.status(200).send("Done...");
});
}

export const getVideo = (req, res) => {
  const url = "mongodb+srv://aman:JPXvlwCTk8jPnbxg@cluster0.hqgfg.mongodb.net/SELECTER?retryWrites=true&w=majority";
  mongodb.MongoClient.connect(url, function (error, client) {
    if (error) {
      res.status(500).json(error);
      return;
    }

    const range = req.headers.range;
    if (!range) {
      res.status(400).send("Requires Range header");
    }

    const db = client.db('videos');
    // GridFS Collection
    db.collection('fs.files').findOne({}, (err, video) => {
      if (!video) {
        res.status(404).send("No video uploaded!");
        return;
      }

      // Create response headers
      const videoSize = video.length;
      const start = Number(range.replace(/\D/g, ""));
      const end = videoSize - 1;

      const contentLength = end - start + 1;
      const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
      };

      // HTTP Status 206 for Partial Content
      res.writeHead(206, headers);

      const bucket = new mongodb.GridFSBucket(db);
      const downloadStream = bucket.openDownloadStreamByName('bigbuck', {
        start
      });

      // Finally pipe video to response
      downloadStream.pipe(res);
    });
    })
  };