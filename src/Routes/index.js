const {Router} = require('express');
const router = Router();
const {userController} = require('../Controller/index.js');
const {verifyToken, verifyRole} = require('../Middleware/auth.js');
const AuthGuard = require('../Middleware/auth.js');
router.get('/', (req, res) => {
    res.status(200).send('Hello World');
});


router.get('/users/',AuthGuard, userController.getAll);
router.post('/users/register', userController.create);
router.post('/users/login', userController.login);



module.exports = router;

