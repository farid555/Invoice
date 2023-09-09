import express from 'express';
import createDocument from '../controllers/documents/createDocument.js';
import deleteDocument from '../controllers/documents/deleteDocument.js';
import getAllUserDocuments from '../controllers/documents/getAllUserDocuments.js';
import getSingleUserDocument from '../controllers/documents/getSingleUserDocument.js';
import updateDocument from '../controllers/documents/updateDocument.js';
import checkAuth from '../middleware/checkAuthMiddleware.js';
import {
  generatePDF,
  getPDF,
  sendDocument,
} from '../controllers/documents/generatePDF.js';
import createDocumentPayment from "../controllers/documents/createPaymnent.js"

const router = express.Router();

//Create a new document at /api/v1/document/create
router.route('/create').post(checkAuth, createDocument);

//Get all of users documents at /api/v1/document/all
router.route('/all').get(checkAuth, getAllUserDocuments);

//Create document payment
router.route("/:id/payment").post(checkAuth, createDocumentPayment)

//Get, update and delete a document
router
  .route('/:id')
  .get(checkAuth, getSingleUserDocument)
  .patch(checkAuth, updateDocument)
  .delete(checkAuth, deleteDocument);

//generate PDF document at /api/v1/document/generate-pdf
router.route('/generate-pdf').post(generatePDF);

//get PDF at /api/v1/document/get-pdf
router.route('/get-pdf').get(getPDF);

//send email with pdf at /api/v1/document/send-document
router.route('/send-pdf').post(sendDocument);


export default router;
