# mystery_box_game
## Table of Contents
[introduction](#introduction)
[features](#features)
[tech-stack](#tech-stack)
[project-structure](#project-structure)
[installation](#installation)
[usage](#usage)
[Api-doc](#api-documentation)
[liscence](#license)
[contact](#contact)

## Introduction
- Mystery Box Game is a web-based game where players can purchase and open mystery boxes to collect virtual items of varying rarities. The game includes features like user authentication, a ranking system, real-time notifications, and more. The goal is to create an engaging, fun experience in nodejs development.

## Features
- User Authentication: Secure user registration and login with JWT.
- Purchase Mystery Boxes: Spend in-game points to buy mystery boxes of different rarities.
- Open Boxes: Uncover random items from boxes, ranging from common to legendary.
- Inventory Management: View, sort, and manage your collection of virtual items.
- Player Rankings: Compete with others in global and weekly leaderboards.
- Real-Time Notifications: Get instant updates on new items, challenges, and events.
- Challenges and Rewards: Complete daily, weekly, and monthly challenges to earn more points.
- Item Trading (Optional): Exchange items with other players.
- Microtransactions (Optional): Purchase additional points through secure payment gateways.

## Tech Stack 
### shared 
- Typescript
### Backend:
- Node.js
- Fastify
- PostgreSql or mysql
- JWT for authentication
- Socket.io for real-time notifications
- borp for test
### Frontend:
- React.js
- Redux (or context) for state management
- Axios for API requests
- Tailwind CSS (or Bootstrap) for styling
- jest for test
### DevOps:
- Docker for containerization (Optional)
- Heroku/AWS/DigitalOcean for deployment
- GitHub Actions for CI/CD (Optional)

## Installation
### Prerequisites
Node.js (>= 18.x)
postgresql or mysql (>= 4.x)
npm or Yarn
Docker (optional, for containerized setup)
Clone the Repository
### clone the repository
```sh 
git clone https://github.com/yourusername/mystery-box-game.git
cd mystery-box-game
```
### Backend Setup
1) Install backend dependencies:
```sh
cd backend
npm install
```
2) Create a .env file in the backend directory and add your environment variables:
```sh
PORT=5000
MONGO_URI=mongodb://localhost:27017/mystery-box-game
JWT_SECRET=your_jwt_secret
```
3) start server
```
npm run dev

```
#### Front end set up
1) install front-end dependencies 
```sh
cd frontend
npm install

```
2) Create a .env file in the frontend directory and configure the API URL:
```sh
REACT_APP_API_URL=http://localhost:5000/api
```
3) Start the frontend development server:
```sh
   npm start
```
### Docker Setup (Optional)
1) Build and run the Docker containers:
```sh
docker-compose up --build
```
2) access the application at http://localhost:3000.

## Usage
Once the backend and frontend servers are running, you can interact with the game by visiting http://localhost:3000 in your web browser.

- Register: Create a new account to start playing.
- Log in: Use your credentials to log in and access your inventory, buy boxes, and more.
- Purchase Boxes: Spend your points on mystery boxes and open them to collect items.
- Check Rankings: See how you rank against other players.
- Complete Challenges: Earn extra points by completing daily, weekly, and monthly challenges.. 

## API Documentation
### Base URL
The base URL for all API requests is http://localhost:5000/api
### Endpoints:
#### Auth
POST /auth/register: Register a new user.
POST /auth/login: Log in an existing user.
GET /auth/me: Get the logged-in user's information.
#### Boxes
GET /boxes: Retrieve a list of available boxes.
POST /boxes/open: Open a purchased box and receive items.
#### Inventory
GET /inventory: Retrieve the current user's inventory.
POST /inventory/sell: Sell an item from the inventory (if implemented).
#### Rankings
GET /rankings: Get the global and weekly rankings of players.
### Example Request:
```sh
curl -X POST http://localhost:5000/api/auth/register \
-H "Content-Type: application/json" \
-d '{"username": "testuser", "email": "test@example.com", "password": "password123"}'
```
## Project Structure 
```bash
mystery-box-game/
├── backend/
│   ├── config/          # Environment variables and configurations
│   ├── controllers/     # API request controllers
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── utils/           # Utility functions
│   ├── app.js           # Express app setup
│   └── server.js        # Server entry point
├── frontend/
│   ├── src/
│   │   ├── assets/      # Static assets like images and fonts
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # React components for pages
│   │   ├── redux/       # State management setup
│   │   ├── services/    # API request services
│   │   ├── styles/      # Global styles
│   │   └── App.js       # Main app component
│   ├── public/          # Public files
│   └── index.js         # Entry point for React
└── README.md
```


## License
This project is licensed under the MIT License. See the LICENSE file for details.
> [!WARNING] 
> in progress 
> this project is for educationnal purpose.
## Contact
For any questions or suggestions, feel free to contact me:
Email: bsr-web-09@proton.me
GitHub: ben-sentenac
Portfolio: https://web-09.com