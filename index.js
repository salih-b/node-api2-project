
const express = require('express');

const server = express();

const postsRouter = require('./posts/router.js');

//middleware
server.use(express.json());
server.use('/api/posts', postsRouter);

//endpoints
 
   
// End
const port = 8000;
server.listen(port, ()=>{
    console.log(`\n Listening on port ${port} ... \n`);
});