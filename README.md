# Quizzy

1. OTP-Based Authentication:
- Secure login through one-time password verification.
2. OAuth Support:
- Option to log in using third-party services (e.g., Google, Facebook) for easy access.
3. Full Authentication:
- Comprehensive user authentication system for account security.
4. Forgot Password Functionality:
- Users can reset their passwords via email verification.
5. Multiple Categories:
- Create and participate in quizzes across 7 different categories.
6. Quiz Visibility:
- Users can view quizzes created by others.
7. Edit Functionality:
- Quiz authors can edit their quizzes anytime.
8. Google Gemini Integration:
- Enhanced question details through external information retrieval.
9. Random Quiz Selection:
- Users can take randomly generated quizzes for variety.
10. Scoring System:
- Automatic scoring after quiz completion.
11. Feedback on Answers:
- Users can review which answers were correct or incorrect post-quiz.

## Installation
1. Navigate to client directory and install dependencies.
   ```
   cd client
   npm install
   ```

2. Start the client
   ```
   npm start
   ```
3. Navigate to server directory and start the server.
   ```
   cd server
   nodemon index.js
   ```

4. Navigate through the client directory and create a file named .env.local
   ```
   REACT_APP_GOOGLE_GENERATIVE_API=your_api_key
   ```
5. Navigate to server directory and create a file named .env
   ```
   CLIENT_ID=your_client_id
   CLIENT_SECRET=your_client_secret
   CALLBACK_URL=callback_url
   REDIRECT_URL=redirect_url
   JWT_SECRET=your_jwt_secret
   EMAIL_ID=your_email
   PASSWORD=your_password
   MONGO_URL=your_mongo_atlas_uri
   ```

Video link:[link](https://asset.cloudinary.com/dvpvxjcfk/2af4da87c11cda69131b44ad7e7600b0)
   

