// RAHUL MOBILE - Order Automation with Google Sheets Integration
// Replace this URL with your Google Apps Script Web App URL after deployment
const GOOGLE_SHEETS_API_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';

// Save order to Google Sheets
async function saveOrderToSheets(orderData) {
    try {
        const response = await fetch(GOOGLE_SHEETS_API_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        });
        
        console.log('✅ Order saved to Google Sheets');
        return true;
    } catch (error) {
        console.error('❌ Error saving to Google Sheets:', error);
        return false;
    }
}

// Enhanced Razorpay Checkout with Google Sheets Integration
function checkoutRazorpayWithSheets() {
    if (cart.length === 0) {
        showToast('⚠ Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const options = {
        key: RAZORPAY_KEY,
        amount: total * 100,
        currency: 'INR',
        name: 'RAHUL MOBILE',
        description: 'Order Payment',
        image: 'https://nyc3.digitaloceanspaces.com/bhindi-drive/files/91452e7d-ceec-4f57-a0a3-13430b79756b/2025-12-06T16-45-28-172Z-8a68267f-chat-image-1765039528152-0.jpg',
        handler: async function (response) {
            // Prepare order data for Google Sheets
            const orderData = {
                paymentId: response.razorpay_payment_id,
                paymentMethod: 'Razorpay',
                customerName: options.prefill.name || 'Guest Customer',
                customerPhone: options.prefill.contact || '',
                customerEmail: options.prefill.email || '',
                customerAddress: '',
                items: cart.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price
                })),
                total: total,
                discount: 0
            };
            
            // Save to Google Sheets
            await saveOrderToSheets(orderData);
            
            // Show success message
            showToast('✓ Payment Successful! Order ID: ' + response.razorpay_payment_id);
            
            // Generate and open invoice
            openInvoice(orderData);
            
            // Send WhatsApp confirmation
            sendOrderConfirmation(response.razorpay_payment_id);
            
            // Clear cart
            cart = [];
            updateCart();
            closeCart();
        },
        prefill: {
            name: '',
            email: '',
            contact: ''
        },
        notes: {
            address: 'Rahul Mobile, Dausa'
        },
        theme: {
            color: '#8b5cf6'
        },
        modal: {
            ondismiss: function() {
                showToast('⚠ Payment cancelled');
            }
        }
    };
    
    const rzp = new Razorpay(options);
    rzp.open();
}

// Generate and open invoice
function openInvoice(orderData) {
    const orderId = 'RM' + new Date().getTime();
    const subtotal = orderData.total;
    const gst = Math.round(subtotal * 0.18);
    const grandTotal = subtotal + gst;
    
    const params = new URLSearchParams({
        invoiceNumber: orderId,
        invoiceDate: new Date().toLocaleDateString('en-IN'),
        customerName: orderData.customerName,
        customerAddress: orderData.customerAddress || 'N/A',
        paymentId: orderData.paymentId,
        paymentMethod: orderData.paymentMethod,
        paymentDate: new Date().toLocaleString('en-IN'),
        items: JSON.stringify(orderData.items),
        subtotal: subtotal,
        discount: orderData.discount || 0,
        gst: gst,
        grandTotal: grandTotal
    });
    
    const invoiceUrl = 'https://rahulprasadjai-a11y.github.io/rahulmobile-site/invoice-template.html?' + params.toString();
    
    // Open invoice in new tab
    window.open(invoiceUrl, '_blank');
}

// Enhanced WhatsApp Checkout with Google Sheets Integration
async function checkoutWhatsAppWithSheets() {
    if (cart.length === 0) {
        showToast('⚠ Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Prepare order data for Google Sheets
    const orderData = {
        paymentId: 'WA' + new Date().getTime(),
        paymentMethod: 'WhatsApp Order',
        customerName: 'WhatsApp Customer',
        customerPhone: '',
        customerEmail: '',
        customerAddress: '',
        items: cart.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
        })),
        total: total,
        discount: 0
    };
    
    // Save to Google Sheets
    await saveOrderToSheets(orderData);
    
    // Prepare WhatsApp message
    let message = '🛒 *New Order from Website*\n\n';
    message += '*RAHUL MOBILE - Order Details*\n';
    message += '━━━━━━━━━━━━━━━━━━━━\n\n';
    message += `📋 *Order ID:* ${orderData.paymentId}\n\n`;
    
    cart.forEach((item, index) => {
        message += `${index + 1}. *${item.name}*\n`;
        message += `   💰 Price: ₹${item.price.toLocaleString()}\n`;
        message += `   📦 Quantity: ${item.quantity}\n`;
        message += `   💵 Subtotal: ₹${(item.price * item.quantity).toLocaleString()}\n\n`;
    });
    
    message += '━━━━━━━━━━━━━━━━━━━━\n';
    message += `💰 *TOTAL: ₹${total.toLocaleString()}*\n\n`;
    message += '📍 *Delivery Address:*\n';
    message += 'Please provide your delivery address\n\n';
    message += '✅ I would like to place this order!';
    
    const whatsappNumber = '918764719889';
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(url, '_blank');
    
    // Clear cart
    cart = [];
    updateCart();
    closeCart();
    
    showToast('✓ Order sent via WhatsApp!');
}

// Customer Information Modal (Optional - for collecting customer details)
function showCustomerInfoModal(callback) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            <div class="modal-header">
                <h2>📋 Customer Information</h2>
                <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
            </div>
            <div style="padding: 20px;">
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: 600;">Name *</label>
                    <input type="text" id="customerName" placeholder="Enter your name" 
                           style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: 600;">Phone *</label>
                    <input type="tel" id="customerPhone" placeholder="Enter your phone number" 
                           style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: 600;">Email</label>
                    <input type="email" id="customerEmail" placeholder="Enter your email (optional)" 
                           style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                </div>
                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: 600;">Delivery Address *</label>
                    <textarea id="customerAddress" placeholder="Enter your complete delivery address" 
                              style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; min-height: 80px;"></textarea>
                </div>
                <button onclick="submitCustomerInfo()" 
                        style="width: 100%; padding: 12px; background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); 
                               color: white; border: none; border-radius: 5px; font-size: 16px; font-weight: 600; cursor: pointer;">
                    Continue to Payment
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    window.submitCustomerInfo = function() {
        const name = document.getElementById('customerName').value.trim();
        const phone = document.getElementById('customerPhone').value.trim();
        const email = document.getElementById('customerEmail').value.trim();
        const address = document.getElementById('customerAddress').value.trim();
        
        if (!name || !phone || !address) {
            alert('Please fill in all required fields (Name, Phone, Address)');
            return;
        }
        
        modal.remove();
        callback({ name, phone, email, address });
    };
}

console.log('✅ Order Automation Script Loaded');
console.log('⚠️ Remember to update GOOGLE_SHEETS_API_URL with your Google Apps Script Web App URL');
