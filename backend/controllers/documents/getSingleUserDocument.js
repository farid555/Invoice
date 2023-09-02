import asyncHandler from 'express-async-handler';
import Document from '../../models/documentModel.js';

// $-title   Get a Single document belonging to a User
// $-path    GET /api/v1/document/:id
// $-auth    Private

const getSingleUserDocument = asyncHandler(async (req, res) => {
  const find_Document = await Document.findById(req.params.id);

  const user = req.user._id;

  if (!find_Document) {
    res.status(204);
    throw new Error('Document not found');
  }

  if (find_Document.id !== user) {
    res.status(200).json({
      success: true,
      find_Document,
    });
  } else {
    res.status(401);
    throw new Error(
      "You are not authorized to view this document's document. It is not yours"
    );
  }
});

export default getSingleUserDocument;
