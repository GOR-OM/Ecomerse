import express  from 'express';
import { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserProfile,updatePassword } from '../controllers/userControler.js';
import  isAuth  from '../middleware/auth.js';

const router = express.Router();


router.route('/new').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/forgotpassword').post(forgotPassword);
router.route('/resetpassword/:token').put(resetPassword);

router.route("/me").get(isAuth,getUserProfile);
router.route("/update").put(isAuth,updatePassword);


export default router;