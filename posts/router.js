const express = require('express');

const router = express.Router();
let posts = require('../data/db.js');

   // get req 
   router.get('/', (req, res)=> {
    posts.find(req.query)
    .then( posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        console.log(err);
    });
});

router.get('/:id', (req, res)=> {
    posts.findById(req.params.id)
    .then( post => {
        res.status(200).json(post);
    })
    .catch(err => {
        console.log(err);
    });
});

router.get('/:id/comments', (req, res)=>{
    posts.findPostComments(req.params.id)
    .then( messages =>{
       res.status(201).json(messages);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error: `Error adding post`});
    });
});

     // delete req

router.delete('/:id', (req, res)=>{
    const id = req.params.id;
    posts.remove(id)
    .then((count)=>{
        console.log(count);
        res.status(200).json({message: 'User is GONEZ'});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: `theres an error ${err}`});
    });
});


    // patch req
    router.put('/:id', (req, res)=>{
        const changes = req.body;
        posts.update(req.params.id, changes)
        .then(post =>{
            if (post){
                res.status(200).json(post);
            } else {
                res.status(404).json({message: `The post could not found `});
            }
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({error: `Error adding post`});
        });
   });
   
     // post req 
     router.post('/', (req, res)=>{
         posts.insert(req.body)
         .then( post =>{
            res.status(201).json(post);
         })
         .catch(err =>{
             console.log(err);
             res.status(500).json({error: `Error adding post`});
         });
    });
    router.post('/:id/comments', (req, res)=>{
        posts.insertComment(req.body)
        .then( message =>{
           res.status(201).json(message);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({error: `Error adding post`});
        });
   });


   module.exports = router;