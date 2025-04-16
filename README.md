# Dance Booker – WAD2 Coursework 2

A booking system for dance classes and courses built for Coursework 2 of the Web Application Development 2 module.

The live website can be accessed via this URL:
> https://gcu-dancebooker.onrender.com

## Getting Started

### Install Dependencies
```bash
npm install
```

### Seed the Database
This will initialise the `.db` files using mock data.
```bash
npm run seed
```

### Start the Server
```bash
npm run start
```

The app runs at: `http://localhost:3000`

## Environment Setup

Create a `.env` file in the project root. You can use the included `.env.example` as a reference:
```
ACCESS_TOKEN_SECRET=yourSecretHere
```

You can use any secure, random string as the secret. Do not share this key.

## Default Organiser Account

- Username: `admin`
- Password: `admin`

## Features

### Public User
- View available classes and courses
- Book individual classes
- Enrol in courses (auto-enrols in linked classes)
- Confirmation message after enrolment

### Organiser
- Login with username and password
- View dashboard with all classes and courses
- Create, edit, delete classes and courses
- View and delete enrolments
- Manage organisers (add/remove, prevent self-deletion)

## Tech Stack

- Node.js, Express
- NeDB (persistent `.db` files)
- Mustache templates
- Tailwind CSS
- JWT authentication and bcrypt password hashing
