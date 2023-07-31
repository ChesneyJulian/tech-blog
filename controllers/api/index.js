const router = require('express').Router();
const userRoutes = require('./user');
const postingRoutes = require('./posting-routes');

router.use('/user', userRoutes);
router.use('/posting-routes', postingRoutes);

module.exports = router;