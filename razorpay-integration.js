// Razorpay Configuration
const RAZORPAY_KEY_ID = 'rzp_test_RoLDldyBWpAk5J';

// Initialize Razorpay Payment
function initRazorpayPayment(orderData, totalAmount) {
    const options = {
        key: RAZORPAY_KEY_ID,
        amount: totalAmount * 100, // Amount in paise
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
                handlePaymentCancelled();
            }
        }
    };

    const razorpay = new Razorpay(options);
    razorpay.open();
}

// Handle Payment Success
async function handlePaymentSuccess(response, orderData, totalAmount) {
    console.log('Payment Success:', response);
    
    // Add payment details to order
    const completeOrder = {
        ...orderData,
        total: totalAmount,
        status: 'processing',
        paymentMethod: 'Razorpay',
        paymentStatus: 'completed',
        paymentId: response.razorpay_payment_id,
        paymentSignature: response.razorpay_signature
    };
    
    // Save to OMS (localStorage)
    saveToOMS(completeOrder);
    
    // Send to Google Sheets
    await sendToGoogleSheets(completeOrder);
    
    // Send Email Notifications
    await sendEmailNotifications(completeOrder);
    
    // Send WhatsApp notification
    sendWhatsAppNotification(completeOrder);
    
    // Clear cart
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Close modals
    closeCheckoutModal();
    
    // Show success message with tracking link
    showPaymentSuccessModal(completeOrder);
}

// Handle Payment Cancelled
function handlePaymentCancelled() {
    showToast('Payment cancelled. Please try again.', 'warning');
}

// Show Payment Success Modal
function showPaymentSuccessModal(order) {
    const modal = document.createElement('div');
    modal.className = 'modal show';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px; text-align: center;">
            <div style="font-size: 4rem; color: var(--success); margin-bottom: 1rem;">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2 style="color: var(--success); margin-bottom: 1rem;">Payment Successful! 🎉</h2>
            <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">
                Your order has been placed successfully!
            </p>
            <div style="background: var(--light); padding: 1.5rem; border-radius: 15px; margin-bottom: 1.5rem;">
                <div style="margin-bottom: 0.5rem;">
                    <strong>Order ID:</strong> ${order.orderId}
                </div>
                <div style="margin-bottom: 0.5rem;">
                    <strong>Payment ID:</strong> ${order.paymentId}
                </div>
                <div>
                    <strong>Amount Paid:</strong> ₹${order.total.toLocaleString()}
                </div>
            </div>
            <p style="margin-bottom: 1.5rem; color: #666;">
                <i class="fas fa-envelope"></i> 
                Order confirmation has been sent to ${order.customer.email}
            </p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <button class="btn btn-primary" onclick="window.location.href='tracking.html?order=${order.orderId}'">
                    <i class="fas fa-truck"></i> Track Order
                </button>
                <button class="btn btn-secondary" onclick="this.closest('.modal').remove(); window.location.href='index.html'">
                    <i class="fas fa-home"></i> Continue Shopping
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Save to OMS
function saveToOMS(order) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.unshift(order);
    localStorage.setItem('orders', JSON.stringify(orders));
}

// Send to Google Sheets
async function sendToGoogleSheets(order) {
    const GOOGLE_SHEETS_URL = 'YOUR_GOOGLE_SHEETS_DEPLOYMENT_URL'; // Update this
    
    try {
        const data = {
            orderId: order.orderId,
            timestamp: new Date(order.timestamp).toLocaleString(),
            customerName: order.customer.name,
            customerPhone: order.customer.phone,
            customerEmail: order.customer.email,
            customerAddress: order.customer.address,
            items: order.items.map(item => `${item.name} x${item.quantity}`).join(', '),
            total: order.total,
            status: order.status,
            paymentMethod: order.paymentMethod,
            paymentId: order.paymentId
        };
        
        await fetch(GOOGLE_SHEETS_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.error('Google Sheets error:', error);
    }
}

// Send Email Notifications
async function sendEmailNotifications(order) {
    const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // Update this
    const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Update this
    const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Update this
    
    try {
        // Initialize EmailJS
        emailjs.init(EMAILJS_PUBLIC_KEY);
        
        // Email to customer
        const customerEmailParams = {
            to_email: order.customer.email,
            to_name: order.customer.name,
            order_id: order.orderId,
            payment_id: order.paymentId,
            order_date: new Date(order.timestamp).toLocaleString(),
            items: order.items.map(item => `${item.name} x${item.quantity} - ₹${(item.price * item.quantity).toLocaleString()}`).join('\n'),
            total: order.total.toLocaleString(),
            address: order.customer.address,
            tracking_link: `https://rahulmobile.in/tracking.html?order=${order.orderId}`
        };
        
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, customerEmailParams);
        
        // Email to admin
        const adminEmailParams = {
            to_email: 'info@rahulmobile.in',
            to_name: 'Rahul Mobile Admin',
            subject: `New Order ${order.orderId}`,
            message: `New order received!\n\nOrder ID: ${order.orderId}\nCustomer: ${order.customer.name}\nPhone: ${order.customer.phone}\nTotal: ₹${order.total.toLocaleString()}\nPayment ID: ${order.paymentId}`
        };
        
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, adminEmailParams);
    } catch (error) {
        console.error('Email error:', error);
    }
}

// Send WhatsApp Notification
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

// Show Toast Notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
