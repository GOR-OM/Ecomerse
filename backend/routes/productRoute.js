import express, {Router} from 'express';
import { createProduct, deleteProduct, getAllProducts, getProductDetails, updateProduct } from '../controllers/productController.js';
import  isAuth  from '../middleware/auth.js';
const router = express.Router();


router.route('/').get(isAuth ,getAllProducts) ;
router.route('/new').post(isAuth ,createProduct) ;
router.route('/:id').put(isAuth,updateProduct).delete(isAuth,deleteProduct).get(isAuth,getProductDetails) ;





export default  router;