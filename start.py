import os

def create_app_structure(base_dir="my_app"):
    folders = [
        f"{base_dir}/backend/app/api",
        f"{base_dir}/backend/app/models",
        f"{base_dir}/backend/app/schemas",
        f"{base_dir}/backend/app/services",
        f"{base_dir}/backend/app/utils",
        f"{base_dir}/backend/app/db",
        f"{base_dir}/frontend/public",
        f"{base_dir}/frontend/src/components",
        f"{base_dir}/frontend/src/pages",
        f"{base_dir}/frontend/src/services",
    ]

    files = {
        f"{base_dir}/backend/main.py": "# Entry point for FastAPI app\n",
        f"{base_dir}/backend/app/api/routes.py": "# Define API routes here\n",
        f"{base_dir}/backend/app/models/user.py": "# SQLAlchemy models for users\n",
        f"{base_dir}/backend/app/schemas/user.py": "# Pydantic schemas for users\n",
        f"{base_dir}/backend/app/services/auth.py": "# Authentication logic\n",
        f"{base_dir}/backend/app/utils/security.py": "# Security utils (e.g. password hashing)\n",
        f"{base_dir}/backend/app/db/database.py": "# Database connection and session\n",
        f"{base_dir}/frontend/src/main.jsx": "// React entry point\n",
        f"{base_dir}/frontend/src/App.jsx": "// Main React component\n",
        f"{base_dir}/frontend/src/pages/Login.jsx": "// Login page\n",
        f"{base_dir}/frontend/src/pages/Register.jsx": "// Register page\n",
        f"{base_dir}/frontend/src/pages/Schedule.jsx": "// Schedule appointment page\n",
        f"{base_dir}/frontend/src/pages/Dashboard.jsx": "// Employee dashboard with map\n",
    }

    for folder in folders:
        os.makedirs(folder, exist_ok=True)

    for file_path, content in files.items():
        with open(file_path, "w") as f:
            f.write(content)

    print(f"Structure for '{base_dir}' created.")

if __name__ == "__main__":
    create_app_structure()