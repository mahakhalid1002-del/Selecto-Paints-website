# import cv2
# import numpy as np
# import torch
# import torchvision
# from segment_anything import SamPredictor, sam_model_registry
# import os

# class SAMWallSegmenter:
#     def __init__(self, model_path="models/sam_vit_h_4b8939.pth"):
#         self.model_path = model_path
#         self.model = None
#         self.predictor = None
#         self.load_model()
    
#     def load_model(self):
#         """Load the SAM model"""
#         if not os.path.exists(self.model_path):
#             raise FileNotFoundError(f"SAM model not found at {self.model_path}")
        
#         sam = sam_model_registry["vit_h"](checkpoint=self.model_path)
#         self.predictor = SamPredictor(sam)
#         print("SAM model loaded successfully")
    
#     def segment_walls(self, image_path):
#         """Segment walls from the image using SAM"""
#         # Read image
#         image = cv2.imread(image_path)
#         image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        
#         # Set image for SAM
#         self.predictor.set_image(image)
        
#         # For automatic wall detection, we might need to use some heuristics
#         # or get user input for points. For now, let's assume walls are large
#         # contiguous areas that we can detect with some logic
        
#         # Get image segmentation mask (simplified version)
#         # In a real implementation, you'd use SAM's automatic mask generation
#         masks = self._generate_masks(image)
        
#         return masks
    
#     def _generate_masks(self, image):
#         """Generate masks for the image (simplified version)"""
#         # This is a placeholder - in reality, you'd use SAM's mask generation
#         # For now, let's create a simple mask based on color/edges
#         gray = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
#         edges = cv2.Canny(gray, 50, 150)
        
#         # Find contours and create mask
#         contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
#         mask = np.zeros_like(gray)
        
#         if contours:
#             # Find the largest contour (assuming it's the main wall)
#             largest_contour = max(contours, key=cv2.contourArea)
#             cv2.drawContours(mask, [largest_contour], -1, 255, thickness=cv2.FILLED)
        
#         return mask

# # Global segmenter instance
# segmenter = SAMWallSegmenter()
# sam_segmentation.py - Fixed version
import cv2
import numpy as np
import torch
from segment_anything import SamPredictor, sam_model_registry
import os
from PIL import Image

class SAMWallSegmenter:
    def __init__(self, model_path="models/sam_vit_h_4b8939.pth"):
        self.model_path = model_path
        self.predictor = None
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        print(f"Using device: {self.device}")
        self.load_model()
    
    def load_model(self):
        """Load the SAM model"""
        if not os.path.exists(self.model_path):
            raise FileNotFoundError(f"SAM model not found at {self.model_path}. Please download from: https://dl.fbaipublicfiles.com/segment_anything/sam_vit_h_4b8939.pth")
        
        try:
            # Check if CUDA is available
            if torch.cuda.is_available():
                self.device = "cuda"
                print("✅ Using CUDA (GPU)")
            else:
                self.device = "cpu" 
                print("⚠️ Using CPU (no GPU available)")
            
            sam = sam_model_registry["vit_h"](checkpoint=self.model_path)
            sam.to(device=self.device)
            self.predictor = SamPredictor(sam)
            print("✅ SAM model loaded successfully")
        except Exception as e:
            print(f"❌ Error loading SAM model: {e}")
            raise
    
    def segment_walls(self, image_path):
        """Segment walls, doors, and gates from the image using SAM"""
        try:
            # Read and preprocess image
            image = cv2.imread(image_path)
            if image is None:
                raise ValueError("Could not load image")
            
            image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            
            # Generate masks using SAM
            masks = self._generate_sam_masks(image_rgb)
            
            # Filter for architectural elements (walls, doors, gates)
            wall_mask = self._filter_architectural_elements(image_rgb, masks)
            
            return wall_mask
            
        except Exception as e:
            print(f"Error in segment_walls: {e}")
            # Fallback to basic detection
            return self._fallback_detection(image_path)
    
    def _generate_sam_masks(self, image):
        """Generate masks using SAM's automatic mask generation"""
        self.predictor.set_image(image)
        
        # Generate masks automatically
        masks, scores, _ = self.predictor.generate()
        
        # Sort masks by score (descending)
        sorted_indices = np.argsort(scores)[::-1]
        return masks[sorted_indices]
    
    def _filter_architectural_elements(self, image, masks):
        """Filter masks to identify walls, doors, and gates"""
        if len(masks) == 0:
            return self._fallback_detection_from_image(image)
        
        height, width = image.shape[:2]
        combined_mask = np.zeros((height, width), dtype=np.uint8)
        
        for i, mask in enumerate(masks):
            mask = mask.astype(np.uint8) * 255
            
            # Calculate mask properties
            area = np.sum(mask) / 255
            bbox = self._get_mask_bbox(mask)
            bbox_width = bbox[2] - bbox[0]
            bbox_height = bbox[3] - bbox[1]
            aspect_ratio = bbox_width / max(bbox_height, 1)
            
            # Characteristics of architectural elements:
            # - Large area (walls)
            # - Vertical rectangles (doors)
            # - Specific aspect ratios (gates)
            # - Connected to image edges (walls)
            
            area_ratio = area / (height * width)
            
            # Score based on architectural features
            score = 0
            
            # Walls: large areas, often connected to edges
            if area_ratio > 0.3:  # At least 30% of image
                score += 0.6
            
            # Doors: vertical rectangles with specific aspect ratio
            if 1.5 < aspect_ratio < 4.0 and area_ratio > 0.05:
                score += 0.3
            
            # Connection to image edges (typical for walls)
            edge_score = self._calculate_edge_connection(mask, height, width)
            score += edge_score * 0.4
            
            # Add to combined mask if score is high enough
            if score > 0.5:
                combined_mask = cv2.bitwise_or(combined_mask, mask)
        
        # If no good masks found, use fallback
        if np.sum(combined_mask) < 1000:
            return self._fallback_detection_from_image(image)
        
        return self._clean_mask(combined_mask)
    
    def _get_mask_bbox(self, mask):
        """Get bounding box of mask"""
        rows = np.any(mask, axis=1)
        cols = np.any(mask, axis=0)
        ymin, ymax = np.where(rows)[0][[0, -1]] if np.any(rows) else [0, 0]
        xmin, xmax = np.where(cols)[0][[0, -1]] if np.any(cols) else [0, 0]
        return (xmin, ymin, xmax, ymax)
    
    def _calculate_edge_connection(self, mask, height, width):
        """Calculate how connected the mask is to image edges"""
        edge_mask = np.zeros_like(mask)
        border_size = 10
        edge_mask[:border_size, :] = 255  # Top
        edge_mask[height-border_size:, :] = 255  # Bottom
        edge_mask[:, :border_size] = 255  # Left
        edge_mask[:, width-border_size:] = 255  # Right
        
        intersection = cv2.bitwise_and(mask, edge_mask)
        edge_pixels = np.sum(intersection > 0)
        total_edge_pixels = np.sum(edge_mask > 0)
        
        return edge_pixels / max(total_edge_pixels, 1)
    
    def _clean_mask(self, mask):
        """Clean up the mask using morphological operations"""
        kernel = np.ones((15, 15), np.uint8)
        
        # Close small holes and smooth edges
        mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)
        mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)
        
        # Fill holes
        contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        for contour in contours:
            area = cv2.contourArea(contour)
            if area > 500:  # Only fill substantial holes
                cv2.drawContours(mask, [contour], -1, 255, thickness=cv2.FILLED)
        
        return mask
    
    def _fallback_detection(self, image_path):
        """Fallback detection when SAM fails"""
        image = cv2.imread(image_path)
        image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        return self._fallback_detection_from_image(image_rgb)
    
    def _fallback_detection_from_image(self, image):
        """Basic wall detection as fallback"""
        # Convert to HSV for color-based detection
        hsv = cv2.cvtColor(image, cv2.COLOR_RGB2HSV)
        
        # Detect light-colored areas (typical for walls)
        lower_light = np.array([0, 0, 150])
        upper_light = np.array([180, 50, 255])
        mask = cv2.inRange(hsv, lower_light, upper_light)
        
        # Detect edges for structural elements
        gray = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
        edges = cv2.Canny(gray, 50, 150)
        
        # Combine masks
        combined = cv2.bitwise_or(mask, edges)
        
        # Clean up
        kernel = np.ones((10, 10), np.uint8)
        combined = cv2.morphologyEx(combined, cv2.MORPH_CLOSE, kernel)
        
        return combined

# Global segmenter instance
segmenter = SAMWallSegmenter()