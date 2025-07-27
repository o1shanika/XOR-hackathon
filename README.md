<h1 align="center">🌐 Ahasa</h1>
<p align="center">
  <b>Empowering Sri Lankan Migrant Women Workers Around the World</b><br>
  <i>"A voice of safety, a path to support – from anywhere in the world."</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-In%20Development-orange?style=flat-square" />
  <img src="https://img.shields.io/badge/DPI%20Enabled-SLUDI%20|%20NDX%20|%20PayDPI-blueviolet?style=flat-square" />
  <img src="https://img.shields.io/badge/Built%20With-React%20Native%20%7C%20Node.js%20%7C%20MongoDB-yellow?style=flat-square" />
</p>

---

## 📱 About Ahasa

**Ahasa** is a mobile-first platform designed to support **Sri Lankan migrant women workers** by providing:
- ✅ Secure login with verified identity (**SLUDI**)
- 🆘 Instant access to emergency services & embassy data (**NDX**)
- 💸 Seamless money transfers to Sri Lanka (**PayDPI**)
- 📁 Safe digital locker for documents (contracts, IDs)
- 💬 Community support via in-app messaging

---

<div align="center">
  <img src="https://user-images.githubusercontent.com/your-app-preview.png" width="60%" alt="Ahasa App Preview">
  <img width="512" height="512" alt="8727713" src="https://github.com/user-attachments/assets/dbed11f0-a9fe-4a62-aa0e-9c1993cd271d" />

</div>

---

## 💡 Problem Statement

> Many Sri Lankan women working abroad face **isolation**, **risk**, and **difficulty accessing help or sending money home** securely.

Ahasa bridges this gap by offering a unified, secure mobile platform built on Sri Lanka’s Digital Public Infrastructure (DPI).

---

## 🔐 DPI Stack Integration

| DPI Tool   | Ahasa Functionality                          |
|------------|----------------------------------------------|
| **SLUDI**  | Identity verification for migrant workers    |
| **NDX**    | Access to embassy data, document storage     |
| **PayDPI** | Remittance and digital payments (sandbox)    |

---

## 🚀 Features

- 👩‍💼 SLUDI-based secure user login
- 📍 Emergency contact directory (via NDX)
- 💬 Safe chat & community for migrant women
- 💸 Send money securely via PayDPI (simulated)
- 📂 Upload and store ID/passport in digital locker
- 🌐 Multilingual support (Sinhala, Tamil, English)

---

## 🛠 Tech Stack

| Component       | Technology Used           |
|------------------|---------------------------|
| Mobile App       | React Native              |
| Backend API      | Node.js, Express.js       |
| Database         | MongoDB (Cloud Atlas)     |
| Auth & Identity  | SLUDI Sandbox (OAuth2)    |
| Data Access      | NDX Sandbox (REST APIs)   |
| Payments         | PayDPI Sandbox            |
| Deployment       | Docker, GitHub Actions    |

---

## 🔁 User Flow Diagram

<div align="center">
  <img src="https://user-images.githubusercontent.com/your-flow-diagram.png" width="70%" alt="Ahasa User Flow">
</div>

---

## 📂 Folder Structure

```bash
ahasa/
├── README.md
├── docs/
│   ├── problem.md
│   └── solution.md
├── client/             # React Native App
├── server/             # Node.js API
│   ├── routes/
│   └── controllers/
├── database/           # MongoDB connection
└── api/
    └── openapi.yaml    # Swagger API documentation


