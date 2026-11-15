# import os
# from fastapi import FastAPI, File, UploadFile, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.responses import FileResponse
# import uuid
# from sam_segmentation import segmenter
# from recolor import recolor_image

# app = FastAPI()

# # Configure CORS
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Ensure directories exist
# os.makedirs("uploads", exist_ok=True)
# os.makedirs("results", exist_ok=True)
# os.makedirs("models", exist_ok=True)

# @app.post("/upload")
# async def upload_image(file: UploadFile = File(...), color: str = "#3498db"):
#     try:
#         # Generate unique filename
#         file_extension = file.filename.split(".")[-1]
#         filename = f"{uuid.uuid4()}.{file_extension}"
#         upload_path = f"uploads/{filename}"
#         result_path = f"results/{filename}"
        
#         # Save uploaded file
#         with open(upload_path, "wb") as buffer:
#             content = await file.read()
#             buffer.write(content)
        
#         # Process image with SAM
#         segmentation_mask = segmenter.segment_walls(upload_path)
        
#         # Recolor the image
#         recolor_image(upload_path, segmentation_mask, color, result_path)
        
#         return {"filename": filename}
    
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# @app.get("/result/{filename}")
# async def get_result(filename: str):
#     result_path = f"results/{filename}"
#     if not os.path.exists(result_path):
#         raise HTTPException(status_code=404, detail="File not found")
#     return FileResponse(result_path)

# @app.get("/")
# async def root():
# #     return {"message": "Recoloring API is running"}
# import os
# import numpy as np  # IMPORT ADDED
# from fastapi import FastAPI, File, UploadFile, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.responses import FileResponse, JSONResponse
# import uuid
# from sam_segmentation import segmenter
# from recolor import recolor_image
# import traceback

# app = FastAPI()

# # Configure CORS
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Ensure directories exist
# os.makedirs("uploads", exist_ok=True)
# os.makedirs("results", exist_ok=True)
# os.makedirs("models", exist_ok=True)

# @app.post("/upload")
# async def upload_image(file: UploadFile = File(...), color: str = "#3498db"):
#     try:
#         # Generate unique filename
#         file_extension = file.filename.split(".")[-1]
#         filename = f"{uuid.uuid4()}.{file_extension}"
#         upload_path = f"uploads/{filename}"
#         result_path = f"results/{filename}"
        
#         # Save uploaded file
#         with open(upload_path, "wb") as buffer:
#             content = await file.read()
#             buffer.write(content)
        
#         print(f"Processing image: {filename}")
        
#         # Process image with SAM for wall detection
#         segmentation_mask = segmenter.segment_walls(upload_path)
        
#         # Check if we found a reasonable mask (using np.sum)
#         mask_area = np.sum(segmentation_mask > 0)
#         if mask_area < 1000:  # Minimum area threshold
#             return JSONResponse(
#                 status_code=400,
#                 content={"error": "Could not detect walls clearly. Please try a different image with clearer walls."}
#             )
        
#         # Recolor the image
#         recolor_image(upload_path, segmentation_mask, color, result_path)
        
#         print(f"Processing complete: {filename}")
#         return {"filename": filename, "message": "Processing successful"}
    
#     except Exception as e:
#         error_trace = traceback.format_exc()
#         print(f"Error processing image: {error_trace}")
#         raise HTTPException(status_code=500, detail=f"Processing error: {str(e)}")

# @app.get("/result/{filename}")
# async def get_result(filename: str):
#     result_path = f"results/{filename}"
#     if not os.path.exists(result_path):
#         raise HTTPException(status_code=404, detail="File not found")
#     return FileResponse(result_path)

# @app.get("/")
# async def root():
#     return {"message": "Recoloring API is running"}

# @app.get("/health")
# async def health_check():
#     return {"status": "healthy", "service": "Indecor API"}

# # Add a test endpoint for debugging
# @app.get("/test-sam")
# async def test_sam():
#     try:
#         # Test if SAM model loads
#         from sam_segmentation import segmenter
#         return {"status": "SAM loaded", "device": segmenter.device}
#     except Exception as e:
#         return {"status": "SAM error", "error": str(e)}
# main.py - Fixed version
# import os
# import numpy as np
# from fastapi import FastAPI, File, UploadFile, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.responses import FileResponse, JSONResponse
# import uuid
# import traceback
#
# # Import after ensuring dependencies are installed
# try:
#     from sam_segmentation import segmenter
#     from recolor import recolor_image
# except ImportError as e:
#     print(f"Import error: {e}")
#     # Create mock functions for testing
#     def recolor_image(*args, **kwargs):
#         raise Exception("Recolor module not properly installed")
#
#     class MockSegmenter:
#         def segment_walls(self, path):
#             return np.zeros((100, 100), dtype=np.uint8)
#
#     segmenter = MockSegmenter()
#
# app = FastAPI()
#
# # Configure CORS
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173", "http://localhost:5000"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )
#
# # Ensure directories exist
# os.makedirs("uploads", exist_ok=True)
# os.makedirs("results", exist_ok=True)
# os.makedirs("models", exist_ok=True)
#
# @app.post("/upload")
# async def upload_image(file: UploadFile = File(...), color: str = "#3498db"):
#     try:
#         # Generate unique filename
#         file_extension = file.filename.split(".")[-1]
#         filename = f"{uuid.uuid4()}.{file_extension}"
#         upload_path = f"uploads/{filename}"
#         result_path = f"results/{filename}"
#
#         # Save uploaded file
#         with open(upload_path, "wb") as buffer:
#             content = await file.read()
#             buffer.write(content)
#
#         print(f"Processing image: {filename}")
#
#         # Process image with SAM for wall detection
#         segmentation_mask = segmenter.segment_walls(upload_path)
#
#         # Check if we found a reasonable mask
#         mask_area = np.sum(segmentation_mask > 0)
#         if mask_area < 1000:  # Minimum area threshold
#             return JSONResponse(
#                 status_code=400,
#                 content={"error": "Could not detect walls clearly. Please try a different image with clearer walls."}
#             )
#
#         # Recolor the image
#         recolor_image(upload_path, segmentation_mask, color, result_path)
#
#         print(f"Processing complete: {filename}")
#         return {"filename": filename, "message": "Processing successful"}
#
#     except Exception as e:
#         error_trace = traceback.format_exc()
#         print(f"Error processing image: {error_trace}")
#         raise HTTPException(status_code=500, detail=f"Processing error: {str(e)}")
#
# @app.get("/result/{filename}")
# async def get_result(filename: str):
#     result_path = f"results/{filename}"
#     if not os.path.exists(result_path):
#         raise HTTPException(status_code=404, detail="File not found")
#     return FileResponse(result_path)
#
# @app.get("/")
# async def root():
#     return {"message": "Recoloring API is running"}
#
# @app.get("/health")
# async def health_check():
#     return {"status": "healthy", "service": "Indecor API"}
#
# # Add a test endpoint for debugging
# @app.get("/test-sam")
# async def test_sam():
#     try:
#         # Test if SAM model loads
#         from sam_segmentation import segmenter
#         return {"status": "SAM loaded", "device": segmenter.device}
#     except Exception as e:
#         return {"status": "SAM error", "error": str(e)}