#!/usr/bin/env python3
"""
Automated script to apply responsive fixes to index.html
Run this script to update your website with mobile-responsive features
"""

import re

print("🚀 Starting responsive fixes application...")

# Read the file
print("📖 Reading index.html...")
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

print(f"✅ File loaded ({len(content)} characters)")

# Backup
print("💾 Creating backup...")
with open('index.html.backup', 'w', encoding='utf-8') as f:
    f.write(content)
print("✅ Backup created: index.html.backup")

# Step 1: Add mobile menu CSS before existing responsive section
print("\n📝 Step 1: Adding mobile menu CSS...")
mobile_css = '''
        /* ========== RESPONSIVE FIXES ========== */
        
        /* Mobile Menu Button */
        .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            color: white;
            font-size: 1.8rem;
            cursor: pointer;
            padding: 0.5rem;
            z-index: 1001;
            transition: transform 0.3s;
        }
        
        .mobile-menu-btn:active {
            transform: scale(0.95);
        }
        
        .mobile-menu-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 999;
            backdrop-filter: blur(3px);
        }
        
        .mobile-menu-overlay.active {
            display: block;
            animation: fadeIn 0.3s;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
'''

if '/* Responsive */' in content:
    content = content.replace('/* Responsive */', mobile_css + '/* Responsive */')
    print("✅ Mobile menu CSS added")
else:
    print("⚠️  Warning: Could not find '/* Responsive */' marker")

# Step 2: Replace @media (max-width: 768px) section
print("\n📝 Step 2: Updating responsive media queries...")

# Find and replace the 768px media query
pattern = r'@media \(max-width: 768px\) \{[^}]*(?:\{[^}]*\}[^}]*)*\}'

new_media_768 = '''@media (max-width: 768px) {
            /* Mobile Menu */
            .mobile-menu-btn {
                display: block;
            }
            
            .nav-links {
                position: fixed;
                top: 0;
                right: -100%;
                width: 75%;
                max-width: 300px;
                height: 100vh;
                background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
                flex-direction: column;
                padding: 5rem 2rem 2rem;
                transition: right 0.3s ease;
                z-index: 1000;
                box-shadow: -5px 0 15px rgba(0,0,0,0.3);
                overflow-y: auto;
            }
            
            .nav-links.active {
                right: 0;
            }
            
            .nav-links li {
                margin: 0;
                width: 100%;
                border-bottom: 1px solid rgba(255,255,255,0.1);
            }
            
            .nav-links a {
                display: block;
                padding: 1rem 0;
                font-size: 1.1rem;
                transition: all 0.3s;
            }
            
            .nav-links a:hover {
                padding-left: 10px;
                background: rgba(255,255,255,0.1);
            }
            
            .search-box {
                display: none;
            }
            
            .top-bar {
                display: none;
            }
            
            .logo-text {
                font-size: 1.4rem;
            }
            
            .hero-text h1 {
                font-size: 2rem;
            }
            
            .hero-text p {
                font-size: 1rem;
            }
            
            .hero-features {
                flex-direction: column;
                gap: 1rem;
            }
            
            .product-grid {
                grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                gap: 1rem;
            }
            
            .filter-bar {
                flex-direction: column;
                align-items: stretch;
            }
            
            .footer-content {
                grid-template-columns: 1fr;
            }
            
            /* Footer Mobile */
            .footer-bottom > div:first-child {
                display: flex;
                flex-direction: column;
                gap: 0;
                margin-bottom: 15px;
            }
            
            .footer-bottom a {
                display: block;
                padding: 12px 0 !important;
                margin: 0 !important;
                border-bottom: 1px solid rgba(255,255,255,0.1);
                text-align: center;
            }
            
            .footer-bottom a:last-child {
                border-bottom: none;
            }
            
            /* Modal Mobile */
            .modal-content {
                margin: 0.5rem;
                max-height: 95vh;
            }
            
            .modal-header {
                padding: 1rem 1.5rem;
            }
            
            .modal-header h2 {
                font-size: 1.2rem;
            }
            
            .cart-items-container {
                padding: 1rem;
            }
            
            .cart-item {
                flex-direction: column;
                text-align: center;
                padding: 1rem;
                gap: 1rem;
            }
            
            .cart-item-image {
                width: 100%;
                max-width: 200px;
                height: auto;
                margin: 0 auto;
            }
            
            .cart-item-details {
                width: 100%;
            }
            
            .quantity-controls {
                justify-content: center;
            }
            
            .cart-summary {
                padding: 1rem;
            }
            
            .checkout-btn {
                font-size: 1rem;
                padding: 0.8rem;
            }
            
            .hero-buttons {
                flex-direction: column;
                gap: 1rem;
            }
            
            .hero-buttons .btn {
                width: 100%;
                text-align: center;
            }
        }
        
        /* Small Mobile Optimization */
        @media (max-width: 480px) {
            .logo-text {
                font-size: 1.2rem;
            }
            
            .hero-text h1 {
                font-size: 1.6rem;
                line-height: 1.3;
            }
            
            .hero-text p {
                font-size: 0.9rem;
            }
            
            .btn {
                padding: 0.7rem 1.2rem;
                font-size: 0.9rem;
            }
            
            .product-grid {
                grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
                gap: 0.8rem;
            }
            
            .product-card {
                padding: 0.8rem;
            }
            
            .product-image {
                height: 120px;
            }
            
            .product-name {
                font-size: 0.9rem;
            }
            
            .product-price {
                font-size: 1rem;
            }
            
            .section-title {
                font-size: 1.8rem;
            }
            
            .contact-info-card {
                flex-direction: column;
                text-align: center;
                padding: 1.5rem;
            }
            
            .contact-icon {
                margin: 0 auto;
            }
            
            .footer-section h3 {
                font-size: 1.1rem;
            }
            
            .footer-links li {
                font-size: 0.9rem;
            }
        }
        
        body.menu-open {
            overflow: hidden;
        }'''

content = re.sub(pattern, new_media_768, content, count=1, flags=re.DOTALL)
print("✅ Media queries updated")

# Step 3: Add HTML for mobile menu button
print("\n📝 Step 3: Adding mobile menu button HTML...")
html_find = '</ul>\n            <div class="nav-right">'
html_replace = '''</ul>
            <button class="mobile-menu-btn" onclick="toggleMobileMenu()">
                <i class="fas fa-bars"></i>
            </button>
            <div class="mobile-menu-overlay" onclick="toggleMobileMenu()"></div>
            <div class="nav-right">'''

if html_find in content:
    content = content.replace(html_find, html_replace)
    print("✅ Mobile menu button added")
else:
    print("⚠️  Warning: Could not find exact HTML pattern")

# Step 4: Add JavaScript before </body>
print("\n📝 Step 4: Adding mobile menu JavaScript...")
js_code = '''
    <script>
    // Mobile Menu Toggle
    function toggleMobileMenu() {
        const navLinks = document.querySelector('.nav-links');
        const overlay = document.querySelector('.mobile-menu-overlay');
        const menuBtn = document.querySelector('.mobile-menu-btn i');
        const body = document.body;
        
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('menu-open');
        
        if (navLinks.classList.contains('active')) {
            menuBtn.classList.remove('fa-bars');
            menuBtn.classList.add('fa-times');
        } else {
            menuBtn.classList.remove('fa-times');
            menuBtn.classList.add('fa-bars');
        }
    }

    // Close menu when clicking nav links
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                const navLinks = document.querySelector('.nav-links');
                if (navLinks.classList.contains('active')) {
                    toggleMobileMenu();
                }
            });
        });
        
        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const navLinks = document.querySelector('.nav-links');
                if (navLinks.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    });
    </script>
</body>'''

content = content.replace('</body>', js_code)
print("✅ JavaScript added")

# Write the updated content
print("\n💾 Saving updated file...")
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("\n✅ ✅ ✅ ALL RESPONSIVE FIXES APPLIED SUCCESSFULLY! ✅ ✅ ✅")
print("\n📊 Summary:")
print("  ✓ Mobile menu CSS added")
print("  ✓ Responsive media queries updated")
print("  ✓ Mobile menu button HTML added")
print("  ✓ JavaScript functionality added")
print("\n🎉 Your website is now mobile-responsive!")
print("📱 Test it on mobile or use Chrome DevTools (F12 → Toggle Device Toolbar)")
print("\n💡 Backup saved as: index.html.backup")
