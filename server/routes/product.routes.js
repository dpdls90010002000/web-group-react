import express from 'express'
	import productCtrl from '../controllers/product.controller.js' 
	const router = express.Router()
	router.route('/api/products') 
	.get(productCtrl.list)
	.post(productCtrl.create)
	router.route('/api/products/:userId') 
	.get(productCtrl.read)
	.put(productCtrl.update) 
	.delete(productCtrl.remove)
router.param('userId', productCtrl.userByID)
router.route('/api/products').post(productCtrl.create) 
router.route('/api/products').get(productCtrl.list)
router.param('userId', productCtrl.userByID)
router.route('/api/products/:userId').get(productCtrl.read)
router.route('/api/products/:userId').put(productCtrl.update)
router.route('/api/products/:userId').delete(productCtrl.remove)

    
    
	export default router
