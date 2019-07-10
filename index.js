// code away!
const express = require('express');
const server = express();

const userRoutes = require('./users/userRouter.js');
const postRoutes = require('./posts/postRouter.js');

server.use(logger);
server.use(express.json());
server.use('/api/users', userRoutes);
server.use('/api/posts', postRoutes);

server.use('/', (req, res) => res.send('API up and running'));

function logger(req, res, next) {
    console.log(
        `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
            'Origin'
        )}`
    );

    next();
}



const port = 5000;

server.listen(port, () => console.log(`running on port ${port}`));