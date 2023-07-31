const router = require('express').Router();
const userRoutes = require('./user.js');
const postingRoutes = require('./posting-routes.js');

router.use('/post', postingRoutes);
router.use('/user', userRoutes);

module.exports = router;