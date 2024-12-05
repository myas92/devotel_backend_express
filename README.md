# Blog Application API

This project is a secure RESTful API for a blog application, allowing users to perform basic CRUD (Create, Read, Update, Delete) operations on blog posts. The API is built using Node.js, Express.js, Firebase Authentication, and PostgreSQL for data storage.

## Technologies Used

- **Node.js**: JavaScript runtime built on Chrome's V8 engine.
- **Express.js**: Web framework for Node.js.
- **PostgreSQL**: Relational database system for storing blog posts.
- **Firebase Authentication**: Secure authentication system for user verification.
- **Multers**: Middleware for handling file uploads, used here to save images to local storage.

## Features

- User authentication via Firebase to secure API endpoints.
- CRUD operations on blog posts.
- Post data stored in PostgreSQL database.
- Image storage in local storage for blog posts (uploads folder).
- Error handling and validation on API endpoints.

## Installation

### Clone the repository:
```bash
git clone https://github.com/myas92/devotel_backend_express.git
cd devotel_backend_express
```

### Install dependencies:

```bash
npm install
```

### Set up PostgreSQL database:
- Create a new database in PostgreSQL.
- Add your database credentials to the .env file.

### Set up Firebase Authentication:

- Go to Firebase Console and set up Firebase Authentication.
- Add Firebase credentials to the .env file "FIREBASE_API_KEY".

- Generate Private Key and copy into the blew path
```bash
mkdir secrets
cd secrets
touch firebase-service-account.json
```

example of firebase-service-account.json
```json
{
  "type": "service_account",
  "project_id": "blog-api-b3bcc",
  "private_key_id": "",
  "private_key": "",
  "client_email": "firebase-adminsdk-okgo6@blog-api-b3bcc.iam.gserviceaccount.com",
  "client_id": "106110732042674118355",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-okgo6%40blog-api-b3bcc.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
```

### Run migrations to set up the database:
```bash
npx prisma migrate dev

```

### Start the application:
```bash
npm start
```

The app will be running at http://localhost:3000.





### 3. **Architecture Decisions**
Add a section in the `README.md` or a separate file (e.g., `ARCHITECTURE.md`) to explain your architecture. Here’s an example outline:


## Architecture Decisions

### MVC Pattern
- **Controller**: Handles HTTP requests, processes input, and delegates tasks to the appropriate model methods for database queries.
- **Model**:  Directly interacts with the database using Prisma. It contains all query logic, ensuring a clean separation of concerns between data access and business logic.
- **Repository**:  Not used in this implementation since the Prisma ORM allows query logic to be written cleanly within the model layer.


### Technologies
- **Express.js**: Lightweight framework for handling HTTP requests and routing.
- **Prisma**: ORM for interacting with the PostgreSQL database.
- **Firebase**: Used for authentication and/or other services.

### Key Design Choices
- **Modular Structure**: Divided the code into controllers, models maintainability.
- **Centralized Error Handling**: Used middleware for error management.
- **Environment Configuration**: Used `dotenv` for environment variables.
- **Scalability**: Designed the project with a focus on scalability, keeping modules loosely coupled.
- **Dockerized Deployment**: The application is containerized using Docker, ensuring consistent runtime environments across development and production.
- **Docker Compose**: Used to orchestrate multiple services, such as the Node.js server, PostgreSQL database