#!/bin/bash

# Exit on error
set -e

# Get version from manifest.json
VERSION=$(jq -r .version manifest.json)
PACKAGE_NAME="frc-tooltip-v$VERSION.zip"

echo "Packaging FRC Tooltip v$VERSION..."

# Ensure icons directory exists
mkdir -p icons

# Generate icons if 128px exists but others are missing
if [ -f "icons/icon128.png" ]; then
    if [ ! -f "icons/icon16.png" ] || [ ! -f "icons/icon48.png" ]; then
        echo "Generating missing icon sizes from icons/icon128.png..."
        sips -z 16 16 icons/icon128.png --out icons/icon16.png > /dev/null
        sips -z 48 48 icons/icon128.png --out icons/icon48.png > /dev/null
    fi
else
    echo "Warning: icons/icon128.png not found. Package may be rejected by Chrome Web Store."
fi

# Remove old zip if it exists
rm -f "$PACKAGE_NAME"

# Create the zip package
# Only include files necessary for the extension
zip -r "$PACKAGE_NAME" \
    manifest.json \
    content.js \
    styles.css \
    teams.json \
    icons/ \
    -x "*.DS_Store"

echo "--------------------------------"
echo "Build successful: $PACKAGE_NAME"
echo "--------------------------------"
