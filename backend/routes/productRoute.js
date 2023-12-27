import express, {Router} from 'express';
import { createProduct, deleteProduct, getAllProducts, getProductDetails, updateProduct,productReview, getProductReviews } from '../controllers/productController.js';
import  isAuth ,{authorizeRole}  from '../middleware/auth.js';
const router = express.Router();


router.route('/').get(isAuth ,getAllProducts) ;
router.route('/admin/new').post(isAuth,authorizeRole("admin") ,createProduct) ;
router.route('/reviews').put(isAuth,productReview) ;
router.route('admin/:id').put(isAuth,authorizeRole("admin"),updateProduct).delete(isAuth,authorizeRole("admin"),deleteProduct) ;
router.route('/:id').get(isAuth,getProductDetails) ;    // get product details

router.route('/allreview/:id').get(isAuth,getProductReviews) ;




export default  router;