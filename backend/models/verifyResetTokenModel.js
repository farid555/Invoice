import mongoose from 'mongoose';

const { schenma } = mongoose;

const verifyResetTokenSchema = new Schema({
  _userId: {
    type: mongoose.Schema.Types.Object,
    required: true,
    ref: 'User',
  },
  token: { type: String, required: true },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 900,
  },
});

const VerifyRestToken = mongoose.model(
  'verifyResetToken',
  verifyResetTokenSchema
);

export default verifyResetToken;
