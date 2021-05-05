const express = require('express');
const { logger, validateUserId, validateUser, validatePost } = require('../middleware/middleware');
const Users = require('./users-model');
const Posts = require('../posts/posts-model');
const router = express.Router();

// get all users
router.get('/', logger, (req, res, next) => {
  Users.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(next);
});

// get user by id
router.get('/:id', logger, validateUserId, (req, res) => { 
  res.json(req.user);
});

// create new user
router.post('/', logger, validateUser, (req, res, next) => {
  Users.insert(req.newUser)
    .then(() => {
      res.status(200).json(req.newUser);
    })
    .catch(next);  
});

// update user by id
router.put('/:id', logger, validateUser, validateUserId, (req, res, next) => {
  Users.update(req.params.id, req.newUser)
    .then(() => {
      res.status(200).json(req.newUser);
    })
    .catch(next);
});

// delete user by id
router.delete('/:id', logger, validateUserId, (req, res, next) => {
  Users.remove(req.params.id)
    .then(() => {
      res.status(200).json(req.user);
    })
    .catch(next);
});

// get posts by user id
router.get('/:id/posts', logger, validateUserId, (req, res, next) => {
  Users.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(next);
});

// create post by user id
router.post('/:id/posts', logger, validatePost, validateUserId, (req, res, next) => {
  const postInfo = { ...req.body, user_id: req.params.id };
  Posts.insert(postInfo)
    .then(() => {
      res.status(200).json(req.newPost);
    })
    .catch(next);
});

// catch-all error handler
router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    note: 'Something nasty went down in users router',
    message: err.message,
    stack: err.stack
  });
});

module.exports = router;
