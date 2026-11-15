# import cv2
# import numpy as np
# from PIL import Image

# def recolor_image(image_path, mask, target_color_hex, output_path):
#     # Load image
#     image = cv2.imread(image_path)
#     image = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)  # Convert to LAB for better color preservation
    
#     # Convert hex color to BGR
#     target_color_bgr = hex_to_bgr(target_color_hex)
#     target_color_lab = cv2.cvtColor(np.uint8([[target_color_bgr]]), cv2.COLOR_BGR2LAB)[0][0]
    
#     # Get mask region
#     mask_bool = mask > 128
    
#     # Calculate average luminance and color in the masked area
#     region = image[mask_bool]
#     if len(region) > 0:
#         mean_l = np.mean(region[:, 0])
#         mean_a = np.mean(region[:, 1])
#         mean_b = np.mean(region[:, 2])
        
#         # Calculate color differences
#         diff_a = target_color_lab[1] - mean_a
#         diff_b = target_color_lab[2] - mean_b
        
#         # Apply color change while preserving luminance and texture
#         image[:, :, 1] = np.where(mask_bool, np.clip(image[:, :, 1] + diff_a, 0, 255), image[:, :, 1])
#         image[:, :, 2] = np.where(mask_bool, np.clip(image[:, :, 2] + diff_b, 0, 255), image[:, :, 2])
    
#     # Convert back to BGR and save
#     result = cv2.cvtColor(image, cv2.COLOR_LAB2BGR)
#     cv2.imwrite(output_path, result)
    
#     return output_path

# def hex_to_bgr(hex_color):
#     hex_color = hex_color.lstrip('#')
#     r = int(hex_color[0:2], 16)
#     g = int(hex_color[2:4], 16)
#     b = int(hex_color[4:6], 16)
#     return (b, g, r)
# recolor.py - Fixed version
import cv2
import numpy as np

def recolor_image(image_path, mask, target_color_hex, output_path):
    # Load image
    image = cv2.imread(image_path)
    original = image.copy()
    
    # Convert to LAB color space for better color preservation
    lab = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)
    
    # Convert hex color to LAB
    target_bgr = hex_to_bgr(target_color_hex)
    target_lab = cv2.cvtColor(np.uint8([[target_bgr]]), cv2.COLOR_BGR2LAB)[0][0]
    target_l, target_a, target_b = target_lab
    
    # Ensure mask is proper format
    mask_binary = (mask > 128).astype(np.uint8)
    
    # Calculate average luminance in masked area
    masked_pixels = l[mask_binary.astype(bool)]
    if len(masked_pixels) > 0:
        mean_luminance = np.mean(masked_pixels)
    else:
        mean_luminance = 100  # Default value
    
    # Adjust color while preserving luminance variations
    new_a = np.clip(a + (target_a - np.mean(a[mask_binary.astype(bool)])) if np.any(mask_binary) else a, 0, 255)
    new_b = np.clip(b + (target_b - np.mean(b[mask_binary.astype(bool)])) if np.any(mask_binary) else b, 0, 255)
    
    # Preserve original luminance to maintain shadows and highlights
    new_l = l.copy()
    
    # Merge channels and convert back to BGR
    new_lab = cv2.merge([new_l, new_a, new_b])
    result = cv2.cvtColor(new_lab, cv2.COLOR_LAB2BGR)
    
    # Create seamless blend
    blend_mask = cv2.GaussianBlur(mask_binary, (15, 15), 0) / 255.0
    blend_mask = np.stack([blend_mask, blend_mask, blend_mask], axis=2)
    
    # Blend original and recolored image
    final = (result * blend_mask + original * (1 - blend_mask)).astype(np.uint8)
    
    # Apply slight sharpening to maintain texture
    kernel = np.array([[-1,-1,-1], [-1,9,-1], [-1,-1,-1]])
    final = cv2.filter2D(final, -1, kernel)
    
    cv2.imwrite(output_path, final)
    return output_path

def hex_to_bgr(hex_color):
    hex_color = hex_color.lstrip('#')
    r = int(hex_color[0:2], 16)
    g = int(hex_color[2:4], 16)
    b = int(hex_color[4:6], 16)
    return (b, g, r)