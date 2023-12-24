import express  from 'express';
import { registerUser, loginUser, logoutUser, forgotPassword } from '../controllers/userControler.js';


const router = express.Router();


router.route('/new').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/forgotpassword').post(forgotPassword);



export default router;