# CourseNest 🎓💻  
_A MERN Stack Course Selling & Buying Platform with Razorpay Integration_

## 🚀 Overview  
CourseNest is a full-stack web application that allows instructors to create and sell courses, while students can purchase and access them. It includes Razorpay payment gateway integration for seamless transactions.

## 🛠️ Tech Stack  
- **Frontend:** React.js (Vite)  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** JWT (JSON Web Tokens)  
- **Payments:** Razorpay  

## ✨ Features  
✅ **Admin Panel** – Create, update, delete, and manage courses  
✅ **User Dashboard** – Track enrolled courses  
✅ **Secure Payments** – Transactions via Razorpay  
✅ **Course Management** – Categories, pricing, and descriptions  
✅ **Authentication & Authorization** – Secure login/signup using JWT  

## 📸 Screenshots  
_(Add screenshots of your app here to make it visually appealing)_  

## 🔧 Installation & Setup  

1️⃣ **Clone the repository**  
```sh
git clone https://github.com/iamAmanrajput/CourseNest.git
cd CourseNest
```

2️⃣ **Backend setup**  
```sh
cd backend
npm install
npm start
```

3️⃣ **Frontend setup**  
```sh
cd frontend
npm install
npm run dev
```

4️⃣ **Environment Variables Setup**  
Create a `.env` file in both backend and frontend directories and add the required credentials:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

## 💳 Payment Integration (Razorpay)  
- Admins can set course prices  
- Users can purchase courses via Razorpay  
- After successful payment, course access is granted  

## 🐝 Contributing  
Feel free to fork this repository and contribute!  

## 📄 License  
This project is **MIT Licensed**.  

If you like this project, don't forget to ⭐ star it!  

