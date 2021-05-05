const Users = require('../users/users-model');
const Posts = require('../posts/posts-model');

function logger(req, res, next) {
  console.log(`
    ${new Date()}

    ${req.method} request to ${req.baseUrl} endpoint!

    req.body ${JSON.stringify(req.body)}
    req.params.id ${req.params.id}
  `);
  next();
}

async function validateUserId(req, res, next) {
  try {
    const user = await Users.getById(req.params.id)
    if (!user) {
      next({ status: 404, message: `user not found` });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    next(err);
  }
}

async function validateUser(req, res, next) {
  try {
    const newUser = req.body;
    if (!newUser.name) {
      next({ status: 400, message: 'missing required name field' });
    } else {
      req.newUser = newUser;
      next();
    }
  } catch (err) {
    next(err);
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

module.exports = { logger, validateUserId, validateUser, validatePost }
