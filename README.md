````markdown
# ✈️ Airline Notification Service

This microservice handles email notifications for airline bookings, including ticket creation and automated email dispatch via a queue-based system (e.g., RabbitMQ).

---

## 📁 Project Structure

```plaintext
src/
  ├── config/         # Environment and database configurations
  ├── controllers/    # Route handlers
  ├── migrations/     # Sequelize migration files
  ├── models/         # Sequelize models
  ├── repositories/   # Data access layer
  ├── routes/         # API route definitions
  ├── seeders/        # Seed data for database
  ├── services/       # Business logic and mail service
  └── utils/          # Helper utilities (e.g., error handlers, logger)
````

---

## ⚙️ Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone <repo-url>
   cd airline-notification-service
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory:

   ```env
   PORT=3000
   GMAIL_EMAIL="your_gmail_address"
   GMAIL_APP_PASS="your_gmail_app_password"
   ```

4. **Initialize Sequelize (if not already):**

   ```bash
   npx sequelize init
   ```

5. **Set up your database configuration** in `src/config/config.json`.

6. **Run database migrations:**

   ```bash
   npx sequelize db:migrate
   ```

7. **Start the development server:**

   ```bash
   npm run dev
   ```

---

## 🌍 Environment Variables

| Variable         | Description                           |
| ---------------- | ------------------------------------- |
| `PORT`           | Server port (default: 3000)           |
| `GMAIL_EMAIL`    | Gmail address used to send emails     |
| `GMAIL_APP_PASS` | Gmail app password for authentication |

---

## 📚 API Documentation

### Base URL

```
/api/v1
```

---

### 🔁 Ping Endpoint

**GET** `/api/v1/ping`

* **Purpose:** Health check endpoint
* **Response:**

  ```json
  { "msg": "Pong" }
  ```

---

### ✉️ Create Ticket

**POST** `/api/v1/email`

* **Purpose:** Create a new email notification ticket

* **Request Body:**

  ```json
  {
    "subject": "Booking Confirmation",
    "content": "Your booking is confirmed.",
    "recipientEmail": "user@example.com"
  }
  ```

* **Success Response:**

  ```json
  {
    "success": true,
    "message": "Successfully created the Ticket",
    "data": {
      "id": 1,
      "subject": "Booking Confirmation",
      "content": "Your booking is confirmed.",
      "recipientEmail": "user@example.com",
      "status": "pending",
      "createdAt": "2024-06-01T12:00:00.000Z",
      "updatedAt": "2024-06-01T12:00:00.000Z"
    },
    "error": {}
  }
  ```

* **Error Response (400/500):**

  ```json
  {
    "success": false,
    "message": "Something went wrong while creating the Ticket",
    "data": {},
    "error": {
      "name": "SequelizeValidationError",
      "message": "Validation error: ..."
    }
  }
  ```

---

### 📥 Get Pending Emails

**GET** `/api/v1/email/pending`

* **Purpose:** Fetch all pending email tickets

* **Success Response:**

  ```json
  {
    "success": true,
    "message": "Successfully fetched all the Pending Emails",
    "data": [
      {
        "id": 1,
        "subject": "Booking Confirmation",
        "content": "Your booking is confirmed.",
        "recipientEmail": "user@example.com",
        "status": "pending",
        "createdAt": "2024-06-01T12:00:00.000Z",
        "updatedAt": "2024-06-01T12:00:00.000Z"
      }
    ],
    "error": {}
  }
  ```

* **Error Response:**

  ```json
  {
    "success": false,
    "message": "Something went wrong while fetching the pending Emails",
    "data": {},
    "error": { ... }
  }
  ```

---

## 🕸️ Queue Consumer

This service listens to the `noti-queue` RabbitMQ queue. When a message is received, it sends an email using the configured Gmail account.

**Queue Message Format:**

```json
{
  "recipientEmail": "user@example.com",
  "subject": "Booking Confirmation",
  "body": {
    "id": 123,
    "flightId": 456
  }
}
```

---

## 🪵 Logging

All logs are managed using [Winston](https://github.com/winstonjs/winston). Logs are stored:

* **Console**: during development
* **File**: `logs/combined.log`

---


