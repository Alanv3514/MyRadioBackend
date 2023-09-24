const {Router} = require('express');
const router = Router();
const {userController, programController} = require('../Controller/index.js');
const authGuard = require('../Middleware/auth.js');

router.get('/', (req, res) => {
    res.status(200).send('Hello World');
});

router.get('/users/',authGuard('admin'), userController.getAll);
router.post('/users/register', userController.create);
router.post('/users/login', userController.login);

// Rutas de 'programs'
router.get('/programs/',authGuard('admin'), programController.getAll); // Leer todos los programas
router.get('/programs/:id',authGuard('user'), programController.getOne); // Leer un programa específico
router.post('/programs/',authGuard('admin'), programController.create); // Crear un nuevo programa
router.put('/programs/:id',authGuard('admin'), programController.update); // Actualizar un programa específico
router.delete('/programs/:id',authGuard('admin'), programController.delete); // Eliminar un programa específico

module.exports = router;
