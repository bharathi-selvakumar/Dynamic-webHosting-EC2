# Dynamic-webHosting-EC2
🚀 MERN Stack File Upload Web App Deployed on AWS EC2

This is a full-stack web application where users can upload images or files through a React frontend. The uploaded files are securely stored in an AWS S3 bucket via an Express backend API. The entire project is deployed on a single EC2 instance with **Nginx** handling reverse proxy and **PM2** ensuring backend reliability.


## 📂 Project Structure

Dynamic-webHosting-EC2/
├── web-hosting-ec2-frontend/ # React frontend
└── web-hosting-ec2-backend/ # Express backend


## 🛠️ Technologies Used

### 🔹 Frontend
- React
- Axios
- Material-UI

### 🔹 Backend
- Node.js
- Express.js
- Multer
- AWS SDK (IAM Role-based access to S3)

### 🔹 Cloud & DevOps
- Amazon EC2 (Amazon Linux)
- Amazon S3
- Nginx
- PM2
- IAM Roles (No access keys used)
- Git & GitHub

---

## ✨ Features

- 📤 Upload files/images to AWS S3
- 🌐 View uploaded files in a responsive gallery
- 🔒 Secure backend access using IAM Role (no credentials exposed)
- 🔁 Reverse proxy with Nginx for routing frontend & backend APIs
- 🟢 Persistent backend using PM2
- 🎯 REST API architecture

---

## 🧑‍💻 Local Development

### 📦 Frontend

```bash
cd web-hosting-ec2-frontend
npm install
npm start
Runs React app at http://localhost:3000

💻 Backend
bash
Copy
Edit
cd web-hosting-ec2-backend
npm install
node index.js
Runs Express server at http://localhost:5000

➕ .env file setup
env
Copy
Edit
AWS_BUCKET_NAME=your-s3-bucket-name
AWS_REGION=ap-south-1
PORT=5000
Access credentials are handled via IAM Role, not access keys.

🚀 Deployment on EC2
✅ Steps Followed:
Create an EC2 Instance (Amazon Linux)

Attach IAM Role with AmazonS3FullAccess

Clone the Repo

Install required tools: Node.js, PM2, Nginx

Build frontend and configure Nginx

Start backend with PM2

Configure Nginx reverse proxy

🔁 Nginx Configuration
nginx
Copy
Edit
location /api/ {
    proxy_pass http://localhost:5000/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
React static files served from /usr/share/nginx/html

📸 Screenshot / Thumbnail

