const Users = require('../users/users-model');

// logs API request details
function logger(req, res, next) {
  console.log(`
    ${new Date()}

    ${req.method} request to ${req.baseUrl} endpoint!

    req.body ${JSON.stringify(req.body)}
    req.params.id ${req.params.id}
  `);
  next();
}

// checks if the user id exists
async function validateUserId(req, res, next) {
  try {
    const user = await Users.getById(req.params.id)
    if (!user) {
      next({ status: 404, message: 'user not found' });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    next(err);
  }
}

// checks if the body contains required user data ("name" field)
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

// checks if the body contains required post data ("text" field)
async function validatePost(req, res, next) {
  try {
    const newPost = req.body;
    if (!newPost.text) {
      next({ status: 400, message: 'missing required text field' });
    } else {
      req.newPost = newPost;
      next();
    }
  } catch (err) {
    next(err);
  }
}

module.exports = { logger, validateUserId, validateUser, validatePost };
