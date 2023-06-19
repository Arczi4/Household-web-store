# Create venv
python -m venv .venv

# Installing packages
1. Activate venv:
.venv\Scripts\activate

2. Install packages:
pip install -r requirements.txt

3. Run:
python manage.py makemigrations
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
