const asyncHandler = require("express-async-handler");
const Facility = require("../models/facilityModel");
const Comment = require("../models/commentModel");



const getComment= asyncHandler(async (req, res) => {
  const comment = await Comment.find();
  res.status(200).json(comment);
});

const getComments = asyncHandler(async (req, res) => {
  const shelterId=req.params.id
  const comment = await Comment.find({shelterId:shelterId})
  .catch((err) => res.status(400).json('Error: ' + err));
 
  res.status(201).json(comment);
});


const setComment = asyncHandler(async (req, res) => {

  /*   if (!req.body.comment) {
    // need to add back other fields after testing
    // res.status(400).json({ message: "Please add a text field" }); // bad req
    res.status(400);
    // express error handler
    throw new Error("Please enter your name");
  }*/
    
    shelterId=req.body.shelterId,
    user=req.body.user,
    comment=req.body.comment
    const newComment = await Comment.create({
    shelterId,user,comment
      
    });

    console.log(newComment);
    newComment
    .save()
    .then(() => res.status(201).json('Activity added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
  
});



module.exports = {
  getComment,
  setComment,
  getComments

};
