# 🚀 Razorpay Integration Setup Guide

## ✅ Current Status
- **Razorpay Account:** Active
- **Test Mode:** Ready to use
- **Test Key ID:** `rzp_test_RoLDldyBWpAk5J`
- **KYC Status:** Under process

## 📋 Integration Steps

### Step 1: Add Razorpay Script to index.html

Add this script tag in the `<head>` section of `index.html`:

```html
<!-- Razorpay Checkout -->
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>

<!-- Razorpay Integration Script -->
<script src="razorpay-integration.js"></script>
```

### Step 2: Update Checkout Button

In your checkout form, replace the current payment button with:

```html
<button type="button" class="btn btn-primary btn-block" onclick="processRazorpayPayment()">
    <i class="fas fa-lock"></i> Pay Securely with Razorpay
</button>
```

### Step 3: Add Payment Processing Function

Add this function to your main JavaScript:

```javascript
function processRazorpayPayment() {
    // Get customer details
    const name = document.getElementById('customerName').value;
    const phone = document.getElementById('customerPhone').value;
    const email = document.getElementById('customerEmail').value;
    const address = document.getElementById('customerAddress').value;
    
    // Validate
    if (!name || !phone || !email || !address) {
        showToast('Please fill all details', 'warning');
        return;
    }
    
    // Calculate total
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 500 ? 0 : 50;
    const total = subtotal + shipping;
    
    // Create order data
    const orderData = {
        customer: { name, phone, email, address },
        items: [...cart],
        timestamp: new Date().toISOString(),
        orderId: 'RM-' + Date.now()
    };
    
    // Initialize Razorpay payment
    initRazorpayPayment(orderData, total);
}
```

### Step 4: Update Configuration

In `razorpay-integration.js`, update these values:

```javascript
// Google Sheets URL (from your Apps Script deployment)
const GOOGLE_SHEETS_URL = 'YOUR_DEPLOYMENT_URL_HERE';

// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
```

## 🧪 Testing in Test Mode

### Test Cards

| Card Number | CVV | Expiry | Result |
|-------------|-----|--------|--------|
| 4111 1111 1111 1111 | 123 | Any future | ✅ Success |
| 4012 0010 3714 1112 | 123 | Any future | ❌ Failed |
| 5104 0600 0000 0008 | 123 | Any future | ✅ Success |

### Test UPI
- UPI ID: `success@razorpay`
- Result: ✅ Payment Success

### Test Wallets
- Select any wallet
- Use test credentials provided by Razorpay

## 🔄 Payment Flow

```
Customer fills checkout form
        ↓
Clicks "Pay with Razorpay"
        ↓
Razorpay payment page opens
        ↓
Customer completes payment
        ↓
AUTO: Payment verification
        ↓
AUTO: Order saved to OMS
        ↓
AUTO: Google Sheets updated
        ↓
AUTO: Email sent (customer + admin)
        ↓
AUTO: WhatsApp notification
        ↓
Success modal with tracking link
        ↓
Customer can track order
```

## 🎯 Features

### Customer Features
- ✅ Multiple payment options (UPI, Cards, Wallets, Net Banking)
- ✅ Secure payment gateway
- ✅ Auto payment verification
- ✅ Instant order confirmation
- ✅ Email receipt
- ✅ Order tracking link

### Admin Features
- ✅ Auto order notifications
- ✅ Payment ID tracking
- ✅ Auto Google Sheets sync
- ✅ WhatsApp alerts
- ✅ OMS dashboard

## 🔐 Security

- ✅ PCI DSS compliant
- ✅ Encrypted transactions
- ✅ Secure payment page
- ✅ No card details stored
- ✅ Payment signature verification

## 💰 Pricing

### Test Mode (Current)
- **Cost:** FREE
- **Limitations:** Only test payments
- **Duration:** Until KYC approved

### Live Mode (After KYC)
- **Transaction Fee:** 2% per transaction
- **No setup fee**
- **No monthly fee**
- **Instant settlements**

## 📱 Going Live

### After KYC Approval:

1. **Get Live Keys:**
   - Dashboard → Settings → API Keys
   - Generate Live Keys
   - Copy Key ID and Key Secret

2. **Update Code:**
   ```javascript
   const RAZORPAY_KEY_ID = 'rzp_live_XXXXXXXXXXXXX'; // Replace test key
   ```

3. **Test Live Payments:**
   - Make a small test transaction
   - Verify order flow
   - Check notifications

4. **Launch:**
   - Update website
   - Announce to customers
   - Start accepting payments!

## 🆘 Support

### Razorpay Support
- **Email:** support@razorpay.com
- **Phone:** 1800-120-020-020
- **Dashboard:** https://dashboard.razorpay.com/

### Common Issues

**Payment fails in test mode:**
- Use test cards provided above
- Check browser console for errors
- Verify Key ID is correct

**Order not saving:**
- Check browser console
- Verify localStorage is enabled
- Check Google Sheets URL

**Emails not sending:**
- Verify EmailJS configuration
- Check service ID and template ID
- Test EmailJS separately

## 📊 Next Steps

1. ✅ Add Razorpay script to index.html
2. ✅ Update checkout button
3. ✅ Add payment processing function
4. ✅ Update configuration values
5. ✅ Test with test cards
6. ⏳ Wait for KYC approval
7. 🚀 Switch to live mode
8. 🎉 Start accepting real payments!

## 🎊 Benefits

### Before Razorpay
- ❌ Manual payment verification
- ❌ Limited payment options (only UPI QR)
- ❌ Manual order confirmation
- ❌ No payment tracking

### After Razorpay
- ✅ Auto payment verification
- ✅ Multiple payment options
- ✅ Auto order confirmation
- ✅ Complete payment tracking
- ✅ Professional checkout experience
- ✅ Customer trust & confidence

---

**Ready to integrate? Follow the steps above!** 🚀
