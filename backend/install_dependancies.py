# install_dependencies.py - Fixed version
import subprocess
import sys
import os

def run_command(command):
    """Run a shell command and return output"""
    try:
        result = subprocess.run(command, shell=True, capture_output=True, text=True)
        return result.returncode, result.stdout, result.stderr
    except Exception as e:
        return -1, "", str(e)

def install_dependencies():
    print("Installing SAM-compatible dependencies...")
    
    # Check if we're in a virtual environment
    in_venv = hasattr(sys, 'real_prefix') or (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix)
    if not in_venv:
        print("⚠️  Warning: Not running in a virtual environment. It's recommended to use a virtual environment for Python projects.")
    
    # Install base packages
    commands = [
        "pip install numpy==1.24.4",
        "pip install opencv-python-headless==4.8.1.78",
        "pip install pillow==10.1.0",
        "pip install fastapi==0.104.1",
        "pip install uvicorn[standard]==0.24.0",
        "pip install python-multipart==0.0.6",
        "pip install matplotlib==3.7.1",
        "pip install typing-extensions==4.5.0",
        "pip install segment-anything==1.0"
    ]
    
    for cmd in commands:
        print(f"Running: {cmd}")
        returncode, stdout, stderr = run_command(cmd)
        if returncode != 0:
            print(f"Warning: {cmd} may have had issues")
            if stderr:
                print(f"Error: {stderr}")
    
    # Install PyTorch with CUDA support if available
    print("Installing PyTorch...")
    torch_cmd = "pip install torch==2.0.1 torchvision==0.15.2 --index-url https://download.pytorch.org/whl/cu118"
    returncode, stdout, stderr = run_command(torch_cmd)
    
    if returncode != 0:
        print("Falling back to CPU-only PyTorch...")
        run_command("pip install torch==2.0.1 torchvision==0.15.2 --index-url https://download.pytorch.org/whl/cpu")
    
    print("Installation completed!")
    print("\n⚠️  IMPORTANT: Download the SAM model manually from:")
    print("https://dl.fbaipublicfiles.com/segment_anything/sam_vit_h_4b8939.pth")
    print("And place it in the 'models' directory.")

if __name__ == "__main__":
    install_dependencies()