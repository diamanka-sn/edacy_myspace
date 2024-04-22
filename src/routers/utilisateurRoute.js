const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router()

router.get('/', userController.getAll)
router.post('/', userController.create)
router.get('/:id', userController.getById)
router.delete('/:id', userController.delete)
router.put('/:id', userController.update)

module.exports = router
