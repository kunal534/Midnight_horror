#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}🎨 Image Optimization Script${NC}"
echo "================================"
echo ""

# Check if ImageMagick is installed
if ! command -v magick &> /dev/null; then
    echo -e "${RED}❌ ImageMagick not found!${NC}"
    echo "Install it with: brew install imagemagick"
    exit 1
fi

# Set directory
IMAGE_DIR="images"

# Count images
echo -e "${YELLOW}📊 Counting images...${NC}"
total_images=$(ls "$IMAGE_DIR"/*.jpg "$IMAGE_DIR"/*.jpeg "$IMAGE_DIR"/*.png 2>/dev/null | wc -l | tr -d ' ')

if [ "$total_images" -eq 0 ]; then
    echo -e "${RED}❌ No images found in $IMAGE_DIR${NC}"
    exit 1
fi

echo -e "${GREEN}Found $total_images images to optimize${NC}"
echo ""

# Calculate size before
size_before=$(du -sh "$IMAGE_DIR" | cut -f1)
echo -e "Original size: ${YELLOW}$size_before${NC}"
echo ""

# Process images
processed=0
skipped=0
echo -e "${YELLOW}🔄 Optimizing images...${NC}"
echo "--------------------------------"

# Function to optimize image
optimize_image() {
    local img="$1"
    local filename=$(basename "$img")
    local original_size=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img")
    local original_size_h=$(du -h "$img" | cut -f1)
    
    echo -e "Processing: ${GREEN}$filename${NC} ($original_size_h)"
    
    # Create temp file
    local temp_file="${img}.tmp"
    
    # Optimize with better settings
    magick "$img" \
        -filter Triangle \
        -define filter:support=2 \
        -resize 1200x1200\> \
        -quality 85 \
        -define jpeg:dct-method=float \
        -sampling-factor 4:2:0 \
        -strip \
        -interlace Plane \
        -colorspace sRGB \
        "$temp_file"
    
    if [ $? -eq 0 ]; then
        local new_size=$(stat -f%z "$temp_file" 2>/dev/null || stat -c%s "$temp_file")
        local new_size_h=$(du -h "$temp_file" | cut -f1)
        
        # Only replace if smaller
        if [ "$new_size" -lt "$original_size" ]; then
            mv "$temp_file" "$img"
            echo -e "  ✅ Optimized: $original_size_h → ${GREEN}$new_size_h${NC}"
            ((processed++))
        else
            rm "$temp_file"
            echo -e "  ⏭️  Skipped: Would increase size ($original_size_h → $new_size_h)"
            ((skipped++))
        fi
    else
        [ -f "$temp_file" ] && rm "$temp_file"
        echo -e "  ${RED}❌ Failed${NC}"
    fi
    echo ""
}

# Process all image types
for img in "$IMAGE_DIR"/*.{jpg,jpeg,png,JPG,JPEG,PNG}; do
    [ -e "$img" ] || continue
    optimize_image "$img"
done

# Calculate size after
echo "--------------------------------"
echo -e "${YELLOW}📊 Final Statistics${NC}"
echo "================================"
size_after=$(du -sh "$IMAGE_DIR" | cut -f1)
echo -e "Before:    ${YELLOW}$size_before${NC}"
echo -e "After:     ${GREEN}$size_after${NC}"
echo -e "Optimized: ${GREEN}$processed/$total_images images${NC}"
echo -e "Skipped:   ${YELLOW}$skipped/$total_images images${NC}"
echo ""
echo -e "${GREEN}✅ Done! Images optimized in place.${NC}"
