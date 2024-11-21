import express from 'express'
import { createTask, deleteTask, getAllTasks } from '../controllers/admintaskController.js';
import { isAdmin, requireSignIn } from '../middlewares/userMiddleware.js';


const router = express.Router()

router.post('/createtask',  createTask);
router.get('/gettasklist',  getAllTasks);
router.delete('/deletetask/:id',  deleteTask);


export default router;
