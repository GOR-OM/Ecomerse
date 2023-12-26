import express  from 'express';
import { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserProfile,updatePassword, updateProfile, getAllUsers, getUserDetails, updateUser, deleteUser } from '../controllers/userControler.js';
import  isAuth , {authorizeRole}  from '../middleware/auth.js';

const router = express.Router();


router.route('/new').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/forgotpassword').post(forgotPassword);
router.route('/resetpassword/:token').put(resetPassword);

router.route("/me").get(isAuth,getUserProfile);
router.route("/updatepassword").put(isAuth,updatePassword);
router.route("/updateprofile").put(isAuth,updateProfile);

router.route("/admin/users").get(isAuth,authorizeRole("admin"),getAllUsers);
router.route("/admin/user/:id").get(isAuth,authorizeRole("admin"),getUserDetails).put(isAuth,authorizeRole("admin"),updateUser).delete(isAuth,authorizeRole("admin"),deleteUser);


export default router;