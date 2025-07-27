# 🌐 Ahasa – Empowering Sri Lankan Migrant Women Workers

> **"A voice of safety, a path to support – from anywhere in the world."**

Ahasa is a mobile-first platform designed to support **Sri Lankan migrant women workers** by offering secure identity verification, access to emergency contacts, and seamless money transfers. Built for the **ReviveNation Hackathon**, Ahasa leverages **Sri Lanka's Digital Public Infrastructure (SLUDI, NDX, and PayDPI)** to deliver real-time value, protection, and empowerment to one of the most underserved communities.

---

## 💡 Problem Statement

Many Sri Lankan women working abroad face:
- Isolation and lack of support
- Difficulty sending money home securely
- Limited access to verified legal or emergency contacts

These challenges create **vulnerabilities in safety, financial stability, and dignity**.

---

## 🚀 Our Solution

Ahasa offers:
- ✅ **SLUDI-based Secure Login**: Verified identity login for safe access
- 🆘 **Emergency Support**: Pull embassy/NGO contacts through NDX
- 💸 **Money Transfers**: Send funds via PayDPI simulation (escrow-enabled)
- 📁 **Document Locker**: Store passport copies, contracts, IDs (NDX-based)
- 🌍 **Multilingual & Accessible** UI for ease of use abroad

---

## 🔧 Tech Stack & DPI Integration

| Layer       | Technology             |
|-------------|-------------------------|
| **Frontend** | Flutter Progressive Web App (PWA) |
| **Identity** | SLUDI Sandbox |
| **Data**     | NDX Sandbox (embassy contacts, user profiles) |
| **Payments** | PayDPI Sandbox |
| **Infrastructure** | Docker, Kubernetes (helm charts), GitHub Actions |

---

## 📲 User Flow

1. **User signs in** via SLUDI (OAuth-based)
2. **App pulls embassy data** using NDX sandbox
3. **User sends money** home via PayDPI sandbox (secure & trackable)

---

## 🔗 API Design (OpenAPI)

- RESTful API with clean, reusable endpoints
- Fully documented on Swagger-UI (`/api`)
- Postman collection included

---

## ⚙️ Setup & Deployment

```bash
# Clone the repo
git clone https://github.com/your-username/ahasa-hackathon.git
cd ahasa-hackathon

# Deploy with Helm (sample)
helm install ahasa ./helm

# Run frontend (Flutter PWA)
flutter run -d chrome
