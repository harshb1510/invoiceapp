import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { InvoiceData } from '../types/invoice';

const InvoicePDF = async (invoiceData: InvoiceData) => {
  const html = `
    <html>
      <head>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
            padding: 30px;
            color: #333;
            font-size: 12px;
            line-height: 1.3;
          }
          .container {
            max-width: 100%;
            margin: 0 auto;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 20px;
          }
          .logo {
            width: 120px;
            height: auto;
          }
          .invoice-info {
            text-align: right;
            font-size: 12px;
          }
          .invoice-info p {
            margin: 2px 0;
          }
          .billing-section {
            display: flex;
            justify-content: space-between;
            margin-bottom: 15px;
            gap: 20px;
          }
          .billing-box {
            background-color: #f5f9f5;
            padding: 12px;
            width: 48%;
            border-radius: 4px;
          }
          .billing-title {
            color: #2e7d32;
            font-weight: bold;
            margin-bottom: 5px;
            font-size: 13px;
          }
          .billing-box p {
            margin: 3px 0;
          }
          .items-table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
            font-size: 10px;
          }
          .items-table th {
            background-color: #2e7d32;
            color: white;
            padding: 6px 4px;
            text-align: left;
            white-space: nowrap;
          }
          .items-table td {
            padding: 4px;
            border-bottom: 1px solid #eee;
          }
          .items-table tr:nth-child(even) {
            background-color: #f9f9f9;
          }
          .lower-section {
            display: flex;
            justify-content: space-between;
            margin-top: 15px;
            gap: 20px;
          }
          .bank-qr-section {
            width: 60%;
            display: flex;
            gap: 15px;
          }
          .bank-details {
            flex: 1;
          }
          .qr-code {
            width: 100px;
            height: 100px;
            padding: 5px;
            border: 1px solid #ddd;
          }
          .totals-section {
            width: 35%;
          }
          .totals {
            width: 100%;
            margin-bottom: 10px;
          }
          .totals tr td {
            padding: 3px 0;
          }
          .totals tr td:last-child {
            text-align: right;
          }
          .total-row {
            font-weight: bold;
            border-top: 1px solid #2e7d32;
            font-size: 13px;
          }
          .terms {
            margin-top: 15px;
            font-size: 10px;
            color: #666;
          }
          .terms p {
            margin: 2px 0;
          }
          .section-title {
            color: #2e7d32;
            font-weight: bold;
            margin-bottom: 5px;
            font-size: 12px;
          }
          .amount-words {
            font-size: 11px;
            color: #666;
            margin-top: 5px;
          }
          .place-supply {
            display: flex;
            justify-content: space-between;
            margin: 5px 0;
            font-size: 11px;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img class="logo" src="YOUR_LOGO_URL" alt="Logo"/>
            <div class="invoice-info">
              <p><strong>Invoice #:</strong> ${invoiceData.invoiceNumber}</p>
              <p><strong>Invoice Date:</strong> ${invoiceData.date}</p>
              <p><strong>Due Date:</strong> ${invoiceData.dueDate}</p>
            </div>
          </div>

          <div class="billing-section">
            <div class="billing-box">
              <div class="billing-title">Billed by</div>
              <p><strong>${invoiceData.company.name}</strong></p>
              <p>${invoiceData.company.address}</p>
              <p><strong>GSTIN:</strong> ${invoiceData.company.gstin}</p>
              <p><strong>PAN:</strong> ${invoiceData.company.pan}</p>
            </div>
            <div class="billing-box">
              <div class="billing-title">Billed to</div>
              <p><strong>${invoiceData.client.name}</strong></p>
              <p>${invoiceData.client.address}</p>
              <p><strong>GSTIN:</strong> ${invoiceData.client.gstin}</p>
              <p><strong>PAN:</strong> ${invoiceData.client.pan}</p>
            </div>
          </div>

          <div class="place-supply">
            <span>Place of Supply: Karnataka</span>
            <span>Country of Supply: India</span>
          </div>

          <table class="items-table">
            <tr>
              <th style="width: 30%">Item Description</th>
              <th style="width: 7%">HSN</th>
              <th style="width: 7%">Qty</th>
              <th style="width: 7%">GST</th>
              <th style="width: 13%">Amount</th>
              <th style="width: 12%">SGST</th>
              <th style="width: 12%">CGST</th>
              <th style="width: 12%">Total</th>
            </tr>
            ${invoiceData.items.map(item => `
              <tr>
                <td>${item.description}</td>
                <td>${item.hsn}</td>
                <td>${item.qty}</td>
                <td>${item.gst}%</td>
                <td>₹${item.amount.toLocaleString()}</td>
                <td>₹${(item.amount * item.gst / 200).toLocaleString()}</td>
                <td>₹${(item.amount * item.gst / 200).toLocaleString()}</td>
                <td>₹${(item.amount * (1 + item.gst / 100)).toLocaleString()}</td>
              </tr>
            `).join('')}
          </table>

          <div class="lower-section">
            <div class="bank-qr-section">
              <div class="bank-details">
                <div class="section-title">Bank & Payment Details</div>
                <p><strong>Account Name:</strong> ${invoiceData.bankDetails.accountName}</p>
                <p><strong>Account Number:</strong> ${invoiceData.bankDetails.accountNumber}</p>
                <p><strong>IFSC:</strong> ${invoiceData.bankDetails.ifsc}</p>
                <p><strong>Bank:</strong> ${invoiceData.bankDetails.bankName}</p>
                <p><strong>UPI:</strong> ${invoiceData.bankDetails.upi}</p>
              </div>
              <div>
                <img class="qr-code" src="YOUR_QR_CODE_URL" alt="QR Code"/>
              </div>
            </div>
            
            <div class="totals-section">
              <table class="totals">
                <tr>
                  <td>Sub Total:</td>
                  <td>₹${invoiceData.subTotal.toLocaleString()}</td>
                </tr>
                <tr>
                  <td>Discount (10%):</td>
                  <td>-₹${invoiceData.discount.toLocaleString()}</td>
                </tr>
                <tr>
                  <td>CGST:</td>
                  <td>₹${invoiceData.cgst.toLocaleString()}</td>
                </tr>
                <tr>
                  <td>SGST:</td>
                  <td>₹${invoiceData.sgst.toLocaleString()}</td>
                </tr>
                <tr class="total-row">
                  <td>Total:</td>
                  <td>₹${invoiceData.total.toLocaleString()}</td>
                </tr>
              </table>
              <div class="amount-words">
                Amount in words: ${invoiceData.total.toLocaleString()} Rupees Only
              </div>
            </div>
          </div>

          <div class="terms">
            <div class="section-title">Terms and Conditions</div>
            <p>1. Please pay within 15 days from the date of invoice, overdue interest @ 14% will be charged on delayed payments.</p>
            <p>2. Please quote invoice number when remitting funds.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const options = {
    html,
    fileName: `invoice_${invoiceData.invoiceNumber}`,
    directory: 'Documents',
    height: 842,
    width: 595,
    padding: 0,
  };

  return await RNHTMLtoPDF.convert(options);
};

export default InvoicePDF;