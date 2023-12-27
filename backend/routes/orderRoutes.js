import express  from 'express';
import  isAuth , {authorizeRole}  from '../middleware/auth.js';
import { allOrders, deleteOrder, getSingleOrder, myOrders, newOrder, updateOrder } from '../controllers/orderController.js';


const router = express.Router();

router.route('/new').post(isAuth,newOrder);

router.route('/me').get(isAuth,myOrders);
router.route("/admin/all").get(isAuth,authorizeRole("admin"),allOrders);
router.route('/admin/:id').get(isAuth,authorizeRole("admin") ,getSingleOrder);

router.route("/admin/:id").put(isAuth, authorizeRole("admin"), updateOrder).delete(isAuth, authorizeRole("admin"), deleteOrder);








export default router;

