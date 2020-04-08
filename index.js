
const express = require('express');

const server = express();

let posts = require('./data/db.js');

//middleware
server.use(express.json());

//endpoints
    // get req 
server.get('/api/posts', (req, res)=> {
    posts.find(req.query)
    .then( posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        console.log(err);
    });
});

// server.get('/api/posts/:theId', (req, res)=>{
//     const id = req.params.theId;

//     const user = posts.find( user => user.id == id);
//     if (user){
// res.status(200).json(user);
//     }else{
// res.status(404).json({message: `User does not exist`})
//     }
// });

     // delete req

server.delete('/api/posts/:id', (req, res)=>{
    const id = req.params.id;
    posts.remove(id)
    .then((count)=>{
        console.log(count);
        res.status(200).json({message: 'User is GONEZ'});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: `theres an error ${err}`});
    })
});


    // patch? req
// server.patch('/api/posts/:id', (req, res)=>{
//     res.json({api: 'running....'})
// });
     // post req +++{Completed}+++
     server.post('/api/posts', (req, res)=>{
         posts.add(req.body)
         .then( post =>{
            res.status(201).json(post);
         })
         .catch(err =>{
             console.log(err);
             res.status(500).json({error: `Error adding post`});
         });
    });
    
// End
const port = 8000;
server.listen(port, ()=>{
    console.log(`\n Listening on port ${port} ... \n`);
});
