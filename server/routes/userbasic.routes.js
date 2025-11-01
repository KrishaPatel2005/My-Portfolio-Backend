import express from 'express'
import { createUser, listUsers, getUser, deleteUser } from '../controllers/userbasic.controller.js'

const router = express.Router()

router.route('/')
  .get(listUsers)
  .post(createUser)

router.route('/:id')
  .get(getUser)
  .delete(deleteUser)

export default userbasicRouter;
