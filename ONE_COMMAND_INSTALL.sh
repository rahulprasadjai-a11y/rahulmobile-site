#!/bin/bash

# ============================================
# ONE COMMAND RAZORPAY INSTALLATION
# ============================================
# Run this: bash ONE_COMMAND_INSTALL.sh
# ============================================

echo "🚀 RAZORPAY INTEGRATION - ONE COMMAND INSTALL"
echo "=============================================="
echo ""

# Check if index.html exists
if [ ! -f "index.html" ]; then
    echo "❌ Error: index.html not found in current directory!"
    echo "📁 Please run this script from your website root folder"
    exit 1
fi

# Create backup
echo "📦 Creating backup..."
cp index.html index.html.backup.$(date +%Y%m%d_%H%M%S)
echo "✅ Backup created!"

# Step 1: Add Razorpay scripts to <head>
echo "📝 Adding Razorpay scripts..."
sed -i.tmp '/<link rel="stylesheet" href="https:\/\/cdnjs.cloudflare.com\/ajax\/libs\/font-awesome\/6.4.0\/css\/all.min.css">/a\    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>\n    <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>' index.html
rm -f index.html.tmp
echo "✅ Scripts added!"

# Step 2: Create temporary files for complex replacements
echo "📝 Updating checkout button..."

# Create payment buttons HTML
cat > /tmp/payment_buttons.html << 'EOF'
<div class="payment-options" style="margin-top: 1.5rem;">
                <h3 style="margin-bottom: 1rem; text-align: center; color: var(--dark);">
                    <i class="fas fa-credit-card"></i> Choose Payment Method
                </h3>
                
                <button type="button" class="btn-submit" onclick="processRazorpayPayment()" 
                        style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); margin-bottom: 1rem;">
                    <i class="fas fa-lock"></i> Pay Securely with Razorpay
                    <div style="font-size: 0.85rem; margin-top: 0.3rem; opacity: 0.9;">
                        💳 Cards • 📱 UPI • 💰 Wallets • 🏦 Net Banking
                    </div>
                </button>
                
                <button type="button" class="btn-submit" onclick="showUPIPayment(event)" 
                        style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);">
                    <i class="fas fa-qrcode"></i> Pay with UPI QR Code
                    <div style="font-size: 0.85rem; margin-top: 0.3rem; opacity: 0.9;">
                        📲 Scan & Pay • Manual Verification
                    </div>
                </button>
            </div>
EOF

# Replace checkout button (using perl for multi-line replacement)
perl -i.bak -0pe 's/<button type="submit" class="btn-submit">\s*<i class="fas fa-arrow-right"><\/i> Proceed to Payment\s*<\/button>/`cat \/tmp\/payment_buttons.html`/se' index.html
rm -f index.html.bak
echo "✅ Checkout button updated!"

# Step 3: Add Payment Success Modal
echo "📝 Adding Payment Success Modal..."
cat > /tmp/success_modal.html << 'EOF'

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
            <div id="orderDetails" style="background: var(--light); padding: 1.5rem; border-radius: 15px; margin-bottom: 1.5rem;"></div>
            <p id="confirmationEmail" style="margin-bottom: 1.5rem; color: #666;"></p>
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
EOF

# Find UPI modal end and add success modal after it
sed -i.tmp '/<!-- UPI Payment Modal -->/,/<\/div>$/{ 
    /<\/div>$/a\
'"$(cat /tmp/success_modal.html)"'
}' index.html
rm -f index.html.tmp
echo "✅ Success modal added!"

# Step 4: Add Razorpay JavaScript functions
echo "📝 Adding Razorpay functions..."
cat > /tmp/razorpay_functions.js << 'EOF'

        // RAZORPAY INTEGRATION
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
                <div style="margin-bottom: 0.5rem;"><strong>Order ID:</strong> ${order.orderId}</div>
                <div style="margin-bottom: 0.5rem;"><strong>Payment ID:</strong> ${order.paymentId}</div>
                <div><strong>Amount Paid:</strong> ₹${order.total.toLocaleString()}</div>
            `;
            
            confirmationEmail.innerHTML = `<i class="fas fa-envelope"></i> Order confirmation sent to ${order.customer.email}`;
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
EOF

# Add functions before closing script tag
sed -i.tmp '/<\/script>$/i\
'"$(cat /tmp/razorpay_functions.js)"'' index.html
rm -f index.html.tmp
echo "✅ Razorpay functions added!"

# Cleanup temp files
rm -f /tmp/payment_buttons.html /tmp/success_modal.html /tmp/razorpay_functions.js

echo ""
echo "=============================================="
echo "🎉 RAZORPAY INTEGRATION COMPLETE!"
echo "=============================================="
echo ""
echo "✅ What was done:"
echo "  • Added Razorpay checkout script"
echo "  • Updated checkout form with payment options"
echo "  • Added Payment Success Modal"
echo "  • Added all Razorpay JavaScript functions"
echo "  • Created timestamped backup"
echo ""
echo "🧪 Test with:"
echo "  Card: 4111 1111 1111 1111"
echo "  CVV: 123"
echo "  Expiry: 12/25"
echo ""
echo "🚀 Your website is now ready for payments!"
echo "=============================================="
