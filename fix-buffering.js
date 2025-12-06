/**
 * EMERGENCY FIX FOR BUFFERING ISSUE
 * ==================================
 * This file adds missing OMS (Order Management System) functions
 * that are causing JavaScript errors and page buffering.
 * 
 * Add this line to index.html BEFORE closing </body>:
 * <script src="fix-buffering.js"></script>
 */

(function() {
    'use strict';
    
    console.log('🔧 Emergency Fix: Loading missing OMS functions...');
    
    // ============================================
    // Missing OMS Functions
    // ============================================
    
    /**
     * Save order to Order Management System (localStorage)
     */
    window.saveToOMS = function(orderData) {
        try {
            // Get existing orders
            let orders = JSON.parse(localStorage.getItem('orders')) || [];
            
            // Add new order at the beginning
            orders.unshift(orderData);
            
            // Keep only last 100 orders
            if (orders.length > 100) {
                orders = orders.slice(0, 100);
            }
            
            // Save back to localStorage
            localStorage.setItem('orders', JSON.stringify(orders));
            
            console.log('✅ Order saved to OMS:', orderData.orderId);
            
            // Send to Google Sheets (if available)
            if (window.sendToGoogleSheets) {
                sendToGoogleSheets(orderData);
            }
            
            // Send email notification (if available)
            if (window.sendEmailNotification) {
                sendEmailNotification(orderData);
            }
            
            return true;
        } catch (error) {
            console.error('❌ Error saving to OMS:', error);
            return false;
        }
    };
    
    /**
     * Send WhatsApp notification
     */
    window.sendWhatsAppNotification = function(order) {
        try {
            let message = `🎉 NEW ORDER RECEIVED!\n\n`;
            message += `📋 Order ID: ${order.orderId}\n`;
            message += `👤 Customer: ${order.customer.name}\n`;
            message += `📱 Phone: ${order.customer.phone}\n`;
            message += `📧 Email: ${order.customer.email}\n`;
            message += `📍 Address: ${order.customer.address}\n\n`;
            message += `🛒 ITEMS:\n`;
            
            order.items.forEach(item => {
                message += `• ${item.name} x${item.quantity} - ₹${(item.price * item.quantity).toLocaleString()}\n`;
            });
            
            message += `\n💰 PAYMENT:\n`;
            message += `Total: ₹${order.total.toLocaleString()}\n`;
            
            if (order.paymentMethod) {
                message += `Payment Method: ${order.paymentMethod}\n`;
            }
            if (order.paymentStatus) {
                message += `Payment Status: ${order.paymentStatus}\n`;
            }
            if (order.paymentId) {
                message += `Payment ID: ${order.paymentId}\n`;
            }
            
            message += `\n⏰ Time: ${new Date(order.timestamp).toLocaleString()}`;
            
            // Open WhatsApp
            window.open(`https://wa.me/918502019889?text=${encodeURIComponent(message)}`, '_blank');
            
            console.log('✅ WhatsApp notification sent');
            return true;
        } catch (error) {
            console.error('❌ Error sending WhatsApp notification:', error);
            return false;
        }
    };
    
    /**
     * Send to Google Sheets (placeholder)
     */
    window.sendToGoogleSheets = function(orderData) {
        console.log('📊 Google Sheets integration not configured');
        // This would require Google Apps Script Web App URL
        // For now, just log
        return false;
    };
    
    /**
     * Send email notification (placeholder)
     */
    window.sendEmailNotification = function(orderData) {
        console.log('📧 Email notification not configured');
        // This would require email service integration
        // For now, just log
        return false;
    };
    
    /**
     * Get all orders from OMS
     */
    window.getOrders = function() {
        try {
            return JSON.parse(localStorage.getItem('orders')) || [];
        } catch (error) {
            console.error('❌ Error getting orders:', error);
            return [];
        }
    };
    
    /**
     * Get order by ID
     */
    window.getOrderById = function(orderId) {
        try {
            const orders = getOrders();
            return orders.find(order => order.orderId === orderId);
        } catch (error) {
            console.error('❌ Error getting order:', error);
            return null;
        }
    };
    
    /**
     * Update order status
     */
    window.updateOrderStatus = function(orderId, newStatus) {
        try {
            const orders = getOrders();
            const order = orders.find(o => o.orderId === orderId);
            
            if (order) {
                order.status = newStatus;
                order.updatedAt = new Date().toISOString();
                localStorage.setItem('orders', JSON.stringify(orders));
                console.log(`✅ Order ${orderId} status updated to: ${newStatus}`);
                return true;
            }
            
            console.warn(`⚠️ Order ${orderId} not found`);
            return false;
        } catch (error) {
            console.error('❌ Error updating order status:', error);
            return false;
        }
    };
    
    /**
     * Fix for missing showUPIPayment function
     */
    if (!window.showUPIPayment) {
        window.showUPIPayment = function(event) {
            if (event) event.preventDefault();
            
            // Get customer details
            const name = document.getElementById('customerName')?.value;
            const phone = document.getElementById('customerPhone')?.value;
            const email = document.getElementById('customerEmail')?.value;
            const address = document.getElementById('customerAddress')?.value;
            
            // Validate
            if (!name || !phone || !email || !address) {
                if (window.showToast) {
                    showToast('Please fill all details', 'warning');
                } else {
                    alert('Please fill all details');
                }
                return;
            }
            
            // Get cart
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (cart.length === 0) {
                if (window.showToast) {
                    showToast('Cart is empty', 'warning');
                } else {
                    alert('Cart is empty');
                }
                return;
            }
            
            // Calculate total
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const shipping = subtotal > 500 ? 0 : 50;
            const total = subtotal + shipping;
            
            // Show UPI modal
            const upiSummary = document.getElementById('upiSummary');
            if (upiSummary) {
                upiSummary.innerHTML = `
                    <div class="cart-summary-row">
                        <span>Subtotal:</span>
                        <span>₹${subtotal.toLocaleString()}</span>
                    </div>
                    <div class="cart-summary-row">
                        <span>Shipping:</span>
                        <span>${shipping === 0 ? 'FREE' : '₹' + shipping}</span>
                    </div>
                    <div class="cart-summary-row">
                        <strong>Total Amount:</strong>
                        <strong class="cart-total">₹${total.toLocaleString()}</strong>
                    </div>
                `;
            }
            
            // Store customer data for later
            window.currentOrderData = {
                customer: { name, phone, email, address },
                items: [...cart],
                total: total,
                timestamp: new Date().toISOString(),
                orderId: 'RM-' + Date.now()
            };
            
            // Close checkout modal
            if (window.closeCheckoutModal) {
                closeCheckoutModal();
            } else {
                document.getElementById('checkoutModal')?.classList.remove('show');
            }
            
            // Show UPI modal
            document.getElementById('upiModal')?.classList.add('show');
        };
    }
    
    /**
     * Fix for missing confirmPayment function
     */
    if (!window.confirmPayment) {
        window.confirmPayment = function() {
            if (!window.currentOrderData) {
                alert('Order data not found. Please try again.');
                return;
            }
            
            const orderData = {
                ...window.currentOrderData,
                status: 'processing',
                paymentMethod: 'UPI QR Code',
                paymentStatus: 'pending_verification'
            };
            
            // Save to OMS
            saveToOMS(orderData);
            
            // Send WhatsApp notification
            sendWhatsAppNotification(orderData);
            
            // Clear cart
            localStorage.setItem('cart', JSON.stringify([]));
            if (window.updateCartCount) {
                updateCartCount();
            }
            
            // Close UPI modal
            if (window.closeUPIModal) {
                closeUPIModal();
            } else {
                document.getElementById('upiModal')?.classList.remove('show');
            }
            
            // Show success message
            if (window.showToast) {
                showToast('Order placed! We will verify payment and confirm shortly.', 'success');
            } else {
                alert('Order placed! We will verify payment and confirm shortly.');
            }
            
            // Clear current order data
            delete window.currentOrderData;
            
            // Redirect to home after 2 seconds
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        };
    }
    
    console.log('✅ Emergency Fix: All missing functions loaded!');
    console.log('✅ OMS functions available:', {
        saveToOMS: typeof window.saveToOMS,
        sendWhatsAppNotification: typeof window.sendWhatsAppNotification,
        getOrders: typeof window.getOrders,
        showUPIPayment: typeof window.showUPIPayment,
        confirmPayment: typeof window.confirmPayment
    });
    
})();
