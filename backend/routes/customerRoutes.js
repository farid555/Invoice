import express from 'express';
import createCustomer from '../controllers/customers/createCustomer.js';
import deleteCustomer from '../controllers/customers/deleteCustomer.js';
import getAllUserCustomers from '../controllers/customers/getAllUserCustomers.js';
import getSingleUserCustomer from '../controllers/customers/getSingleUserCustomer.js';
import updateCustomerInfo from '../controllers/customers/updateCustomerInfo.js';
import checkAuth from '../middleware/checkAuthMiddleware.js';

const router = express.Router();

//Create a new customer at /api/v1/customer/create
router.route('/create').post(checkAuth, createCustomer);

//Get all of users customers at /api/v1/customer/all
router.route('/all').get(checkAuth, getAllUserCustomers);

//Get, update and delete a customer
router
  .route('/:id')
  .get(checkAuth, getSingleUserCustomer)
  .patch(checkAuth, updateCustomerInfo)
  .delete(checkAuth, deleteCustomer);

export default router;
