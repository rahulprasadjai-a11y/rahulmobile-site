/**
 * RAZORPAY AUTO-INJECT SCRIPT
 * ===========================
 * Just add this ONE line to your index.html before closing </body>:
 * <script src="razorpay-auto-inject.js"></script>
 * 
 * This script will automatically:
 * 1. Load Razorpay checkout script
 * 2. Add payment success modal to DOM
 * 3. Inject Razorpay payment functions
 * 4. Update checkout form with Razorpay button
 */

(function() {
    'use strict';
    
    console.log('🚀 Razorpay Auto-Inject: Starting...');
    
    // ============================================
    // STEP 1: Load Razorpay Checkout Script
    // ============================================
    function loadRazorpayScript() {
        return new Promise((resolve, reject) => {
            if (window.Razorpay) {
                console.log('✅ Razorpay already loaded');
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => {
                console.log('✅ Razorpay script loaded');
                resolve();
            };
            script.onerror = () => {
                console.error('❌ Failed to load Razorpay script');
                reject();
            };
            document.head.appendChild(script);
        });
    }
    
    // ============================================
    // STEP 2: Add Payment Success Modal to DOM
    // ============================================
    function injectSuccessModal() {
        const modalHTML = `
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
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        console.log('✅ Payment success modal injected');
    }
    
    // ============================================
    // STEP 3: Update Checkout Form
    // ============================================
    function updateCheckoutForm() {
        // Wait for DOM to be ready
        const checkInterval = setInterval(() => {
            const checkoutForm = document.querySelector('#checkoutModal form');
            const submitButton = checkoutForm?.querySelector('button[type="submit"]');
            
            if (submitButton && submitButton.textContent.includes('Proceed to Payment')) {
                clearInterval(checkInterval);
                
                // Replace the submit button with payment options
                const paymentOptionsHTML = `
                    <div class="payment-options" style="margin-top: 1.5rem;">
                        <h3 style="margin-bottom: 1rem; text-align: center; color: var(--dark);">
                            <i class="fas fa-credit-card"></i> Choose Payment Method
                        </h3>
                        
                        <!-- Razorpay Payment Button -->
                        <button type="button" class="btn-submit" onclick="processRazorpayPayment()" 
                                style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); margin-bottom: 1rem; width: 100%;">
                            <i class="fas fa-lock"></i> Pay Securely with Razorpay
                            <div style="font-size: 0.85rem; margin-top: 0.3rem; opacity: 0.9;">
                                💳 Cards • 📱 UPI • 💰 Wallets • 🏦 Net Banking
                            </div>
                        </button>
                        
                        <!-- UPI QR Code Payment Button (Existing) -->
                        <button type="button" class="btn-submit" onclick="showUPIPayment(event)" 
                                style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); width: 100%;">
                            <i class="fas fa-qrcode"></i> Pay with UPI QR Code
                            <div style="font-size: 0.85rem; margin-top: 0.3rem; opacity: 0.9;">
                                📲 Scan & Pay • Manual Verification
                            </div>
                        </button>
                    </div>
                `;
                
                submitButton.outerHTML = paymentOptionsHTML;
                console.log('✅ Checkout form updated with Razorpay button');
            }
        }, 100);
        
        // Stop checking after 10 seconds
        setTimeout(() => clearInterval(checkInterval), 10000);
    }
    
    // ============================================
    // STEP 4: Inject Razorpay Functions
    // ============================================
    const RAZORPAY_KEY_ID = 'rzp_test_RoLDldyBWpAk5J';
    
    window.processRazorpayPayment = function() {
        const name = document.getElementById('customerName')?.value;
        const phone = document.getElementById('customerPhone')?.value;
        const email = document.getElementById('customerEmail')?.value;
        const address = document.getElementById('customerAddress')?.value;
        
        if (!name || !phone || !email || !address) {
            if (window.showToast) {
                showToast('Please fill all details', 'warning');
            } else {
                alert('Please fill all details');
            }
            return;
        }
        
        if (phone.length !== 10) {
            if (window.showToast) {
                showToast('Please enter valid 10-digit phone number', 'warning');
            } else {
                alert('Please enter valid 10-digit phone number');
            }
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            if (window.showToast) {
                showToast('Please enter valid email address', 'warning');
            } else {
                alert('Please enter valid email address');
            }
            return;
        }
        
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
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
    };
    
    function initRazorpayPayment(orderData, totalAmount) {
        if (!window.Razorpay) {
            alert('Razorpay not loaded. Please refresh the page.');
            return;
        }
        
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
                    if (window.showToast) {
                        showToast('Payment cancelled. Please try again.', 'warning');
                    }
                }
            }
        };

        const razorpay = new Razorpay(options);
        razorpay.open();
    }
    
    function handleRazorpaySuccess(response, orderData, totalAmount) {
        console.log('Payment Success:', response);
        
        const completeOrder = {
            ...orderData,
            total: totalAmount,
            status: 'processing',
            paymentMethod: 'Razorpay',
            paymentStatus: 'completed',
            paymentId: response.razorpay_payment_id,
            paymentSignature: response.razorpay_signature || 'N/A'
        };
        
        // Save to OMS
        if (window.saveToOMS) {
            saveToOMS(completeOrder);
        } else {
            let orders = JSON.parse(localStorage.getItem('orders')) || [];
            orders.unshift(completeOrder);
            localStorage.setItem('orders', JSON.stringify(orders));
        }
        
        // Send WhatsApp notification
        if (window.sendWhatsAppNotification) {
            sendWhatsAppNotification(completeOrder);
        } else {
            sendWhatsAppNotificationFallback(completeOrder);
        }
        
        // Clear cart
        localStorage.setItem('cart', JSON.stringify([]));
        if (window.updateCartCount) {
            updateCartCount();
        }
        
        // Close checkout modal
        if (window.closeCheckoutModal) {
            closeCheckoutModal();
        } else {
            document.getElementById('checkoutModal')?.classList.remove('show');
        }
        
        // Show success modal
        showPaymentSuccessModal(completeOrder);
    }
    
    function sendWhatsAppNotificationFallback(order) {
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
    
    window.showPaymentSuccessModal = function(order) {
        const modal = document.getElementById('paymentSuccessModal');
        const orderDetails = document.getElementById('orderDetails');
        const confirmationEmail = document.getElementById('confirmationEmail');
        
        if (!modal || !orderDetails || !confirmationEmail) {
            alert('Payment successful! Order ID: ' + order.orderId);
            return;
        }
        
        orderDetails.innerHTML = `
            <div style="margin-bottom: 0.5rem;"><strong>Order ID:</strong> ${order.orderId}</div>
            <div style="margin-bottom: 0.5rem;"><strong>Payment ID:</strong> ${order.paymentId}</div>
            <div><strong>Amount Paid:</strong> ₹${order.total.toLocaleString()}</div>
        `;
        
        confirmationEmail.innerHTML = `<i class="fas fa-envelope"></i> Order confirmation sent to ${order.customer.email}`;
        modal.classList.add('show');
    };
    
    window.closePaymentSuccessModal = function() {
        const modal = document.getElementById('paymentSuccessModal');
        if (modal) {
            modal.classList.remove('show');
        }
        window.location.href = 'index.html';
    };
    
    window.viewOrderTracking = function() {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        if (orders.length > 0) {
            window.location.href = `tracking.html?order=${orders[0].orderId}`;
        }
    };
    
    // ============================================
    // STEP 5: Initialize Everything
    // ============================================
    async function initialize() {
        try {
            await loadRazorpayScript();
            injectSuccessModal();
            updateCheckoutForm();
            console.log('🎉 Razorpay Auto-Inject: Complete!');
        } catch (error) {
            console.error('❌ Razorpay Auto-Inject: Failed', error);
        }
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
})();
