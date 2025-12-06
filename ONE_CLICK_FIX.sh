#!/bin/bash

###############################################################################
# ONE CLICK BUFFERING FIX
###############################################################################
# This script automatically fixes the buffering issue in one command!
#
# Usage:
#   bash ONE_CLICK_FIX.sh
#
# What it does:
#   1. Checks if fix is already applied
#   2. Adds fix-buffering.js to index.html
#   3. Commits and pushes changes
#   4. Done!
###############################################################################

set -e  # Exit on error

echo "============================================================"
echo "  🔧 ONE CLICK BUFFERING FIX"
echo "============================================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if index.html exists
if [ ! -f "index.html" ]; then
    echo -e "${RED}❌ Error: index.html not found!${NC}"
    echo -e "${YELLOW}💡 Make sure you're in the repository directory${NC}"
    echo "   Run: cd rahulmobile-site"
    exit 1
fi

echo -e "${BLUE}📖 Checking index.html...${NC}"

# Check if already fixed
if grep -q "fix-buffering.js" index.html; then
    echo -e "${GREEN}✅ Already fixed! fix-buffering.js is already included.${NC}"
    echo ""
    echo -e "${YELLOW}🌐 Your website should be working now!${NC}"
    echo "   Visit: https://rahulprasadjai-a11y.github.io/rahulmobile-site/"
    exit 0
fi

echo -e "${BLUE}🔨 Applying buffering fix...${NC}"

# Create backup
cp index.html index.html.backup
echo -e "${GREEN}✅ Backup created: index.html.backup${NC}"

# Add the fix before </body>
# Using sed to insert before </body>
sed -i.tmp 's|</body>|    <!-- Emergency Fix for Buffering Issue -->\n    <script src="fix-buffering.js"></script>\n    \n</body>|' index.html

# Remove temp file
rm -f index.html.tmp

echo -e "${GREEN}✅ Fix applied to index.html!${NC}"
echo ""

# Show what was added
echo -e "${BLUE}📝 Added these lines before </body>:${NC}"
echo "    <!-- Emergency Fix for Buffering Issue -->"
echo "    <script src=\"fix-buffering.js\"></script>"
echo ""

# Git operations
echo -e "${BLUE}🚀 Committing changes...${NC}"

git add index.html

if git commit -m "Fix buffering issue - Add fix-buffering.js"; then
    echo -e "${GREEN}✅ Changes committed!${NC}"
else
    echo -e "${YELLOW}⚠️  Commit failed (maybe no changes?)${NC}"
fi

echo ""
echo -e "${BLUE}📤 Pushing to GitHub...${NC}"

if git push; then
    echo -e "${GREEN}✅ Changes pushed successfully!${NC}"
else
    echo -e "${RED}❌ Push failed!${NC}"
    echo -e "${YELLOW}💡 You may need to push manually:${NC}"
    echo "   git push"
    exit 1
fi

echo ""
echo "============================================================"
echo -e "  ${GREEN}🎉 BUFFERING FIX COMPLETE!${NC}"
echo "============================================================"
echo ""
echo -e "${YELLOW}⏱️  Next steps:${NC}"
echo "   1. Wait 1-2 minutes for GitHub Pages to rebuild"
echo "   2. Clear browser cache (Ctrl+Shift+Delete)"
echo "   3. Hard refresh page (Ctrl+Shift+R)"
echo "   4. Visit: https://rahulprasadjai-a11y.github.io/rahulmobile-site/"
echo ""
echo -e "${GREEN}✅ Buffering should be fixed!${NC}"
echo ""
echo -e "${BLUE}🔍 To verify:${NC}"
echo "   - Open browser console (F12)"
echo "   - Look for: '✅ Emergency Fix: All missing functions loaded!'"
echo ""
echo "============================================================"
