# Learning Management System

## Quick Start

For more start options, access https://github.com/timm167/lms-backend/blob/main/USAGE.md

### 1. Ensure localhost 8000 is free
Otherwise you can manually change the base_url in the frontend at src/service/base_url after cloning.

### 2. Deploy Backend 
### Macbook /Linux
```
pip install python3
git clone https://github.com/timm167/lms-backend
cd lms-backend/lms-backend
python3 -m venv venv
source venv/bin/activate  
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
### Windows
```
pip install python3
git clone https://github.com/timm167/lms-backend
cd lms-backend/lms-backend
python3 -m venv venv
venv\Scripts\activate     # On Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
### 3. Deploy Frontend 

In a seperate terminal...

```
git clone https://github.com/timm167/lms-frontend-local.git
cd lms-frontend-local
npm install
npm run dev
```

### 4. Access
   
Go to http://localhost:5173/lms-frontend-local/ (or check terminal for other url)

## Questions

Please feel free to reach out to me if you have any questions or you are having problems.
