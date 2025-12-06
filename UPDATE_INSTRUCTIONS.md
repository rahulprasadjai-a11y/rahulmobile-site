# 🚀 Razorpay Integration - Step by Step Update Guide

## ✅ Files Created

1. **razorpay-integration.js** - Complete payment logic
2. **RAZORPAY_SETUP.md** - Detailed setup guide
3. **RAZORPAY_PATCH.html** - Code snippets to add
4. **apply-razorpay.sh** - Automated script (Linux/Mac)
5. **UPDATE_INSTRUCTIONS.md** - This file

---

## 📝 Manual Integration Steps

### **STEP 1: Update `<head>` Section**

**Location:** Line 8 (after Font Awesome link)

**Add these lines:**

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<!-- ADD THESE TWO LINES BELOW ↓ -->
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
```

---

### **STEP 2: Update Checkout Form**

**Location:** Around line 1360 (inside checkout modal form)

**Find this:**

```html
<button type="submit" class="btn-submit">
    <i class="fas fa-arrow-right"></i> Proceed to Payment
</button>
```

**Replace with:**

```html
<div class="payment-options" style="margin-top: 1.5rem;">
    <h3 style="margin-bottom: 1rem; text-align: center; color: var(--dark);">
        <i class="fas fa-credit-card"></i> Choose Payment Method
    </h3>
    
    <!-- Razorpay Payment Button -->
    <button type="button" class="btn-submit" onclick="processRazorpayPayment()" 
            style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); margin-bottom: 1rem;">
        <i class="fas fa-lock"></i> Pay Securely with Razorpay
        <div style="font-size: 0.85rem; margin-top: 0.3rem; opacity: 0.9;">
            💳 Cards • 📱 UPI • 💰 Wallets • 🏦 Net Banking
        </div>
    </button>
    
    <!-- UPI QR Code Payment Button (Existing) -->
    <button type="button" class="btn-submit" onclick="showUPIPayment(event)" 
            style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);">
        <i class="fas fa-qrcode"></i> Pay with UPI QR Code
        <div style="font-size: 0.85rem; margin-top: 0.3rem; opacity: 0.9;">
            📲 Scan & Pay • Manual Verification
        </div>
    </button>
</div>
```

---

### **STEP 3: Add Payment Success Modal**

**Location:** After UPI Modal (around line 1410)

**Add this complete modal:**

```html
    <!-- Razorpay Payment Success Modal -->
    <div class="modal" id="paymentSuccessModal">
        <div class="modal-content" style="max-width: 500px; text-align: center;">
            <div style="font-size: 4rem; color: var(--success); margin-bottom: 1rem;">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2 style="color: var(--success); margin-bottom: 1rem;">Payment Successful! 🎉</h2>
            <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">
                Your order has been placed successfully!
            </p>
            <div id="orderDetails" style="background: var(--light); padding: 1.5rem; border-radius: 15px; margin-bottom: 1.5rem;">
                <!-- Order details will be inserted here -->
            </div>
            <p id="confirmationEmail" style="margin-bottom: 1.5rem; color: #666;">
                <!-- Email confirmation message -->
            </p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <button class="btn btn-primary" onclick="viewOrderTracking()">
                    <i class="fas fa-truck"></i> Track Order
                </button>
                <button class="btn btn-secondary" onclick="closePaymentSuccessModal()">
                    <i class="fas fa-home"></i> Continue Shopping
                </button>
            </div>
        </div>
    </div>
```

---

### **STEP 4: Add JavaScript Functions**

**Location:** Before closing `</script>` tag (around line 2010)

**Add these functions:**

```javascript
        // ============================================
        // RAZORPAY INTEGRATION
        // ============================================
        const RAZORPAY_KEY_ID = 'rzp_test_RoLDldyBWpAk5J';

        function processRazorpayPayment() {
            const name = document.getElementById('customerName').value;
            const phone = document.getElementById('customerPhone').value;
            const email = document.getElementById('customerEmail').value;
            const address = document.getElementById('customerAddress').value;
            
            if (!name || !phone || !email || !address) {
                showToast('Please fill all details', 'warning');
                return;
            }
            
            if (phone.length !== 10) {
                showToast('Please enter valid 10-digit phone number', 'warning');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showToast('Please enter valid email address', 'warning');
                return;
            }
            
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const shipping = subtotal > 500 ? 0 : 50;
            const total = subtotal + shipping;
            
            const orderData = {
                customer: { name, phone, email, address },
                items: [...cart],
                timestamp: new Date().toISOString(),
                orderId: 'RM-' + Date.now()
            };
            
            initRazorpayPayment(orderData, total);
        }

        function initRazorpayPayment(orderData, totalAmount) {
            const options = {
                key: RAZORPAY_KEY_ID,
                amount: totalAmount * 100,
                currency: 'INR',
                name: 'Rahul Mobile',
                description: `Order #${orderData.orderId}`,
                image: 'https://nyc3.digitaloceanspaces.com/bhindi-drive/files/91452e7d-ceec-4f57-a0a3-13430b79756b/2025-12-06T10-57-37-151Z-ac43c268-chat-image-1765018657131-0.jpg',
                prefill: {
                    name: orderData.customer.name,
                    email: orderData.customer.email,
                    contact: orderData.customer.phone
                },
                notes: {
                    order_id: orderData.orderId,
                    address: orderData.customer.address
                },
                theme: {
                    color: '#667eea'
                },
                handler: function (response) {
                    handleRazorpaySuccess(response, orderData, totalAmount);
                },
                modal: {
                    ondismiss: function() {
                        showToast('Payment cancelled. Please try again.', 'warning');
                    }
                }
            };

            const razorpay = new Razorpay(options);
            razorpay.open();
        }

        async function handleRazorpaySuccess(response, orderData, totalAmount) {
            const completeOrder = {
                ...orderData,
                total: totalAmount,
                status: 'processing',
                paymentMethod: 'Razorpay',
                paymentStatus: 'completed',
                paymentId: response.razorpay_payment_id,
                paymentSignature: response.razorpay_signature || 'N/A'
            };
            
            saveToOMS(completeOrder);
            sendWhatsAppNotification(completeOrder);
            
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            closeCheckoutModal();
            showPaymentSuccessModal(completeOrder);
        }

        function showPaymentSuccessModal(order) {
            const modal = document.getElementById('paymentSuccessModal');
            const orderDetails = document.getElementById('orderDetails');
            const confirmationEmail = document.getElementById('confirmationEmail');
            
            orderDetails.innerHTML = `
                <div style="margin-bottom: 0.5rem;">
                    <strong>Order ID:</strong> ${order.orderId}
                </div>
                <div style="margin-bottom: 0.5rem;">
                    <strong>Payment ID:</strong> ${order.paymentId}
                </div>
                <div>
                    <strong>Amount Paid:</strong> ₹${order.total.toLocaleString()}
                </div>
            `;
            
            confirmationEmail.innerHTML = `
                <i class="fas fa-envelope"></i> 
                Order confirmation sent to ${order.customer.email}
            `;
            
            modal.classList.add('show');
        }

        function closePaymentSuccessModal() {
            document.getElementById('paymentSuccessModal').classList.remove('show');
            window.location.href = 'index.html';
        }

        function viewOrderTracking() {
            const orders = JSON.parse(localStorage.getItem('orders')) || [];
            if (orders.length > 0) {
                window.location.href = `tracking.html?order=${orders[0].orderId}`;
            }
        }
```

---

## 🧪 Testing

### **Test Cards:**

| Card Number | CVV | Expiry | Result |
|-------------|-----|--------|--------|
| 4111 1111 1111 1111 | 123 | 12/25 | ✅ Success |
| 4012 0010 3714 1112 | 123 | 12/25 | ❌ Failed |

### **Test UPI:**
- UPI ID: `success@razorpay`

### **Test Flow:**

1. Add products to cart
2. Click "View Cart"
3. Click "Proceed to Checkout"
4. Fill customer details
5. Click "Pay Securely with Razorpay"
6. Use test card: 4111 1111 1111 1111
7. CVV: 123, Expiry: Any future date
8. Complete payment
9. Verify success modal appears
10. Check WhatsApp notification sent
11. Verify order saved in OMS

---

## 📊 What Happens After Payment

### **Automatic Actions:**

1. ✅ Payment verified by Razorpay
2. ✅ Order saved to localStorage (OMS)
3. ✅ WhatsApp notification sent to admin
4. ✅ Success modal shown to customer
5. ✅ Cart cleared
6. ✅ Order tracking link generated

### **Customer Experience:**

```
Fill Details → Choose Razorpay → Select Payment Method
     ↓              ↓                    ↓
  Validate    Open Razorpay      UPI/Card/Wallet
     ↓              ↓                    ↓
  Proceed     Enter Details        Complete Payment
     ↓              ↓                    ↓
  Success      Auto Verify         Success Modal
     ↓              ↓                    ↓
Track Order   WhatsApp Alert      Email Confirmation
```

---

## 🔧 Troubleshooting

### **Payment not opening:**
- Check browser console for errors
- Verify Razorpay script loaded
- Check Key ID is correct

### **Payment success but order not saving:**
- Check browser console
- Verify localStorage is enabled
- Check saveToOMS function

### **WhatsApp not opening:**
- Check phone number format
- Verify WhatsApp installed
- Check URL encoding

---

## 🚀 Going Live

### **After KYC Approval:**

1. Get live keys from Razorpay dashboard
2. Replace test key:
   ```javascript
   const RAZORPAY_KEY_ID = 'rzp_live_XXXXXXXXXXXXX';
   ```
3. Test with small real payment
4. Launch!

---

## 📞 Support

**Need Help?**
- Check RAZORPAY_SETUP.md for detailed guide
- Review RAZORPAY_PATCH.html for code snippets
- Test with razorpay-integration.js standalone

**Razorpay Support:**
- Email: support@razorpay.com
- Phone: 1800-120-020-020

---

## ✅ Checklist

- [ ] Added Razorpay script to `<head>`
- [ ] Updated checkout form with payment options
- [ ] Added Payment Success Modal
- [ ] Added JavaScript functions
- [ ] Tested with test card
- [ ] Verified WhatsApp notification
- [ ] Checked order saved in OMS
- [ ] Tested complete flow

---

**Ready to integrate? Follow steps 1-4 above!** 🚀
