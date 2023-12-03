// import express from 'express'
// import productCtrl from '../controllers/product.controller.js'
// import authCtrl from '../controllers/auth.controller.js'
// import shopCtrl from '../controllers/shop.controller.js'

// const router = express.Router()

// router.route('/api/products/by/:shopId')
//   .post(authCtrl.requireSignin, shopCtrl.isOwner, productCtrl.create)
//   .get(productCtrl.listByShop)

// router.route('/api/products/latest')
//   .get(productCtrl.listLatest)

// router.route('/api/products/related/:productId')
//   .get(productCtrl.listRelated)

// router.route('/api/products/categories')
//   .get(productCtrl.listCategories)

// router.route('/api/products')
//   .get(productCtrl.list)

// router.route('/api/products/:productId')
//   .get(productCtrl.read)

// router.route('/api/product/image/:productId')
//   .get(productCtrl.photo, productCtrl.defaultPhoto)
// router.route('/api/product/defaultphoto')
//   .get(productCtrl.defaultPhoto)

// router.route('/api/product/:shopId/:productId')
//   .put(authCtrl.requireSignin, shopCtrl.isOwner, productCtrl.update)
//   .delete(authCtrl.requireSignin, shopCtrl.isOwner, productCtrl.remove)

// router.param('shopId', shopCtrl.shopByID)
// router.param('productId', productCtrl.productByID)

// export default router

import express from 'express'
import orderCtrl from '../controllers/order.controller.js'
import productCtrl from '../controllers/product.controller.js'
import authCtrl from '../controllers/auth.controller.js'
import shopCtrl from '../controllers/shop.controller.js'
import userCtrl from '../controllers/user.controller.js'

const router = express.Router()

router.route('/api/orders/:userId')
  .post(authCtrl.requireSignin, userCtrl.stripeCustomer, productCtrl.decreaseQuantity, orderCtrl.create)

router.route('/api/orders/shop/:shopId')
  .get(authCtrl.requireSignin, shopCtrl.isOwner, orderCtrl.listByShop)

router.route('/api/orders/user/:userId')
  .get(authCtrl.requireSignin, orderCtrl.listByUser)

router.route('/api/order/status_values')
  .get(orderCtrl.getStatusValues)

router.route('/api/order/:shopId/cancel/:productId')
  .put(authCtrl.requireSignin, shopCtrl.isOwner, productCtrl.increaseQuantity, orderCtrl.update)

router.route('/api/order/:orderId/charge/:userId/:shopId')
  .put(authCtrl.requireSignin, shopCtrl.isOwner, userCtrl.createCharge, orderCtrl.update)

router.route('/api/order/status/:shopId')
  .put(authCtrl.requireSignin, shopCtrl.isOwner, orderCtrl.update)

router.route('/api/order/:orderId')
  .get(orderCtrl.read)

router.param('userId', userCtrl.userByID)
router.param('shopId', shopCtrl.shopByID)
router.param('productId', productCtrl.productByID)
router.param('orderId', orderCtrl.orderByID)

export default router
