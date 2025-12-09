// This script updates the footer section with legal page links
// Run this in browser console on your website

const footerHTML = `
            <div class="footer-section">
                <h3>Legal & Policies</h3>
                <ul class="footer-links">
                    <li><a href="about.html">About Us</a></li>
                    <li><a href="privacy-policy.html">Privacy Policy</a></li>
                    <li><a href="terms-conditions.html">Terms & Conditions</a></li>
                    <li><a href="return-policy.html">Return & Refund Policy</a></li>
                </ul>
            </div>
`;

const footerBottomHTML = `
        <div class="footer-bottom">
            <div style="margin-bottom: 15px;">
                <a href="about.html" style="color: rgba(255,255,255,0.7); margin: 0 15px; text-decoration: none;">About</a> |
                <a href="privacy-policy.html" style="color: rgba(255,255,255,0.7); margin: 0 15px; text-decoration: none;">Privacy</a> |
                <a href="terms-conditions.html" style="color: rgba(255,255,255,0.7); margin: 0 15px; text-decoration: none;">Terms</a> |
                <a href="return-policy.html" style="color: rgba(255,255,255,0.7); margin: 0 15px; text-decoration: none;">Returns</a>
            </div>
            <p>&copy; 2024 Rahul Mobile. All rights reserved. | Designed with ❤️ in Dausa</p>
        </div>
`;

console.log('Footer update HTML ready!');
console.log('Replace "Customer Service" section with:', footerHTML);
console.log('Replace footer-bottom with:', footerBottomHTML);
