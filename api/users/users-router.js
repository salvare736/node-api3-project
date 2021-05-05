const express = require('express');
const { logger, validateUserId, validateUser, validatePost } = require('../middleware/middleware');
const Users = require('./users-model');
const Posts = require('../posts/posts-model');
const router = express.Router();

router.get('/', logger, (req, res, next) => {
  Users.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(next);
});

router.get('/:id', logger, validateUserId, (req, res) => { 
  res.json(req.user);
});

router.post('/', logger, validateUser, (req, res, next) => {
  Users.insert(req.newUser)
    .then(() => {
      res.status(200).json(req.newUser);
    })
    .catch(next);  
});

router.put('/:id', logger, validateUser, validateUserId, (req, res, next) => {
  Users.update(req.params.id, req.newUser)
    .then(() => {
      res.status(200).json(req.newUser);
    })
    .catch(next);
});

router.delete('/:id', logger, validateUserId, (req, res, next) => {
  Users.remove(req.params.id)
    .then(() => {
      res.status(200).json(req.user);
    })
    .catch(next);
});

router.get('/:id/posts', logger, validateUserId, (req, res, next) => {
  Users.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(next);
});

router.post('/:id/posts', logger, validateUserId, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    note: 'Something nasty went down in users router',
    message: err.message,
    stack: err.stack
  });
});

module.exports = router;
