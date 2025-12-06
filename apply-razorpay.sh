#!/bin/bash

# ============================================
# RAZORPAY INTEGRATION AUTO-APPLY SCRIPT
# ============================================
# This script automatically adds Razorpay integration to index.html

echo "🚀 Starting Razorpay Integration..."

# Backup original file
cp index.html index.html.backup
echo "✅ Backup created: index.html.backup"

# Step 1: Add Razorpay script to <head>
echo "📝 Adding Razorpay scripts to <head>..."
sed -i '/<link rel="stylesheet" href="https:\/\/cdnjs.cloudflare.com\/ajax\/libs\/font-awesome\/6.4.0\/css\/all.min.css">/a\    <!-- Razorpay Checkout -->\n    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>' index.html

# Step 2: Add payment success modal before closing </body>
echo "📝 Adding Payment Success Modal..."
sed -i '/<\/body>/i\    <!-- Razorpay Payment Success Modal -->\n    <div class="modal" id="paymentSuccessModal">\n        <div class="modal-content" style="max-width: 500px; text-align: center;">\n            <div style="font-size: 4rem; color: var(--success); margin-bottom: 1rem;">\n                <i class="fas fa-check-circle"></i>\n            </div>\n            <h2 style="color: var(--success); margin-bottom: 1rem;">Payment Successful! 🎉</h2>\n            <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">\n                Your order has been placed successfully!\n            </p>\n            <div id="orderDetails" style="background: var(--light); padding: 1.5rem; border-radius: 15px; margin-bottom: 1.5rem;">\n            </div>\n            <p id="confirmationEmail" style="margin-bottom: 1.5rem; color: #666;">\n            </p>\n            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">\n                <button class="btn btn-primary" onclick="viewOrderTracking()">\n                    <i class="fas fa-truck"></i> Track Order\n                </button>\n                <button class="btn btn-secondary" onclick="closePaymentSuccessModal()">\n                    <i class="fas fa-home"></i> Continue Shopping\n                </button>\n            </div>\n        </div>\n    </div>' index.html

# Step 3: Add Razorpay JavaScript functions
echo "📝 Adding Razorpay JavaScript functions..."
cat >> razorpay-functions.js << 'EOF'
// Razorpay Configuration
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
            handlePaymentSuccess(response, orderData, totalAmount);
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

async function handlePaymentSuccess(response, orderData, totalAmount) {
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

function saveToOMS(order) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.unshift(order);
    localStorage.setItem('orders', JSON.stringify(orders));
}

function sendWhatsAppNotification(order) {
    let orderMessage = `🎉 NEW ORDER - PAYMENT RECEIVED!\n\n`;
    orderMessage += `📋 Order ID: ${order.orderId}\n`;
    orderMessage += `💳 Payment ID: ${order.paymentId}\n`;
    orderMessage += `👤 Customer: ${order.customer.name}\n`;
    orderMessage += `📱 Phone: ${order.customer.phone}\n`;
    orderMessage += `📧 Email: ${order.customer.email}\n`;
    orderMessage += `📍 Address: ${order.customer.address}\n\n`;
    orderMessage += `🛒 ITEMS:\n`;
    
    order.items.forEach(item => {
        orderMessage += `• ${item.name} x${item.quantity} - ₹${(item.price * item.quantity).toLocaleString()}\n`;
    });
    
    orderMessage += `\n💰 PAYMENT:\n`;
    orderMessage += `Total: ₹${order.total.toLocaleString()}\n`;
    orderMessage += `✅ Payment Status: COMPLETED\n`;
    orderMessage += `💳 Payment Method: Razorpay\n`;
    orderMessage += `⏰ Time: ${new Date().toLocaleString()}`;
    
    window.open(`https://wa.me/918502019889?text=${encodeURIComponent(orderMessage)}`, '_blank');
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
EOF

echo "✅ Razorpay functions created: razorpay-functions.js"

# Step 4: Add script reference
sed -i '/<\/body>/i\    <script src="razorpay-functions.js"></script>' index.html

echo "✅ Script reference added to index.html"

echo ""
echo "🎉 Razorpay Integration Complete!"
echo ""
echo "📋 What was done:"
echo "  ✅ Added Razorpay checkout script to <head>"
echo "  ✅ Created Payment Success Modal"
echo "  ✅ Added Razorpay JavaScript functions"
echo "  ✅ Created backup: index.html.backup"
echo ""
echo "🚀 Next Steps:"
echo "  1. Update checkout form button to call processRazorpayPayment()"
echo "  2. Test with test cards (4111 1111 1111 1111)"
echo "  3. Verify payment flow works"
echo ""
echo "📝 Manual Step Required:"
echo "  Replace the checkout form submit button with:"
echo '  <button type="button" onclick="processRazorpayPayment()">Pay with Razorpay</button>'
echo ""
