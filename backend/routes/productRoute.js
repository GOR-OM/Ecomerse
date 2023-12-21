import express, {Router} from 'express';
import { createProduct, deleteProduct, getAllProducts, getProductDetails, updateProduct } from '../controllers/productController.js';
const router = express.Router();


router.route('/').get(getAllProducts) ;
router.route('/new').post(createProduct) ;
router.route('/:id').put(updateProduct).delete(deleteProduct).get(getProductDetails) ;





export default  router;