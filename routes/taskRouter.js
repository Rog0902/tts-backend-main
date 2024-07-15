import express from 'express'
import taskCtrl from '../controllers/taskCtrl.js';

const router = express.Router();

router.post('/createTask', taskCtrl.createTask)
router.get('/getTasks', taskCtrl.getTasks)
router.put('/updateTask', taskCtrl.updateTask)
router.delete('/deleteTask', taskCtrl.deleteTask)

export default router
