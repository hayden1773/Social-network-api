const router = require('express').Router();
const userRoutes = require('./Useroutes');
const thoughtsRoutes = require('./thoughtsRoutes');

router.use('/User', userRoutes);
router.use('/thoughts', thoughtsRoutes);

module.exports = router;
