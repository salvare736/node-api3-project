const server = require('./api/server');

server.listen(4001, () => {
    console.log('Server Running on http://localhost:4001');
});
