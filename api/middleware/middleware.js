const Users = require('../users/users-model');
const Posts = require('../posts/posts-model');

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(`
    ${req.method} request to ${req.baseUrl} endpoint!
    req.body ${JSON.stringify(req.body)}
    req.params.id ${req.params.id}
  `);
  next();
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  try {
    const user = await Users.getById(req.params.id)
    if (!user) {
      next({ status: 404, message: `user with id ${req.params.id} not found!` });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    next(err);
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules

module.exports = { logger, validateUserId, validateUser, validatePost }
