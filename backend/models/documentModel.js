import mongoose from 'mongoose';

const { randomBytes } = await import('crypto');

const paymentSchema = new Schema(
  {
    paidBy: String,
    datePaid: String,
    amountPaid: Number,
    paymentMethod: {
      type: String,
      default: 'CASH',
      enum: [
        'Cash',
        'Mobile Money',
        'Paypal',
        'Credit Card',
        'Bank Transfer',
        'Others',
      ],
    },
    additionalInfo: String,
  },
  {
    timestamps: true,
  }
);

const documentSchema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },

    customer: {
      name: String,
      email: String,
      accountNo: String,
      vatTinNo: String,
      address: String,
      city: String,
      country: String,
      phoneNumber: String,
    },

    documentType: {
      type: String,
      default: 'invoice',
      enum: ['Invoice', 'Receipt', 'Quotation'],
    },
    documentNumber: String,
    duDate: Date,
    additionalInfo: String,
    termsConditions: String,
    status: {
      type: String,
      default: 'Not Paid',
      enum: ['Paid', 'Not FullyPaid', 'Not Paid'],
    },

    subTotal: Number,
    salesTax: Number,
    rates: String,
    total: Number,
    currency: String,
    totalAmountReceived: Number,

    billingItems: [
      {
        itemName: String,
        uniPrice: Number,
        quantity: Number,
        discount: String,
      },
    ],

    paymentRecords: true,
  },
  {
    timestamps: true,
  }
);

documentSchema.pre('save', async function (next) {
  this.documentNumber = `${new Date().getFullYear()}-${new Date().toLocalString(
    'default',
    { month: 'long' }
  )}-${randomBytes(3).toString('hex').toUpperCase()}`;
  next();
});

const Document = mongoose.model('Document', documentSchema);

export default Document;