// RAHUL MOBILE - Enhanced Features
// CRITICAL FLOW: Customer Details FIRST → Then Payment

// Customer Info Storage
let customerInfo = {
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
};

// Show Customer Info Form - STEP 1 (MANDATORY FIRST)
function showCustomerInfoForm(onSubmit) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'customerInfoModal';
    modal.style.display = 'block';
    
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <div class="modal-header">
                <h2 style="margin: 0;">📋 Step 1: Delivery Information</h2>
                <span class="close" onclick="closeCustomerInfoForm()">&times;</span>
            </div>
            
            <div style="padding: 20px;">
                <div style="background: #e0e7ff; padding: 15px; border-radius: 8px; margin-bottom: 20px; 
                            border-left: 4px solid #6366f1;">
                    <p style="margin: 0; color: #312e81; font-size: 14px; line-height: 1.6;">
                        <strong>📍 Important:</strong> Please provide your complete delivery details first. 
                        Payment will be processed in the next step.
                    </p>
                </div>
                
                <form id="customerInfoForm" onsubmit="submitCustomerInfo(event)">
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 5px; font-weight: 600; color: #1a1a1a;">
                            Full Name <span style="color: #ef4444;">*</span>
                        </label>
                        <input type="text" id="customerName" required
                               value="${customerInfo.name}"
                               placeholder="Enter your full name"
                               style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; 
                                      font-size: 14px; transition: all 0.3s;"
                               onfocus="this.style.borderColor='#8b5cf6'"
                               onblur="this.style.borderColor='#e5e7eb'">
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: 600; color: #1a1a1a;">
                                Phone Number <span style="color: #ef4444;">*</span>
                            </label>
                            <input type="tel" id="customerPhone" required
                                   value="${customerInfo.phone}"
                                   placeholder="10-digit mobile"
                                   pattern="[0-9]{10}"
                                   maxlength="10"
                                   style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; 
                                          font-size: 14px; transition: all 0.3s;"
                                   onfocus="this.style.borderColor='#8b5cf6'"
                                   onblur="this.style.borderColor='#e5e7eb'">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: 600; color: #1a1a1a;">
                                Email Address
                            </label>
                            <input type="email" id="customerEmail"
                                   value="${customerInfo.email}"
                                   placeholder="email (optional)"
                                   style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; 
                                          font-size: 14px; transition: all 0.3s;"
                                   onfocus="this.style.borderColor='#8b5cf6'"
                                   onblur="this.style.borderColor='#e5e7eb'">
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 5px; font-weight: 600; color: #1a1a1a;">
                            Delivery Address <span style="color: #ef4444;">*</span>
                        </label>
                        <textarea id="customerAddress" required
                                  placeholder="House/Flat No., Street, Landmark"
                                  rows="3"
                                  style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; 
                                         font-size: 14px; resize: vertical; transition: all 0.3s;"
                                  onfocus="this.style.borderColor='#8b5cf6'"
                                  onblur="this.style.borderColor='#e5e7eb'">${customerInfo.address}</textarea>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: 600; color: #1a1a1a;">
                                City <span style="color: #ef4444;">*</span>
                            </label>
                            <input type="text" id="customerCity" required
                                   value="${customerInfo.city}"
                                   placeholder="City"
                                   style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; 
                                          font-size: 14px; transition: all 0.3s;"
                                   onfocus="this.style.borderColor='#8b5cf6'"
                                   onblur="this.style.borderColor='#e5e7eb'">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: 600; color: #1a1a1a;">
                                State <span style="color: #ef4444;">*</span>
                            </label>
                            <input type="text" id="customerState" required
                                   value="${customerInfo.state}"
                                   placeholder="State"
                                   style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; 
                                          font-size: 14px; transition: all 0.3s;"
                                   onfocus="this.style.borderColor='#8b5cf6'"
                                   onblur="this.style.borderColor='#e5e7eb'">
                        </div>
                        
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: 600; color: #1a1a1a;">
                                PIN Code <span style="color: #ef4444;">*</span>
                            </label>
                            <input type="text" id="customerPincode" required
                                   value="${customerInfo.pincode}"
                                   placeholder="6-digit"
                                   pattern="[0-9]{6}"
                                   maxlength="6"
                                   style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; 
                                          font-size: 14px; transition: all 0.3s;"
                                   onfocus="this.style.borderColor='#8b5cf6'"
                                   onblur="this.style.borderColor='#e5e7eb'">
                        </div>
                    </div>
                    
                    <button type="submit"
                            style="width: 100%; padding: 15px; background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); 
                                   color: white; border: none; border-radius: 8px; font-size: 16px; 
                                   font-weight: 600; cursor: pointer; transition: all 0.3s;">
                        Continue to Payment (Step 2) →
                    </button>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    window.customerInfoCallback = onSubmit;
}

function closeCustomerInfoForm() {
    const modal = document.getElementById('customerInfoModal');
    if (modal) modal.remove();
}

function submitCustomerInfo(event) {
    event.preventDefault();
    
    customerInfo = {
        name: document.getElementById('customerName').value.trim(),
        phone: document.getElementById('customerPhone').value.trim(),
        email: document.getElementById('customerEmail').value.trim(),
        address: document.getElementById('customerAddress').value.trim(),
        city: document.getElementById('customerCity').value.trim(),
        state: document.getElementById('customerState').value.trim(),
        pincode: document.getElementById('customerPincode').value.trim()
    };
    
    if (customerInfo.phone.length !== 10) {
        alert('❌ Please enter valid 10-digit phone');
        return;
    }
    
    if (customerInfo.pincode.length !== 6) {
        alert('❌ Please enter valid 6-digit PIN');
        return;
    }
    
    showToast('✅ Details saved! Opening payment...');
    closeCustomerInfoForm();
    
    if (window.customerInfoCallback) {
        window.customerInfoCallback(customerInfo);
    }
}

// MAIN CHECKOUT - Customer Info FIRST, Payment SECOND
function enhancedCheckoutRazorpay() {
    if (cart.length === 0) {
        showToast('⚠️ Cart is empty!');
        return;
    }
    
    // STEP 1: Customer Info Form
    showCustomerInfoForm((custInfo) => {
        // STEP 2: Payment (only after customer fills form)
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        const options = {
            key: RAZORPAY_KEY,
            amount: total * 100,
            currency: 'INR',
            name: 'RAHUL MOBILE',
            description: 'Order Payment',
            handler: function (response) {
                showToast('✅ Payment Success! ID: ' + response.razorpay_payment_id);
                sendOrderToWhatsApp(response.razorpay_payment_id, custInfo);
                cart = [];
                updateCart();
                closeCart();
            },
            prefill: {
                name: custInfo.name,
                email: custInfo.email,
                contact: custInfo.phone
            },
            notes: {
                address: `${custInfo.address}, ${custInfo.city}, ${custInfo.state} - ${custInfo.pincode}`
            },
            theme: { color: '#8b5cf6' }
        };
        
        const rzp = new Razorpay(options);
        rzp.open();
    });
}

function sendOrderToWhatsApp(paymentId, custInfo) {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let msg = '✅ *PAYMENT SUCCESS*\n\n';
    msg += '*RAHUL MOBILE*\n━━━━━━━━━━━━\n\n';
    msg += `💳 Payment: ${paymentId}\n\n`;
    msg += `👤 *Customer:*\n${custInfo.name}\n${custInfo.phone}\n${custInfo.email || 'N/A'}\n\n`;
    msg += `📍 *Address:*\n${custInfo.address}\n${custInfo.city}, ${custInfo.state} - ${custInfo.pincode}\n\n`;
    msg += `📦 *Items:*\n`;
    
    cart.forEach((item, i) => {
        msg += `${i + 1}. ${item.name}\n   ₹${item.price.toLocaleString()} x ${item.quantity}\n\n`;
    });
    
    msg += `💰 *TOTAL: ₹${total.toLocaleString()}*`;
    
    window.open(`https://wa.me/918764719889?text=${encodeURIComponent(msg)}`, '_blank');
}

console.log('✅ Enhanced Features: Customer Details FIRST → Payment SECOND');
