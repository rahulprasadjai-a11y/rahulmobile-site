# Footer Update Instructions

## Changes Required in index.html

### 1. Replace "Customer Service" Section (Around Line 1355)

**FIND THIS:**
```html
            <div class="footer-section">
                <h3>Customer Service</h3>
                <ul class="footer-links">
                    <li><a href="#">Shipping Policy</a></li>
                    <li><a href="#">Return Policy</a></li>
                    <li><a href="#">Warranty Info</a></li>
                    <li><a href="#">FAQs</a></li>
                </ul>
            </div>
```

**REPLACE WITH:**
```html
            <div class="footer-section">
                <h3>Legal & Policies</h3>
                <ul class="footer-links">
                    <li><a href="about.html">About Us</a></li>
                    <li><a href="privacy-policy.html">Privacy Policy</a></li>
                    <li><a href="terms-conditions.html">Terms & Conditions</a></li>
                    <li><a href="return-policy.html">Return & Refund Policy</a></li>
                </ul>
            </div>
```

### 2. Replace Footer Bottom Section (Around Line 1372)

**FIND THIS:**
```html
        <div class="footer-bottom">
            <p>&copy; 2024 Rahul Mobile. All rights reserved. | Designed with ❤️ in Dausa</p>
        </div>
```

**REPLACE WITH:**
```html
        <div class="footer-bottom">
            <div style="margin-bottom: 15px;">
                <a href="about.html" style="color: rgba(255,255,255,0.7); margin: 0 15px; text-decoration: none;">About</a> |
                <a href="privacy-policy.html" style="color: rgba(255,255,255,0.7); margin: 0 15px; text-decoration: none;">Privacy</a> |
                <a href="terms-conditions.html" style="color: rgba(255,255,255,0.7); margin: 0 15px; text-decoration: none;">Terms</a> |
                <a href="return-policy.html" style="color: rgba(255,255,255,0.7); margin: 0 15px; text-decoration: none;">Returns</a>
            </div>
            <p>&copy; 2024 Rahul Mobile. All rights reserved. | Designed with ❤️ in Dausa</p>
        </div>
```

## Legal Pages Already Created ✅

All legal pages are live and accessible:

- ✅ https://rahulprasadjai-a11y.github.io/rahulmobile-site/about.html
- ✅ https://rahulprasadjai-a11y.github.io/rahulmobile-site/privacy-policy.html
- ✅ https://rahulprasadjai-a11y.github.io/rahulmobile-site/terms-conditions.html
- ✅ https://rahulprasadjai-a11y.github.io/rahulmobile-site/return-policy.html

## How to Apply Changes

### Option 1: Manual Edit (Recommended)
1. Open `index.html` in your code editor
2. Find the sections mentioned above (use Ctrl+F / Cmd+F)
3. Replace with the new code
4. Save and commit

### Option 2: GitHub Web Interface
1. Go to https://github.com/rahulprasadjai-a11y/rahulmobile-site
2. Click on `index.html`
3. Click the pencil icon (Edit this file)
4. Make the changes
5. Commit directly to main branch

## Result

After applying these changes, your footer will have:
- ✅ Working links to all legal pages
- ✅ Professional "Legal & Policies" section
- ✅ Quick access links in footer bottom
- ✅ Improved user experience
- ✅ Better SEO and legal compliance
