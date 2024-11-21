import express from 'express'
import { addUser, allUsers,  deleteUser,  getuserTask,  updateUser,  userRegister, userlogin, usertaskStatus } from '../controllers/userController.js';
import { isAdmin, requireSignIn } from '../middlewares/userMiddleware.js';
const router = express.Router()

router.post('/login', userlogin )
router.post('/register', userRegister )


router.get('/allusers', allUsers )
router.get('/allusertasks', getuserTask )
router.put('/usertaskstatus/:id', usertaskStatus )
router.post('/adduser', isAdmin,  requireSignIn, addUser )
router.put('/updateuser/:id',  updateUser )
router.delete('/deleteuser/:id',  deleteUser )


// Analyticcs route
export default router;

