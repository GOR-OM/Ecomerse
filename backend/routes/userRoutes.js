import express  from 'express';
import { registerUser } from '../controllers/userControler.js';


const router = express.Router();


router.route('/new').post(registerUser);



export default router;