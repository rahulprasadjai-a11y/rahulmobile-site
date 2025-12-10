# 📊 GOOGLE SHEETS AUTOMATION - COMPLETE SETUP GUIDE

## 🎯 Overview
This guide will help you set up automatic order tracking in Google Sheets for RAHUL MOBILE website.

---

## 📋 STEP 1: Create Google Sheet

1. Go to: https://sheets.google.com
2. Click **"+ Blank"** to create new spreadsheet
3. Rename it to: **"RAHUL MOBILE - Orders Database"**

---

## 📊 STEP 2: Setup Sheet Structure

### Sheet 1: Orders

Add these headers in **Row 1** (A1 to P1):

| A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Order ID | Date | Time | Customer Name | Phone | Email | Payment ID | Payment Method | Items | Quantity | Subtotal | Discount | GST (18%) | Total | Status | Invoice Link |

**Formatting Tips:**
- Make Row 1 **Bold**
- Add **Background Color** (Light Purple: #E9D5FF)
- **Freeze Row 1**: View → Freeze → 1 row
- Set **Column Widths**:
  - Order ID: 150px
  - Date/Time: 100px each
  - Customer Name: 150px
  - Phone/Email: 150px each
  - Payment ID: 180px
  - Items: 300px
  - Others: Auto

---

## 🔧 STEP 3: Google Apps Script Setup

### 3.1 Open Script Editor

1. In your Google Sheet, click **Extensions → Apps Script**
2. Delete any existing code
3. Copy and paste the complete script below

### 3.2 Apps Script Code

```javascript
// RAHUL MOBILE - Order Automation Script
// Version 1.0

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Orders');
    
    // If Orders sheet doesn't exist, create it
    if (!sheet) {
      const newSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Orders');
      newSheet.appendRow([
        'Order ID', 'Date', 'Time', 'Customer Name', 'Phone', 'Email',
        'Payment ID', 'Payment Method', 'Items', 'Quantity', 'Subtotal',
        'Discount', 'GST (18%)', 'Total', 'Status', 'Invoice Link'
      ]);
      return doPost(e); // Retry
    }
    
    const data = JSON.parse(e.postData.contents);
    
    // Generate Order ID
    const orderId = 'RM' + new Date().getTime();
    
    // Get current date and time (IST)
    const now = new Date();
    const date = Utilities.formatDate(now, 'Asia/Kolkata', 'dd-MM-yyyy');
    const time = Utilities.formatDate(now, 'Asia/Kolkata', 'HH:mm:ss');
    
    // Prepare items string
    const itemsStr = data.items.map(item => 
      `${item.name} (${item.quantity}x)`
    ).join(', ');
    
    const totalQty = data.items.reduce((sum, item) => sum + item.quantity, 0);
    
    // Calculate GST (18%)
    const subtotal = data.total;
    const gst = Math.round(subtotal * 0.18);
    const grandTotal = subtotal + gst;
    
    // Generate invoice link
    const invoiceLink = generateInvoiceLink(orderId, data, subtotal, gst, grandTotal);
    
    // Add row to sheet
    sheet.appendRow([
      orderId,
      date,
      time,
      data.customerName || 'Guest Customer',
      data.customerPhone || 'N/A',
      data.customerEmail || 'N/A',
      data.paymentId,
      data.paymentMethod || 'Razorpay',
      itemsStr,
      totalQty,
      subtotal,
      data.discount || 0,
      gst,
      grandTotal,
      'Paid',
      invoiceLink
    ]);
    
    // Format the new row
    const lastRow = sheet.getLastRow();
    const range = sheet.getRange(lastRow, 1, 1, 16);
    range.setFontSize(10);
    range.setBorder(true, true, true, true, true, true);
    
    // Send confirmation email (if email provided)
    if (data.customerEmail && data.customerEmail !== 'N/A') {
      sendConfirmationEmail(data.customerEmail, orderId, invoiceLink, data);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      orderId: orderId,
      invoiceLink: invoiceLink,
      message: 'Order saved successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function generateInvoiceLink(orderId, data, subtotal, gst, grandTotal) {
  const baseUrl = 'https://rahulprasadjai-a11y.github.io/rahulmobile-site/invoice-template.html';
  
  const params = {
    invoiceNumber: orderId,
    invoiceDate: Utilities.formatDate(new Date(), 'Asia/Kolkata', 'dd MMM yyyy'),
    customerName: data.customerName || 'Customer',
    customerAddress: data.customerAddress || 'N/A',
    paymentId: data.paymentId,
    paymentMethod: data.paymentMethod || 'Razorpay',
    paymentDate: Utilities.formatDate(new Date(), 'Asia/Kolkata', 'dd MMM yyyy, hh:mm a'),
    items: JSON.stringify(data.items),
    subtotal: subtotal,
    discount: data.discount || 0,
    gst: gst,
    grandTotal: grandTotal
  };
  
  const queryString = Object.keys(params)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
    .join('&');
  
  return baseUrl + '?' + queryString;
}

function sendConfirmationEmail(email, orderId, invoiceLink, data) {
  try {
    const subject = `✅ Order Confirmation - ${orderId} | RAHUL MOBILE`;
    
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">RAHUL MOBILE</h1>
          <p style="color: white; margin: 10px 0 0 0;">Your Trusted Mobile Partner</p>
        </div>
        
        <div style="padding: 30px; background: #f9fafb;">
          <h2 style="color: #1a1a1a;">Thank You for Your Order! 🎉</h2>
          <p style="color: #666; line-height: 1.6;">
            Your order has been confirmed and will be processed shortly.
          </p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #8b5cf6; margin-top: 0;">Order Details</h3>
            <p style="margin: 5px 0;"><strong>Order ID:</strong> ${orderId}</p>
            <p style="margin: 5px 0;"><strong>Payment ID:</strong> ${data.paymentId}</p>
            <p style="margin: 5px 0;"><strong>Date:</strong> ${Utilities.formatDate(new Date(), 'Asia/Kolkata', 'dd MMM yyyy, hh:mm a')}</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${invoiceLink}" 
               style="display: inline-block; background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); 
                      color: white; padding: 15px 40px; text-decoration: none; border-radius: 5px; 
                      font-weight: 600;">
              📄 View Invoice
            </a>
          </div>
          
          <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <p style="margin: 0; color: #78350f; font-size: 14px;">
              <strong>📞 Need Help?</strong><br>
              Contact us at +91 8764719889 or limaxdistributor@gmail.com
            </p>
          </div>
        </div>
        
        <div style="background: #1a1a1a; padding: 20px; text-align: center;">
          <p style="color: #999; margin: 0; font-size: 12px;">
            © 2025 RAHUL MOBILE | Vivekanand Colony, Dausa, Rajasthan
          </p>
        </div>
      </div>
    `;
    
    MailApp.sendEmail({
      to: email,
      subject: subject,
      htmlBody: htmlBody
    });
    
    Logger.log('Email sent to: ' + email);
  } catch (error) {
    Logger.log('Email error: ' + error.toString());
  }
}

function doGet(e) {
  return ContentService.createTextOutput(
    'RAHUL MOBILE Order API is running! ✅'
  );
}

// Test function (optional)
function testOrderCreation() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        paymentId: 'TEST_' + new Date().getTime(),
        paymentMethod: 'Test Payment',
        customerName: 'Test Customer',
        customerPhone: '+91 9876543210',
        customerEmail: 'test@example.com',
        customerAddress: 'Test Address, Dausa',
        items: [
          { name: 'iPhone 15 Pro Max', quantity: 1, price: 134900 },
          { name: 'Samsung Galaxy S24', quantity: 1, price: 124999 }
        ],
        total: 259899,
        discount: 0
      })
    }
  };
  
  const result = doPost(testData);
  Logger.log(result.getContent());
}
```

### 3.3 Save and Deploy

1. Click **💾 Save** (or Ctrl+S)
2. Name your project: **"RAHUL MOBILE Order API"**
3. Click **Deploy → New Deployment**
4. Click **⚙️ Settings icon** → Select **"Web app"**
5. Configure:
   - **Description:** "Order tracking API"
   - **Execute as:** Me (your email)
   - **Who has access:** Anyone
6. Click **Deploy**
7. **Authorize** the script (click "Review Permissions" → Select your account → Allow)
8. **Copy the Web App URL** (looks like: `https://script.google.com/macros/s/AKfycby.../exec`)

---

## 🌐 STEP 4: Update Website Code

### 4.1 Update order-automation.js

1. Open: https://github.com/rahulprasadjai-a11y/rahulmobile-site/blob/main/order-automation.js
2. Click **Edit** (pencil icon)
3. Find line 3:
   ```javascript
   const GOOGLE_SHEETS_API_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
   ```
4. Replace with your Web App URL:
   ```javascript
   const GOOGLE_SHEETS_API_URL = 'https://script.google.com/macros/s/AKfycby.../exec';
   ```
5. **Commit changes**

### 4.2 Add Script to index.html

Add this line in `index.html` before `</body>`:

```html
<script src="order-automation.js"></script>
```

### 4.3 Update Checkout Functions

Replace existing checkout functions with:

```javascript
// Use the new functions from order-automation.js
function checkoutRazorpay() {
    checkoutRazorpayWithSheets();
}

function checkoutWhatsApp() {
    checkoutWhatsAppWithSheets();
}
```

---

## ✅ STEP 5: Testing

### 5.1 Test in Apps Script

1. In Apps Script editor, select **testOrderCreation** function
2. Click **▶️ Run**
3. Check your Google Sheet - a test order should appear

### 5.2 Test on Website

1. Go to your website
2. Add items to cart
3. Click **"Pay Online with Razorpay"** or **"Order via WhatsApp"**
4. Complete the test payment
5. Check Google Sheet - order should be saved automatically

---

## 📊 STEP 6: Additional Features (Optional)

### 6.1 Create Dashboard Sheet

Add a new sheet called **"Dashboard"** with:

```
=QUERY(Orders!A:P, "SELECT A, D, N, O WHERE O='Paid' ORDER BY A DESC LIMIT 10")
```

### 6.2 Add Charts

1. **Total Sales Chart:**
   - Insert → Chart
   - Data range: `Orders!B:N`
   - Chart type: Line chart

2. **Top Products:**
   - Insert → Chart
   - Data range: `Orders!I:I`
   - Chart type: Pie chart

### 6.3 Conditional Formatting

1. Select column O (Status)
2. Format → Conditional formatting
3. Format rules:
   - If text contains "Paid" → Green background
   - If text contains "Pending" → Yellow background
   - If text contains "Failed" → Red background

---

## 🔒 STEP 7: Security & Permissions

### 7.1 Protect Sheet

1. Right-click on "Orders" sheet tab
2. **Protect sheet**
3. Set permissions: Only you can edit

### 7.2 Share with Team (Optional)

1. Click **Share** button
2. Add team member emails
3. Set permission: **Viewer** or **Editor**

---

## 📱 STEP 8: Mobile Access

### Install Google Sheets App

1. Download **Google Sheets** app (iOS/Android)
2. Open your spreadsheet
3. Enable **Notifications** for real-time updates

---

## 🎯 What Happens Now?

### When Customer Places Order:

1. ✅ Payment processed via Razorpay
2. ✅ Order automatically saved to Google Sheets
3. ✅ Invoice generated and opened in new tab
4. ✅ WhatsApp confirmation sent
5. ✅ Email confirmation sent (if email provided)
6. ✅ You get real-time notification on mobile

---

## 🆘 Troubleshooting

### Orders Not Saving?

1. Check Web App URL is correct in `order-automation.js`
2. Verify Apps Script is deployed as "Anyone" access
3. Check browser console for errors (F12)
4. Test using `testOrderCreation()` function

### Email Not Sending?

1. Check customer email is provided
2. Verify Gmail sending limits (500 emails/day)
3. Check spam folder

### Invoice Not Opening?

1. Check popup blocker settings
2. Verify invoice-template.html is accessible
3. Test invoice URL directly

---

## 📞 Support

For any issues:
- 📧 Email: limaxdistributor@gmail.com
- 📱 Phone: +91 8764719889

---

## 🎉 You're All Set!

Your RAHUL MOBILE website now has:
- ✅ Automatic order tracking
- ✅ Professional invoices
- ✅ Email confirmations
- ✅ WhatsApp integration
- ✅ Real-time Google Sheets updates

**Happy Selling! 🚀**
