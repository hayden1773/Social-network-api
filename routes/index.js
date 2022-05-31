// REQUIRED
const router = require('express').Router();

// COLLECTION OF ROUTES USED
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

module.exports = router;
