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
if ! command -v convert &> /dev/null; then
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
echo -e "${YELLOW}🔄 Optimizing images...${NC}"
echo "--------------------------------"

# Process JPG files
for img in "$IMAGE_DIR"/*.jpg; do
    [ -e "$img" ] || continue
    
    filename=$(basename "$img")
    original_size=$(du -h "$img" | cut -f1)
    
    echo -e "Processing: ${GREEN}$filename${NC} ($original_size)"
    
    convert "$img" -resize 1200x1200\> -quality 80 -strip "$img"
    
    if [ $? -eq 0 ]; then
        new_size=$(du -h "$img" | cut -f1)
        echo -e "  ✅ Optimized: $original_size → ${GREEN}$new_size${NC}"
        ((processed++))
    else
        echo -e "  ${RED}❌ Failed${NC}"
    fi
    echo ""
done

# Process JPEG files
for img in "$IMAGE_DIR"/*.jpeg; do
    [ -e "$img" ] || continue
    
    filename=$(basename "$img")
    original_size=$(du -h "$img" | cut -f1)
    
    echo -e "Processing: ${GREEN}$filename${NC} ($original_size)"
    
    convert "$img" -resize 1200x1200\> -quality 80 -strip "$img"
    
    if [ $? -eq 0 ]; then
        new_size=$(du -h "$img" | cut -f1)
        echo -e "  ✅ Optimized: $original_size → ${GREEN}$new_size${NC}"
        ((processed++))
    else
        echo -e "  ${RED}❌ Failed${NC}"
    fi
    echo ""
done

# Process PNG files
for img in "$IMAGE_DIR"/*.png; do
    [ -e "$img" ] || continue
    
    filename=$(basename "$img")
    original_size=$(du -h "$img" | cut -f1)
    
    echo -e "Processing: ${GREEN}$filename${NC} ($original_size)"
    
    magick "$img" -resize 1200x1200\> -quality 80 -strip "$img"
    
    if [ $? -eq 0 ]; then
        new_size=$(du -h "$img" | cut -f1)
        echo -e "  ✅ Optimized: $original_size → ${GREEN}$new_size${NC}"
        ((processed++))
    else
        echo -e "  ${RED}❌ Failed${NC}"
    fi
    echo ""
done

# Calculate size after
echo "--------------------------------"
echo -e "${YELLOW}📊 Final Statistics${NC}"
echo "================================"
size_after=$(du -sh "$IMAGE_DIR" | cut -f1)
echo -e "Before:    ${YELLOW}$size_before${NC}"
echo -e "After:     ${GREEN}$size_after${NC}"
echo -e "Optimized: ${GREEN}$processed/$total_images images${NC}"
echo ""
echo -e "${GREEN}✅ Done! Images optimized in place.${NC}"
