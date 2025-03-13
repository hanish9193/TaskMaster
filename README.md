# TaskMaster - AI Task Manager

TaskMaster is a modern task management application with a unique twist - an AI assistant with variable personalities that responds to your productivity levels. The AI's attitude changes based on your productivity level, which increases when you complete tasks and decreases when you don't.

![TaskMaster Screenshot](Screenshot%202025-03-12%20170201.png)

## 🌟 Features

- **Task Management**: Create, complete, and delete tasks with priority levels and due dates
- **AI Personality System**: Experience different AI personalities that react to your productivity
- **Productivity Level**: Build your productivity level by completing tasks and maintaining streaks
- **Streaks**: Track consecutive days of completing tasks
- **Multiple AI Personalities**: Choose between different AI character types
- **Responsive Design**: Works on desktop and mobile devices

## 🚀 Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Express.js (Node.js)
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Passport.js
- **API Validation**: Zod

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL database

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/taskmaster.git
   cd taskmaster
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your database connection by creating a `.env` file with your database credentials.

4. Push the database schema:
   ```bash
   npm run db:push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:5000`

## 🚀 Deployment

This application is set up for deployment on Replit. The deployment configuration is already included in the `.replit` file.

## 📱 Mobile App

There is also an Android application in development, built with Jetpack Compose. The mobile app connects to the same backend API.

## 🤖 AI Personality System

The AI assistant has different personality modes:
- **Harsh**: Brutally honest and sarcastic when your productivity is low
- **Balanced**: Moderately encouraging but still holds you accountable
- **Supportive**: Positive and encouraging, even with small progress

The AI's responses change dynamically based on your productivity level which is calculated from your task completion rate and streaks.

## 🔧 Configuration

You can customize various aspects of the application by modifying the appropriate files:
- **AI Responses**: Edit the responses in `client/src/lib/ai-responses.ts`
- **Theme**: Update the theme settings in `theme.json`
- **API Routes**: Modify routes in `server/routes.ts`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Contact

Your Name - Hanish Kumar S - hanish.kumar9193@gmail.com

Project Link: https://github.com/hanish9193/TaskMaster
