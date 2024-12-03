const express = require("express");
const router = express.Router();
const {createUserHandler, getUserHandler, updateUserHandler, deleteUserHandler, loginUserHandler } = require("../../controllers/v1/userController")

router.get('/', getUserHandler)

router.post('/signup', createUserHandler)

router.put('/:id', updateUserHandler)

router.delete('/:id',deleteUserHandler )

router.post('/login', loginUserHandler)

module.exports = router;
