// RAHUL MOBILE - Enhanced Features
// Product Detail Modal + Customer Info Form

// Enhanced Product Data with Full Details
const enhancedProducts = [
    {
        id: 1,
        name: "iPhone 15 Pro Max",
        price: 134900,
        originalPrice: 159900,
        discount: 16,
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800",
        images: [
            "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800",
            "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&sat=-100",
            "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&hue=180"
        ],
        category: "Smartphones",
        rating: 4.8,
        reviews: 245,
        badge: "Hot",
        description: "Experience the pinnacle of smartphone technology with the iPhone 15 Pro Max. Featuring the powerful A17 Pro chip, stunning titanium design, and revolutionary camera system.",
        features: [
            "6.7-inch Super Retina XDR display",
            "A17 Pro chip with 6-core GPU",
            "Pro camera system (48MP Main, 12MP Ultra Wide, 12MP Telephoto)",
            "Up to 29 hours video playback",
            "Titanium design with Ceramic Shield",
            "5G capable",
            "Face ID",
            "iOS 17"
        ],
        specifications: {
            "Display": "6.7-inch OLED, 2796 x 1290 pixels",
            "Processor": "A17 Pro chip",
            "RAM": "8GB",
            "Storage": "256GB / 512GB / 1TB",
            "Camera": "48MP + 12MP + 12MP",
            "Battery": "4422 mAh",
            "OS": "iOS 17"
        },
        inStock: true,
        warranty: "1 Year Apple India Warranty"
    },
    {
        id: 2,
        name: "Samsung Galaxy S24 Ultra",
        price: 124999,
        originalPrice: 134999,
        discount: 7,
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800",
        images: [
            "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800",
            "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&sat=-100",
            "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&hue=180"
        ],
        category: "Smartphones",
        rating: 4.7,
        reviews: 189,
        badge: "New",
        description: "The ultimate Android flagship with S Pen, AI-powered features, and the most advanced camera system Samsung has ever created.",
        features: [
            "6.8-inch Dynamic AMOLED 2X display",
            "Snapdragon 8 Gen 3 processor",
            "200MP main camera with AI zoom",
            "Built-in S Pen",
            "5000mAh battery with 45W fast charging",
            "Titanium frame",
            "Galaxy AI features",
            "Android 14 with One UI 6"
        ],
        specifications: {
            "Display": "6.8-inch AMOLED, 3120 x 1440 pixels",
            "Processor": "Snapdragon 8 Gen 3",
            "RAM": "12GB",
            "Storage": "256GB / 512GB / 1TB",
            "Camera": "200MP + 50MP + 12MP + 10MP",
            "Battery": "5000 mAh",
            "OS": "Android 14"
        },
        inStock: true,
        warranty: "1 Year Samsung India Warranty"
    },
    {
        id: 3,
        name: "OnePlus 12 Pro",
        price: 64999,
        originalPrice: 69999,
        discount: 7,
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800",
        images: [
            "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800",
            "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&sat=-100"
        ],
        category: "Smartphones",
        rating: 4.6,
        reviews: 156,
        description: "Flagship killer with Hasselblad camera, blazing fast charging, and premium build quality at an unbeatable price.",
        features: [
            "6.7-inch AMOLED display with 120Hz",
            "Snapdragon 8 Gen 2",
            "Hasselblad camera system",
            "100W SuperVOOC charging",
            "5000mAh battery",
            "OxygenOS 14",
            "Alert Slider",
            "In-display fingerprint sensor"
        ],
        specifications: {
            "Display": "6.7-inch AMOLED, 120Hz",
            "Processor": "Snapdragon 8 Gen 2",
            "RAM": "12GB / 16GB",
            "Storage": "256GB / 512GB",
            "Camera": "50MP + 48MP + 32MP",
            "Battery": "5000 mAh",
            "OS": "OxygenOS 14"
        },
        inStock: true,
        warranty: "1 Year OnePlus India Warranty"
    },
    {
        id: 5,
        name: "AirPods Pro (2nd Gen)",
        price: 24900,
        originalPrice: 26900,
        discount: 7,
        image: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800",
        images: [
            "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800"
        ],
        category: "Accessories",
        rating: 4.9,
        reviews: 312,
        badge: "Bestseller",
        description: "Premium wireless earbuds with active noise cancellation, spatial audio, and all-day battery life.",
        features: [
            "Active Noise Cancellation",
            "Adaptive Transparency mode",
            "Personalized Spatial Audio",
            "H2 chip for superior audio",
            "Up to 6 hours listening time",
            "MagSafe charging case",
            "Sweat and water resistant (IPX4)",
            "Touch control"
        ],
        specifications: {
            "Chip": "Apple H2",
            "Battery": "6 hours (ANC on)",
            "Case Battery": "30 hours total",
            "Connectivity": "Bluetooth 5.3",
            "Water Resistance": "IPX4",
            "Charging": "MagSafe, Lightning, Qi"
        },
        inStock: true,
        warranty: "1 Year Apple India Warranty"
    }
];

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

// Show Product Detail Modal
function showProductDetail(productId) {
    const product = enhancedProducts.find(p => p.id === productId) || 
                    products.find(p => p.id === productId);
    
    if (!product) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'productDetailModal';
    modal.style.display = 'block';
    
    const hasEnhancedData = enhancedProducts.find(p => p.id === productId);
    
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 900px; max-height: 90vh; overflow-y: auto;">
            <div class="modal-header" style="position: sticky; top: 0; background: white; z-index: 10;">
                <h2 style="margin: 0;">Product Details</h2>
                <span class="close" onclick="closeProductDetail()">&times;</span>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; padding: 20px;">
                <!-- Left: Images -->
                <div>
                    <div style="position: relative;">
                        ${product.badge ? `
                            <span style="position: absolute; top: 10px; left: 10px; background: #ef4444; 
                                         color: white; padding: 5px 15px; border-radius: 20px; font-size: 12px; 
                                         font-weight: 600; z-index: 1;">
                                ${product.badge}
                            </span>
                        ` : ''}
                        <img src="${product.image}" alt="${product.name}" 
                             style="width: 100%; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);"
                             id="mainProductImage">
                    </div>
                    
                    ${hasEnhancedData && product.images ? `
                        <div style="display: flex; gap: 10px; margin-top: 15px; overflow-x: auto;">
                            ${product.images.map((img, idx) => `
                                <img src="${img}" 
                                     onclick="document.getElementById('mainProductImage').src='${img}'"
                                     style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; 
                                            cursor: pointer; border: 2px solid ${idx === 0 ? '#8b5cf6' : '#ddd'};">
                            `).join('')}
                        </div>
                    ` : ''}
                    
                    <div style="margin-top: 20px; padding: 15px; background: #f0fdf4; border-radius: 8px; 
                                border-left: 4px solid #10b981;">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                            <span style="font-size: 20px;">✅</span>
                            <span style="font-weight: 600; color: #065f46;">In Stock</span>
                        </div>
                        <div style="color: #047857; font-size: 14px;">
                            ${hasEnhancedData ? product.warranty : 'Manufacturer Warranty Included'}
                        </div>
                    </div>
                </div>
                
                <!-- Right: Details -->
                <div>
                    <h1 style="margin: 0 0 10px 0; font-size: 28px; color: #1a1a1a;">
                        ${product.name}
                    </h1>
                    
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                        <div style="display: flex; align-items: center; gap: 5px;">
                            <span style="color: #f59e0b; font-size: 18px;">★</span>
                            <span style="font-weight: 600;">${product.rating}</span>
                            <span style="color: #666; font-size: 14px;">(${product.reviews} reviews)</span>
                        </div>
                        <span style="padding: 4px 12px; background: #e0e7ff; color: #4f46e5; 
                                     border-radius: 12px; font-size: 12px; font-weight: 600;">
                            ${product.category}
                        </span>
                    </div>
                    
                    <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 2px solid #e5e7eb;">
                        <div style="display: flex; align-items: baseline; gap: 15px; margin-bottom: 8px;">
                            <span style="font-size: 36px; font-weight: bold; color: #8b5cf6;">
                                ₹${product.price.toLocaleString()}
                            </span>
                            ${product.originalPrice ? `
                                <span style="font-size: 20px; color: #999; text-decoration: line-through;">
                                    ₹${product.originalPrice.toLocaleString()}
                                </span>
                            ` : ''}
                        </div>
                        ${product.discount ? `
                            <div style="color: #10b981; font-weight: 600; font-size: 16px;">
                                Save ${product.discount}% (₹${(product.originalPrice - product.price).toLocaleString()})
                            </div>
                        ` : ''}
                    </div>
                    
                    ${hasEnhancedData && product.description ? `
                        <div style="margin-bottom: 20px;">
                            <h3 style="margin-bottom: 10px; color: #1a1a1a;">About this product</h3>
                            <p style="color: #666; line-height: 1.6; font-size: 14px;">
                                ${product.description}
                            </p>
                        </div>
                    ` : ''}
                    
                    ${hasEnhancedData && product.features ? `
                        <div style="margin-bottom: 20px;">
                            <h3 style="margin-bottom: 10px; color: #1a1a1a;">Key Features</h3>
                            <ul style="margin: 0; padding-left: 20px; color: #666; line-height: 1.8;">
                                ${product.features.slice(0, 6).map(f => `<li>${f}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    
                    ${hasEnhancedData && product.specifications ? `
                        <div style="margin-bottom: 20px;">
                            <h3 style="margin-bottom: 10px; color: #1a1a1a;">Specifications</h3>
                            <div style="background: #f9fafb; padding: 15px; border-radius: 8px;">
                                ${Object.entries(product.specifications).map(([key, value]) => `
                                    <div style="display: flex; justify-content: space-between; padding: 8px 0; 
                                                border-bottom: 1px solid #e5e7eb;">
                                        <span style="font-weight: 600; color: #666;">${key}:</span>
                                        <span style="color: #1a1a1a;">${value}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    <div style="display: flex; gap: 10px; margin-top: 30px;">
                        <button onclick="addToCart(${product.id}); closeProductDetail();" 
                                style="flex: 1; padding: 15px; background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); 
                                       color: white; border: none; border-radius: 8px; font-size: 16px; 
                                       font-weight: 600; cursor: pointer; transition: all 0.3s;">
                            🛒 Add to Cart
                        </button>
                        <button onclick="addToCart(${product.id}); closeProductDetail(); openCart();" 
                                style="flex: 1; padding: 15px; background: #10b981; color: white; border: none; 
                                       border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; 
                                       transition: all 0.3s;">
                            ⚡ Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function closeProductDetail() {
    const modal = document.getElementById('productDetailModal');
    if (modal) modal.remove();
}

// Show Customer Info Form
function showCustomerInfoForm(onSubmit) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'customerInfoModal';
    modal.style.display = 'block';
    
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <div class="modal-header">
                <h2 style="margin: 0;">📋 Delivery Information</h2>
                <span class="close" onclick="closeCustomerInfoForm()">&times;</span>
            </div>
            
            <div style="padding: 20px;">
                <p style="color: #666; margin-bottom: 20px;">
                    Please provide your delivery details to complete the order.
                </p>
                
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
                                   placeholder="10-digit mobile number"
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
                                   placeholder="your@email.com (optional)"
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
                                   placeholder="6-digit PIN"
                                   pattern="[0-9]{6}"
                                   maxlength="6"
                                   style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; 
                                          font-size: 14px; transition: all 0.3s;"
                                   onfocus="this.style.borderColor='#8b5cf6'"
                                   onblur="this.style.borderColor='#e5e7eb'">
                        </div>
                    </div>
                    
                    <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin-bottom: 20px; 
                                border-left: 4px solid #f59e0b;">
                        <p style="margin: 0; color: #78350f; font-size: 13px; line-height: 1.6;">
                            <strong>📦 Delivery Note:</strong> Your order will be delivered to the address provided above. 
                            Please ensure all details are correct.
                        </p>
                    </div>
                    
                    <button type="submit"
                            style="width: 100%; padding: 15px; background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); 
                                   color: white; border: none; border-radius: 8px; font-size: 16px; 
                                   font-weight: 600; cursor: pointer; transition: all 0.3s;">
                        Continue to Payment →
                    </button>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Store callback
    window.customerInfoCallback = onSubmit;
}

function closeCustomerInfoForm() {
    const modal = document.getElementById('customerInfoModal');
    if (modal) modal.remove();
}

function submitCustomerInfo(event) {
    event.preventDefault();
    
    // Collect form data
    customerInfo = {
        name: document.getElementById('customerName').value.trim(),
        phone: document.getElementById('customerPhone').value.trim(),
        email: document.getElementById('customerEmail').value.trim(),
        address: document.getElementById('customerAddress').value.trim(),
        city: document.getElementById('customerCity').value.trim(),
        state: document.getElementById('customerState').value.trim(),
        pincode: document.getElementById('customerPincode').value.trim()
    };
    
    // Validate phone
    if (customerInfo.phone.length !== 10) {
        alert('Please enter a valid 10-digit phone number');
        return;
    }
    
    // Validate pincode
    if (customerInfo.pincode.length !== 6) {
        alert('Please enter a valid 6-digit PIN code');
        return;
    }
    
    // Close modal
    closeCustomerInfoForm();
    
    // Call callback with customer info
    if (window.customerInfoCallback) {
        window.customerInfoCallback(customerInfo);
    }
}

// Enhanced Checkout with Customer Info
function enhancedCheckoutRazorpay() {
    if (cart.length === 0) {
        showToast('⚠ Your cart is empty!');
        return;
    }
    
    // Show customer info form first
    showCustomerInfoForm((custInfo) => {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        const options = {
            key: RAZORPAY_KEY,
            amount: total * 100,
            currency: 'INR',
            name: 'RAHUL MOBILE',
            description: 'Order Payment',
            image: 'https://nyc3.digitaloceanspaces.com/bhindi-drive/files/91452e7d-ceec-4f57-a0a3-13430b79756b/2025-12-06T16-45-28-172Z-8a68267f-chat-image-1765039528152-0.jpg',
            handler: function (response) {
                showToast('✓ Payment Successful! Order ID: ' + response.razorpay_payment_id);
                sendEnhancedOrderConfirmation(response.razorpay_payment_id, custInfo);
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
            theme: {
                color: '#8b5cf6'
            }
        };
        
        const rzp = new Razorpay(options);
        rzp.open();
    });
}

function sendEnhancedOrderConfirmation(paymentId, custInfo) {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let message = '✅ *PAYMENT SUCCESSFUL*\\n\\n';
    message += '🛒 *RAHUL MOBILE - Order Confirmed*\\n';
    message += '━━━━━━━━━━━━━━━━━━━━\\n\\n';
    message += `💳 *Payment ID:* ${paymentId}\\n\\n`;
    message += `👤 *Customer Details:*\\n`;
    message += `Name: ${custInfo.name}\\n`;
    message += `Phone: ${custInfo.phone}\\n`;
    message += `Email: ${custInfo.email || 'N/A'}\\n\\n`;
    message += `📍 *Delivery Address:*\\n`;
    message += `${custInfo.address}\\n`;
    message += `${custInfo.city}, ${custInfo.state} - ${custInfo.pincode}\\n\\n`;
    message += `📦 *Order Items:*\\n`;
    
    cart.forEach((item, index) => {
        message += `${index + 1}. *${item.name}*\\n`;
        message += `   💰 Price: ₹${item.price.toLocaleString()}\\n`;
        message += `   📦 Quantity: ${item.quantity}\\n`;
        message += `   💵 Subtotal: ₹${(item.price * item.quantity).toLocaleString()}\\n\\n`;
    });
    
    message += '━━━━━━━━━━━━━━━━━━━━\\n';
    message += `💰 *TOTAL PAID: ₹${total.toLocaleString()}*\\n\\n`;
    message += '✅ Your order will be delivered soon!';
    
    const whatsappNumber = '918764719889';
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(url, '_blank');
}

console.log('✅ Enhanced Features Loaded: Product Details + Customer Info Form');
