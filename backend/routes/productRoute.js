import express, {Router} from 'express';
import { createProduct, deleteProduct, getAllProducts, getProductDetails, updateProduct } from '../controllers/productController.js';
import  isAuth ,{authorizeRole}  from '../middleware/auth.js';
const router = express.Router();


router.route('/').get(isAuth ,getAllProducts) ;
router.route('/new').post(isAuth,authorizeRole("admin") ,createProduct) ;
router.route('/:id').put(isAuth,authorizeRole("admin"),updateProduct).delete(isAuth,authorizeRole("admin"),deleteProduct).get(isAuth,getProductDetails) ;





export default  router;