\# EasyDocs 📄



A decoupled organizational Document Management System (DMS) built with a Django (Python) REST API backend and a React (Vite) frontend.



\---



\## 🏗️ Project Architecture



```text

EasyDocs/

├── backend/          # Django REST API Engine

└── frontend/         # React SPA (Vite)



```



\* \*\*Backend Port:\*\* `http://127.0.0.1:8000/`

\* \*\*Frontend Port:\*\* `http://localhost:5174/`



\---



\## 🚀 Cloning \& Local Setup Instructions



Follow these exact steps when setting up the project on a new local machine.



\### 🐍 1. Backend Setup (Django)



1\. Navigate into the backend directory:

```bash

cd backend



```





2\. Create a clean Python virtual environment sandbox:

```bash

python -m venv env



```





3\. Activate the virtual environment:

\* \*\*On Windows PowerShell:\*\*

```powershell

.\\env\\Scripts\\Activate.ps1



```





\*(If script execution is disabled, run: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process`)\*

\* \*\*On macOS/Linux:\*\*

```bash

source env/bin/activate



```









4\. Install the required Python backend dependencies:

```bash

pip install django djangorestframework django-cors-headers



```





5\. Run database structural migrations:

```bash

python manage.py makemigrations

python manage.py migrate



```





6\. Fire up the Django local development server:

```bash

python manage.py runserver



```







\---



\### ⚡ 2. Frontend Setup (React + Vite)



1\. Open a new terminal window and navigate into the frontend directory:

```bash

cd frontend



```





2\. Install all core Node components and modules:

```bash

npm install



```





3\. Verify or recreate your local frontend environment file (`.env`):

Create a file named exactly `.env` in the root of the `frontend/` folder and add:

```text

VITE\_API\_URL=\[http://127.0.0.1:8000/api/](http://127.0.0.1:8000/api/)



```





4\. Launch the local React development server:

```bash

npm run dev



```







\---



\## 🛡️ Critical Version Control Remotes



This repository is strictly configured to communicate with your personal GitHub account. To maintain privacy boundaries on your work laptop, verify local settings using:



```bash

git config --local user.name "Savirar0"

git config --local user.email "navdeep2666@gmail.com"

git remote -v



```



```



\---



\### Step 3: Backup your progress to GitHub

Now that your local template files are pristine and documented, push everything up to your GitHub repository:



```powershell

git add .

git commit -m "Docs: Added root README setup documentation"

git push -u origin main



```

