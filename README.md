The backend API is hosted at:'http://15.207.196.169:5000/' 

Tech Stack
Node.js & Express.js: REST API framework
MongoDB: Database for storing user and application data
AWS EC2 + PM2: Deployment and process management
JWT + Bcrypt: User authentication and password security

API Endpoints / Routes
POST /signup
Allows employees to create an account. Required fields: email, contact number, password.

POST /login
Allows employees to log in using either email ID or contact number.

GET /dashboard-customer
Retrieves customers whose policy renewal date is within the next 7 days for employee follow-up.

POST /add-customer
Adds new customers and their policies. Supports:
Adding a first-time customer with a policy
Adding additional policies to existing customers

GET /dashboard-values
Provides statistics for the dashboard such as total customers, policies, claims, and last month claims. Data is fetched when the page is refreshed.

GET /customer-details
Returns all customer data along with their policy details for display on the customers page.

POST /claim
Allows customers to file claims on damaged assets by uploading documents. The claim is initialized as 'under process'. Employees can later update the claim status.

Database:
MongoDB is used for data storage.
The schema supports customers, multiple insurance policies per customer, claims, and employee data.

Deployment
Deployed on an AWS EC2 instance.
PM2 is used for process management to keep the backend services running smoothly.s
