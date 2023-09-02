import asyncHandler from 'express-async-handler';
import Document from '../../models/documentModel.js';

//$-title  Delete Document
//$-path   DELETE /api/v1/document/:id
//$-auth   Private

const deleteDocument = asyncHandler(async (req, res) => {
  const find_document = await Document.findById(req.params.id);

  if (!find_document) {
    res.status(404);
    throw new Error('That document does not exist');
  }

  if (find_document.createdBy.toString() !== req.user.id) {
    res.status(401);
    throw new Error(
      'You are not authorized to delete this customers document. It is not yours '
    );
  }

  await find_document.deleteOne();

  res.json({ success: true, message: 'Your document has been deleted' });
});

export default deleteDocument;
