import express  from 'express';
import  isAuth , {authorizeRole}  from '../middleware/auth.js';
import { newOrder } from '../controllers/orderController.js';


const router = express.Router();

router.route('/new').get(isAuth,newOrder);










export default router;

