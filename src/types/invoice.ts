export interface InvoiceItem {
  description: string;
  hsn: string;
  qty: number;
  gst: number;
  amount: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  company: {
    name: string;
    address: string;
    gstin: string;
    pan: string;
  };
  client: {
    name: string;
    address: string;
    gstin: string;
    pan: string;
  };
  items: InvoiceItem[];
  bankDetails: {
    accountName: string;
    accountNumber: string;
    ifsc: string;
    bankName: string;
    upi: string;
  };
  subTotal: number;
  discount: number;
  cgst: number;
  sgst: number;
  total: number;
}
