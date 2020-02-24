/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, please read the README word for word, don't worry, you got this
in every task there may be trouble, but if you worry you make it double, don't worry, you got this
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, you got this
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just hack it…
I need this code, but don't know where, perhaps should make some middleware, don't worry, just hack it

Go code!
*/

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const PORT = 8500;
const server = express();
const projectRouters = require("./routers/projectRouters");
const actionRouters = require("./routers/actionsRouter");

server.use(helmet());
server.use(morgan('tiny'));
server.use(express.json());
server.use("/api/projects", projectRouters);
server.use("/api/actions", actionRouters);

server.get("/", (req,res) => {
   res.status(200).json("App is up and running now.")
})

server.use((req,res) => {
   res.status(404).json({
      msg:'Router not found'
   })
});

server.use((err,req,res,next) => {
    res.status(500).json({
       msg:'Something went wrong with the server'
    })
});

server.listen(PORT, (req,res) => {
   console.log(`Server is up and running at http://localhost:${PORT}`);
})
