## admin credentials
username: "waga"
password: "baga"


## backend setup
open new terminal
cd backend
cd myproject
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
py manage.py runserver
backend server live at http://127.0.0.1:8000/


## frontend setup
open new terminal
cd frontend
cd my-react-redux-app
npm install --force
npm start
backendserver live at http://localhost:3000


## admin credentials (CURD, image upload)
username: "waga"
password: "baga"


## docker
docker run -p 8080:8080 username/myproject
docker run -p 8080:8080 myproject


## Features
Checkout System: A seamless and secure checkout experience.
JWT Authentication: Ensures secure access and transactions.
PayPal Integration: Offers a reliable payment gateway.
Email Notifications: Sends automatic emails to users for various interactions.
Manager Area**: CRUD for products.


## Prerequisites
Python
Node.js and npm
Django
React
Redux
