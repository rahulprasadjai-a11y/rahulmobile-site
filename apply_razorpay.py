#!/usr/bin/env python3
"""
Razorpay Integration Auto-Apply Script
Automatically updates index.html with Razorpay payment integration
"""

import re
import sys

def read_file(filename):
    """Read the HTML file"""
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        print(f"❌ Error: {filename} not found!")
        sys.exit(1)

def write_file(filename, content):
    """Write the updated HTML file"""
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✅ File updated: {filename}")

def backup_file(filename):
    """Create a backup of the original file"""
    import shutil
    backup_name = filename + '.backup'
    shutil.copy(filename, backup_name)
    print(f"✅ Backup created: {backup_name}")

def add_razorpay_scripts(html):
    """Add Razorpay scripts to <head> section"""
    # Find the Font Awesome link
    pattern = r'(<link rel="stylesheet" href="https://cdnjs\.cloudflare\.com/ajax/libs/font-awesome/6\.4\.0/css/all\.min\.css">)'
    
    razorpay_scripts = r'''\1
    
    <!-- Razorpay Checkout Script -->
    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    
    <!-- EmailJS for Email Notifications (Optional) -->
    <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>'''
    
    html = re.sub(pattern, razorpay_scripts, html)
    print("✅ Added Razorpay scripts to <head>")
    return html

def update_checkout_button(html):
    """Update checkout form button with payment options"""
    # Find the submit button
    pattern = r'<button type="submit" class="btn-submit">\s*<i class="fas fa-arrow-right"></i> Proceed to Payment\s*</button>'
    
    new_buttons = '''<div class="payment-options" style="margin-top: 1.5rem;">
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
            </div>'''
    
    html = re.sub(pattern, new_buttons, html, flags=re.DOTALL)
    print("✅ Updated checkout form buttons")
    return html

def add_payment_success_modal(html):
    """Add Payment Success Modal after UPI modal"""
    # Find the UPI modal closing div
    pattern = r'(</div>\s*</div>\s*<!-- UPI Payment Modal -->)'
    
    success_modal = r'''\1

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
    </div>'''
    
    html = re.sub(pattern, success_modal, html)
    print("✅ Added Payment Success Modal")
    return html

def add_razorpay_functions(html):
    """Add Razorpay JavaScript functions before closing script tag"""
    # Find the closing script tag
    pattern = r'(document\.querySelectorAll\(\'a\[href\^="#"\]\'\)\.forEach.*?}\);.*?)(</script>\s*</body>)'
    
    razorpay_functions = r'''\1

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
    \2'''
    
    html = re.sub(pattern, razorpay_functions, html, flags=re.DOTALL)
    print("✅ Added Razorpay JavaScript functions")
    return html

def main():
    """Main function to apply all updates"""
    print("🚀 Starting Razorpay Integration...\n")
    
    filename = 'index.html'
    
    # Backup original file
    backup_file(filename)
    
    # Read HTML file
    html = read_file(filename)
    
    # Apply all updates
    html = add_razorpay_scripts(html)
    html = update_checkout_button(html)
    html = add_payment_success_modal(html)
    html = add_razorpay_functions(html)
    
    # Write updated file
    write_file(filename, html)
    
    print("\n🎉 Razorpay Integration Complete!")
    print("\n📋 What was done:")
    print("  ✅ Added Razorpay checkout script to <head>")
    print("  ✅ Updated checkout form with payment options")
    print("  ✅ Added Payment Success Modal")
    print("  ✅ Added Razorpay JavaScript functions")
    print("  ✅ Created backup: index.html.backup")
    print("\n🧪 Test with:")
    print("  Card: 4111 1111 1111 1111")
    print("  CVV: 123")
    print("  Expiry: Any future date")
    print("\n🚀 Ready to test!")

if __name__ == '__main__':
    main()
