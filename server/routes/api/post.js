const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const passport = require('passport');

// Load a Post Model

const Post = require('../../model/Post');
const Profile= require('../../model/Profile');


//  Load a validation

const  ValidatePost  = require('../../validation/post');


// Routes

router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {errors,isValid} =  ValidatePost(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
   
      const newpost = new Post({
            name:req.body.name,
            text:req.body.text,
            avatar:req.body.avatar,
            user:req.user.id
        });
        newpost.save().then(post=>res.json(post)).catch(err=>res.status(404).json(err));
    })

//  get method & get a data in date order

router.get('/',(req,res)=>{
    Post.find().sort({date:-1})
    .then(posts=>res.json(posts)).catch(err=> res.status(404).json({NoPosts:"There is No Posts"}));
}
)

// get moethod using id

router.get('/:id',(req,res)=>{
    Post.findById(req.params.id)
    .then(post=>{
        if(!post){
            return res.status(404).json({NoPost:"There is No Posts"})
        }
        res.json(post);
    })
})
router.delete('/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user:req.user.id})
    .then(Profile=>{
        Post.findById(req.params.id)
        .then(post=>{
            if(post.user.toString() !== req.user.id){
                return res.status(401).json({unauthorized:"user not authorizzed"})
            }
            // Delete
            post.remove().then(()=>res.json({success:true}))
        })
    })
    .catch(err=>res.status(404).json({postnotfound:"no post found"}))
})

// Add A Likes

router.post('/likes/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user:req.user.id})
    .then(profile=>{
        Post.findById(req.params.id)
        .then(post=>{
            if(post.likes.filter(like=> like.user.toString() === req.user.id).length > 0){
                return res.status(400).json({AlreadyLiked:"this user Already liked"})
            }
            // Add users
            post.likes.unshift({user:req.user.id})
            post.save().then(post=>res.json(post))
        })
    })
    .catch(err=>res.status(404).json({postnotfound:"no post found"}))


});

// Post Unlike

router.post('/unlike/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user:req.user.id})
    .then(profile=>{
        Post.findById(req.params.id)
        .then(Post=>{
            if(post.likes.filter(like=>like.user.toString() === req.user.id ).length === 0){
                return res.status(400).json({NotLiked:"You Have Noy yet Liked This Post"})
            }
            //  Get And Removed The index

            const removeIndex = post.likes.map(item=>item.user.toString()).indexOf(req.user.id);

            // Splice Arrya
            post.likes.splice(removeIndex,1);

            post.save().then(prost=>res.json(post))
            
        })
    })
})
router.post('/comment/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    post.findById(req.params.id)
    .then(post=>{
        const newComment = {
            text:req.body.text,
            name:req.body.name,
            avatar:req.body.avatar,
            user:req.user.id
        };
        post.comments.unshift(newComment);
        post.save().then(post=>res.json(post))
    })
    .catch(err=>res.status(404).json({post:"post not found"}))
})


module.exports = router;