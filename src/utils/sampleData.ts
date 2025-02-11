import { InvoiceData } from '../types/invoice';

export const sampleInvoiceData: InvoiceData = {
  invoiceNumber: '004',
  date: 'JUN 19, 2023',
  dueDate: 'JUN 20, 2023',
  company: {
    name: 'Foobar Labs',
    address: '45, Baghruver Dham Society, Bengaluru, Karnataka, India - 560054',
    gstin: '29ABCDE1234F2Z5',
    pan: 'ABCDE1234F',
  },
  client: {
    name: 'Web Studio',
    address: '505, 3rd Floor Orion mall, Bengaluru, Karnataka, India - 560058',
    gstin: '29VWXYZ4321A2Z6',
    pan: 'VWXYZ1234K',
  },
  items: [
    {
      description: 'Basic Web Development',
      hsn: '02',
      qty: 1,
      gst: 9,
      amount: 10000,
    },
    {
      description: 'Logo Design',
      hsn: '06',
      qty: 1,
      gst: 9,
      amount: 10000,
    },
    {
      description: 'Web Design',
      hsn: '06',
      qty: 1,
      gst: 9,
      amount: 10000,
    },
    {
      description: 'Full Stack Web Development',
      hsn: '06',
      qty: 1,
      gst: 9,
      amount: 10000,
    },
    {
      description: 'UI/UX Design',
      hsn: '06',
      qty: 1,
      gst: 9,
      amount: 10000,
    },
    {
      description: 'Mobile App Development',
      hsn: '06',
      qty: 1,
      gst: 9,
      amount: 10000,
    },
    {
      description: 'SEO Optimization',
      hsn: '06',
      qty: 1,
      gst: 9,
      amount: 10000,
    },
    {
      description: 'Content Management System',
      hsn: '06',
      qty: 1,
      gst: 9,
      amount: 10000,
    }
  ],
  bankDetails: {
    accountName: 'Foobar Labs',
    accountNumber: '1234567890',
    ifsc: 'SBIN0123456',
    bankName: 'State Bank of India',
    upi: 'foobarlabs@upi',
  },
  subTotal: 80000,
  discount: 8000,
  cgst: 6480,
  sgst: 6480,
  total: 84960,
};
