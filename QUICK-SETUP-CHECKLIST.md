# ✅ QUICK SETUP CHECKLIST - RAHUL MOBILE

## 📋 Invoice & Google Sheets Automation

---

## 🎯 PART 1: INVOICE TEMPLATE (✅ DONE)

- ✅ Invoice template created: `invoice-template.html`
- ✅ Professional design with RAHUL MOBILE branding
- ✅ Auto-populates from URL parameters
- ✅ Print-ready format
- ✅ Mobile responsive

**Live URL:** https://rahulprasadjai-a11y.github.io/rahulmobile-site/invoice-template.html

---

## 📊 PART 2: GOOGLE SHEETS AUTOMATION (⏳ PENDING)

### Step 1: Create Google Sheet ⬜

- [ ] Go to https://sheets.google.com
- [ ] Create new spreadsheet
- [ ] Name: "RAHUL MOBILE - Orders Database"
- [ ] Add headers in Row 1:
  ```
  Order ID | Date | Time | Customer Name | Phone | Email | 
  Payment ID | Payment Method | Items | Quantity | Subtotal | 
  Discount | GST (18%) | Total | Status | Invoice Link
  ```

### Step 2: Setup Apps Script ⬜

- [ ] Open: Extensions → Apps Script
- [ ] Copy code from: `GOOGLE-SHEETS-SETUP-GUIDE.md` (Section 3.2)
- [ ] Paste in Apps Script editor
- [ ] Save project as: "RAHUL MOBILE Order API"

### Step 3: Deploy Web App ⬜

- [ ] Click: Deploy → New Deployment
- [ ] Select type: Web app
- [ ] Execute as: Me
- [ ] Who has access: Anyone
- [ ] Click Deploy
- [ ] Authorize permissions
- [ ] **COPY WEB APP URL** ← IMPORTANT!

### Step 4: Update Website Code ⬜

- [ ] Open: `order-automation.js`
- [ ] Find line 3: `const GOOGLE_SHEETS_API_URL = '...'`
- [ ] Replace with your Web App URL
- [ ] Save changes

### Step 5: Add Script to Website ⬜

- [ ] Open: `index.html`
- [ ] Add before `</body>`:
  ```html
  <script src="order-automation.js"></script>
  ```
- [ ] Update checkout functions to use new integration

### Step 6: Test Everything ⬜

- [ ] Test in Apps Script: Run `testOrderCreation()`
- [ ] Check Google Sheet for test order
- [ ] Test on website with real payment
- [ ] Verify order appears in sheet
- [ ] Check invoice generation
- [ ] Verify email confirmation

---

## 🔑 IMPORTANT URLS TO SAVE

### Your Files:
- Invoice Template: https://rahulprasadjai-a11y.github.io/rahulmobile-site/invoice-template.html
- Setup Guide: https://github.com/rahulprasadjai-a11y/rahulmobile-site/blob/main/GOOGLE-SHEETS-SETUP-GUIDE.md
- Automation Script: https://github.com/rahulprasadjai-a11y/rahulmobile-site/blob/main/order-automation.js

### Your Google Sheet:
- Sheet URL: _________________ (Fill after creating)
- Web App URL: _________________ (Fill after deploying)

---

## 🎯 WHAT YOU'LL GET

### After Setup:

✅ **Automatic Order Tracking**
- Every order saved to Google Sheets
- Real-time updates
- Mobile notifications

✅ **Professional Invoices**
- Auto-generated for each order
- Branded with RAHUL MOBILE logo
- Print-ready format

✅ **Email Confirmations**
- Sent automatically to customers
- Includes invoice link
- Professional HTML template

✅ **WhatsApp Integration**
- Order details sent via WhatsApp
- Customer can confirm delivery address
- Direct communication channel

---

## ⏱️ TIME REQUIRED

- **Invoice Template:** ✅ Already Done (0 minutes)
- **Google Sheet Setup:** 5 minutes
- **Apps Script Setup:** 10 minutes
- **Website Integration:** 5 minutes
- **Testing:** 5 minutes

**Total Time:** ~25 minutes

---

## 🆘 NEED HELP?

### Common Issues:

**Q: Orders not saving to sheet?**
- Check Web App URL is correct
- Verify "Anyone" access in deployment
- Check browser console for errors

**Q: Invoice not opening?**
- Disable popup blocker
- Check invoice URL is accessible
- Verify parameters are passed correctly

**Q: Email not sending?**
- Check customer email is provided
- Verify Gmail sending limits
- Check spam folder

### Contact:
- 📧 limaxdistributor@gmail.com
- 📱 +91 8764719889

---

## 📱 NEXT STEPS AFTER SETUP

### 1. Test Everything
- [ ] Place test order
- [ ] Verify sheet entry
- [ ] Check invoice
- [ ] Test email

### 2. Customize (Optional)
- [ ] Add your logo to invoice
- [ ] Customize email template
- [ ] Add more fields to sheet
- [ ] Create dashboard charts

### 3. Go Live
- [ ] Update Razorpay to Live mode
- [ ] Complete KYC
- [ ] Generate Live API keys
- [ ] Update website with Live keys

---

## 🎉 READY TO START?

Follow the detailed guide: `GOOGLE-SHEETS-SETUP-GUIDE.md`

**Let's make RAHUL MOBILE fully automated! 🚀**
