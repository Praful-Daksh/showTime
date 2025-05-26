# ShowTime 🎟️

ShowTime is a full-stack web application for discovering, booking, and managing event tickets. It features user authentication, event exploration, ticket purchasing with payment integration, and a dashboard for event organizers to track sales and revenue.

You can check it out [Here](http://show-time-six.vercel.app/).

---

## Features

- **User Authentication:** Register, login, and secure session management.
- **Event Discovery:** Browse and search for upcoming events.
- **Ticket Booking:** Select ticket types and quantities, and pay securely via  Razorpay.
- **Dashboard:** Organizers can view stats, manage events, and track ticket sales and revenue.
- **Real-time Stats:** Stats updates after each transaction.
- **Admin Panel:** Manage events, tickets, and profile.

---

## Tech Stack

- **Frontend:** React, React Router, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Payments:** Razorpay API
- **Authentication:** JWT (JSON Web Tokens)

---

## Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB
- Razorpay account (for payment integration)

### Installation

1. **Clone the repository:**\      
    ```
    git clone https://github.com/Praful-Daksh/showTime.git
    cd showTime
    ```

2. **Install backend dependencies:**
    ```
    cd backend
    npm install
    ```

3. **Install frontend dependencies:**
    ```
    cd ../frontend
    npm install
    ```

4. **Set up environment variables:**

    - Create a `.env` file in the `backend` directory with:
        ```
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret
        RZRPY_KEY=your_razorpay_key
        RZRPY_SECRET=your_razorpay_secret
        ```
    - Create a `.env` file in the `frontend` directory with:
        ```
        REACT_APP_RZRPY_KEY=your_razorpay_key
        ```
---

5. **Run the backend server:**
    ```
    cd ../backend
    npm start
    ```

6. **Run the frontend app:**
    ```
    cd ../frontend
    npm start
    ```

---

## Folder Structure

```
showTime/
  backend/
    Controllers/
    Middleware/
    models/
    routes/
    ...
  frontend/
    public/
    src/
      pages/
      components/
      layouts/
      partials/
      ...
```

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---
## NOTE: 
```
showTime is using React 19 so before adding any new package or dependency, please make sure that package supports react 19.
```

## Acknowledgements

- [Razorpay](https://razorpay.com/)
- [React](https://react.dev/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)