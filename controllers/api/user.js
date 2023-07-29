const router = require('express').Router();
const { User } = require('../../models');

// create route for user login
router.post('/login', async (req, res) => {
  try {
    // find user data with matching username
    const userData = await User.findOne({
      where: {
        username: req.body.username
      }
    });
    // return error message if no user found
    if (!userData) {
      return res.status(400).json({message: 'Incorrect username or password'});
    };
    // validate password using custom checkPassword method in User model with req.body.password
    const validPassword = await userData.checkPassword(req.body.password);
    // return error if password is not validated
    if(!validPassword)  {
      return res.status(400).json({message: 'Incorrect username or password'});
    };
    req.session.save(() => {
      // save user_id from userdata.id to req.session
      req.session.user_id = userData.id;
      // set session.loggedIn to true
      req.session.loggedIn = true;
      // return successful message
      res.json({ user: userData, message: 'Successfully logged in!'});
    })
  } catch (err) {
    res.status(500).json(err);
  };
})

module.exports = router;