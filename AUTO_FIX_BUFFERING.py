#!/usr/bin/env python3
"""
AUTOMATIC BUFFERING FIX SCRIPT
================================
This script automatically fixes the buffering issue by adding
the fix-buffering.js script to index.html

Usage:
    python3 AUTO_FIX_BUFFERING.py

Requirements:
    - Python 3.6+
    - Git repository cloned locally
"""

import os
import sys

def fix_buffering():
    """Add fix-buffering.js to index.html"""
    
    print("🔧 Starting automatic buffering fix...")
    
    # Check if index.html exists
    if not os.path.exists('index.html'):
        print("❌ Error: index.html not found!")
        print("💡 Make sure you're in the repository directory")
        print("   Run: cd rahulmobile-site")
        return False
    
    # Read current index.html
    print("📖 Reading index.html...")
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if already fixed
    if 'fix-buffering.js' in content:
        print("✅ Already fixed! fix-buffering.js is already included.")
        return True
    
    # Find the closing </body> tag
    if '</body>' not in content:
        print("❌ Error: Could not find </body> tag in index.html")
        return False
    
    # Add the fix before </body>
    print("🔨 Adding fix-buffering.js...")
    
    fix_line = '\n    <!-- Emergency Fix for Buffering Issue -->\n    <script src="fix-buffering.js"></script>\n    \n'
    
    # Replace </body> with fix + </body>
    content = content.replace('</body>', fix_line + '</body>')
    
    # Write back to file
    print("💾 Saving changes...")
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✅ SUCCESS! Buffering fix applied!")
    print("\n📋 Next steps:")
    print("   1. git add index.html")
    print("   2. git commit -m 'Fix buffering issue'")
    print("   3. git push")
    print("\n⏱️  Wait 1-2 minutes for GitHub Pages to rebuild")
    print("🌐 Then visit: https://rahulprasadjai-a11y.github.io/rahulmobile-site/")
    print("\n🎉 Buffering should be fixed!")
    
    return True

def auto_commit_push():
    """Automatically commit and push changes"""
    
    print("\n🚀 Auto-committing and pushing...")
    
    # Git add
    result = os.system('git add index.html')
    if result != 0:
        print("❌ Git add failed")
        return False
    
    # Git commit
    result = os.system('git commit -m "Fix buffering issue - Add fix-buffering.js"')
    if result != 0:
        print("⚠️  Commit failed (maybe no changes?)")
    
    # Git push
    result = os.system('git push')
    if result != 0:
        print("❌ Git push failed")
        print("💡 You may need to push manually:")
        print("   git push")
        return False
    
    print("✅ Changes pushed successfully!")
    return True

if __name__ == '__main__':
    print("=" * 60)
    print("  AUTOMATIC BUFFERING FIX FOR RAHUL MOBILE WEBSITE")
    print("=" * 60)
    print()
    
    # Fix the buffering
    if fix_buffering():
        print()
        
        # Ask if user wants to auto-commit
        try:
            response = input("🤔 Auto-commit and push? (y/n): ").lower().strip()
            if response == 'y' or response == 'yes':
                auto_commit_push()
            else:
                print("\n📋 Manual steps:")
                print("   git add index.html")
                print("   git commit -m 'Fix buffering issue'")
                print("   git push")
        except KeyboardInterrupt:
            print("\n\n👋 Cancelled. Don't forget to commit and push!")
            sys.exit(0)
    else:
        print("\n❌ Fix failed. Please check the errors above.")
        sys.exit(1)
    
    print("\n" + "=" * 60)
    print("  DONE! 🎉")
    print("=" * 60)
