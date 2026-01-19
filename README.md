# BeChat

A real-time chat application built with Node.js, Express.js, and Socket.io, allowing users to connect with friends, create groups, and chat seamlessly.

## Live Demo

Check out the live application: [https://bechat.onrender.com/](https://bechat.onrender.com/)

## Features

- **User Authentication**: Secure signup and login with password hashing using bcrypt.
- **Real-Time Messaging**: Instant messaging with friends and in groups using Socket.io.
- **Friend Management**: Send friend requests, accept/reject requests, and manage your friend list.
- **Group Chats**: Create and participate in group conversations.
- **Profile Management**: Update your profile information and upload profile images.
- **Image Uploads**: Upload and share images in chats and profiles.
- **Search Functionality**: Search for new friends to connect with.
- **Responsive Design**: User-friendly interface with EJS templating.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Real-Time Communication**: Socket.io
- **Templating**: EJS
- **Authentication**: bcrypt, express-session
- **File Uploads**: Multer
- **Security**: Helmet, Compression
- **Development**: Nodemon, Livereload

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AMAbdelbasir1/chat-app.git
   cd chat-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `config.env` and update the values:
     ```
     DB_URL=your_mongodb_connection_string
     SECRETKEY=your_secret_key_for_sessions
     PORT=3001  # Optional, defaults to 3001
     ```

4. Start the application:

   ```bash
   npm start
   ```

   For development with auto-reload:

   ```bash
   npm run watch
   ```

5. Open your browser and navigate to `http://localhost:3001`.

## Usage

1. **Sign Up**: Create a new account with username, email, and password.
2. **Log In**: Access your account.
3. **Add Friends**: Search for users and send friend requests.
4. **Chat**: Start private chats with friends or create/join group chats.
5. **Profile**: Update your profile and upload images.
6. **Groups**: Create groups and invite friends.

## Project Structure

```
BeChat/
├── app.js                 # Main application file
├── config.env             # Environment configuration
├── package.json           # Dependencies and scripts
├── controllers/           # Route controllers
├── models/                # MongoDB models
├── routes/                # Express routes
├── views/                 # EJS templates
├── public/                # Static files (CSS, JS)
├── images/                # Uploaded images
├── sockets/               # Socket.io event handlers
└── guards/                # Authentication guards
```

## API Endpoints

- `GET /` - Home page (requires authentication)
- `GET /login` - Login page
- `POST /login` - Login user
- `GET /signup` - Signup page
- `POST /signup` - Register new user
- `POST /logout` - Logout user
- `GET /profile` - User profile
- `GET /chat/:id` - Chat page
- `GET /CreateGroup` - Create group page
- `POST /CreateGroup` - Create new group
- And more...

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature.
3. Commit your changes.
4. Push to the branch.
5. Open a Pull Request.

## License

This project is licensed under the ISC License. See the `package.json` file for details.
