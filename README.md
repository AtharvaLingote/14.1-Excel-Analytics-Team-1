# 14.1-Excel-Analytics-Team-1

This is a full-stack web application built using the **MERN** stack (MongoDB, Express, React, Node.js) that allows users to upload Excel files, visualize data in charts, and export charts as PDFs.

## 🚀 Features

- ✅ Upload `.xlsx` Excel files
- 📈 Auto-generate dynamic charts (Bar, Pie, etc.)
- 🎯 Select X and Y axes from dropdowns
- 🖨️ Export charts as PDF
- 💅 Clean UI with **Tailwind CSS** + **Mantine UI**
- ✨ Smooth animations with **Framer Motion**
- ⚙️ Backend storage using MongoDB

---

## 🛠️ Tech Stack

| Frontend | Backend | Styling | Charts | Export |
|----------|---------|---------|--------|--------|
| React.js | Node.js | Tailwind CSS | Chart.js | html2canvas |
| Axios    | Express | Mantine UI   | chart.js/2.9+ | jsPDF |
|          | MongoDB | Framer Motion |              |        |

---



## 📦 Setup Instructions

1.Clone the Repo
  git clone https://github.com/AtharvaLingote/14.1-Excel-Analytics-Team-1.git
  cd 14.1-Excel-Analytics-Team-1

2. Install Dependencies
# In root and client/server folders
  npm install
  cd client && npm install
  cd ../server && npm install
  
3.Setup Environment Variables
Create a .env file inside /server:
MONGO_URI=mongodb://127.0.0.1:27017/excelAnalytics

4. Run the App
  # In /server
  npm run dev

  # In /client (in separate terminal)
  npm start

## 📁 Folder Structure

/client       → React frontend (with Tailwind, Mantine, Framer Motion)
/server       → Express backend, Excel parsing, MongoDB handling


##🧑‍💻 Author

### Atharva Lingote
 💼 GitHub: [@AtharvaLingote](https://github.com/AtharvaLingote)
 
