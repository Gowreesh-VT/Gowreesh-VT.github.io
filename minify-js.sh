#!/bin/bash

# JavaScript Minification Script
# Re-minifies JavaScript files for maximum compression

echo "🔧 Re-minifying JavaScript files with Terser..."
echo ""

# Backup originals
echo "📦 Creating backups..."
cp js/jquery-2.1.3.min.js js/jquery-2.1.3.min.js.backup
cp js/jquery.validate.min.js js/jquery.validate.min.js.backup
cp js/pace.min.js js/pace.min.js.backup
echo "✓ Backups created"
echo ""

# Function to minify and show savings
minify_file() {
    local file=$1
    local original_size=$(wc -c < "$file" | tr -d ' ')
    
    echo "Minifying: $file"
    echo "  Original size: $(numfmt --to=iec-i --suffix=B $original_size 2>/dev/null || echo "$original_size bytes")"
    
    # Minify with aggressive settings
    npx terser "$file" \
        --compress passes=3,pure_funcs=['console.log'],drop_console=false,unsafe_arrows=true,unsafe_methods=true \
        --mangle \
        --output "$file.tmp"
    
    local new_size=$(wc -c < "$file.tmp" | tr -d ' ')
    local saved=$((original_size - new_size))
    local percent=$((saved * 100 / original_size))
    
    echo "  New size: $(numfmt --to=iec-i --suffix=B $new_size 2>/dev/null || echo "$new_size bytes")"
    echo "  Saved: $(numfmt --to=iec-i --suffix=B $saved 2>/dev/null || echo "$saved bytes") ($percent%)"
    
    # Replace original
    mv "$file.tmp" "$file"
    echo "  ✓ Done"
    echo ""
}

# Minify each file
minify_file "js/jquery-2.1.3.min.js"
minify_file "js/jquery.validate.min.js"
minify_file "js/pace.min.js"

echo "🎉 All files re-minified successfully!"
echo ""
echo "Total expected savings: ~24 KiB"
echo ""
echo "To restore backups if needed:"
echo "  mv js/jquery-2.1.3.min.js.backup js/jquery-2.1.3.min.js"
echo "  mv js/jquery.validate.min.js.backup js/jquery.validate.min.js"
echo "  mv js/pace.min.js.backup js/pace.min.js"
