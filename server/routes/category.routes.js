import express from 'express'
import categoryCtrl from '../controllers/category.controller.js'
const router = express.Router()

router.route('/api/categories')
    .get(categoryCtrl.list)
    .post(categoryCtrl.create)
router.route('/api/categories/:userId')
    .get(categoryCtrl.read)
    .put(categoryCtrl.update)
    .delete(categoryCtrl.remove)
router.param('userId', categoryCtrl.userByID)
router.route('/api/categories').post(categoryCtrl.create)
router.route('/api/categories').get(categoryCtrl.list)
router.param('userId', categoryCtrl.userByID)
router.route('/api/categories/:userId').get(categoryCtrl.read)
router.route('/api/categories/:userId').put(categoryCtrl.update)
router.route('/api/categories/:userId').delete(categoryCtrl.remove)

export default router
