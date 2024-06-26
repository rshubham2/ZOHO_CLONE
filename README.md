
# Zoho Books Clone Project Wiki

## Table of Contents
1. [Project Overview](#project-overview)
2. [Getting Started](#getting-started)
3. [Architecture](#architecture)
4. [Development Workflow](#development-workflow)
5. [API Documentation](#api-documentation)
6. [Database Schema](#database-schema)
7. [Deployment](#deployment)
8. [Testing](#testing)
9. [Troubleshooting](#troubleshooting)
10. [Contributing](#contributing)

## Project Overview
The Zoho Books Clone is a web application that replicates key features of Zoho Books, focusing on sales order management with a 5-stage workflow. It's built using the MERN stack (MongoDB, Express.js, React, Node.js).

### Key Features
- User authentication and authorization
- Dashboard with key metrics
- Sales order management with 5-stage workflow
- Integration with Zoho Books API for data synchronization

## Getting Started
### Prerequisites
- Node.js (v14 or later)
- MongoDB
- Git

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/your-username/zoho-books-clone.git
   cd zoho-books-clone
   ```
2. Install dependencies:
   ```
   npm install
   cd frontend && npm install
   cd backend && npm install
   ```
3. Set up environment variables (see `.env` files in frontend and backend directories)
4. Start the development servers:
   ```
   npm run dev
   ```

## Architecture
The application follows a client-server architecture:
- Frontend: React.js with Redux for state management
- Backend: Node.js with Express.js
- Database: MongoDB
- API: RESTful API

## Development Workflow
1. Create a new branch for each feature/bugfix
2. Write tests for new features
3. Implement the feature/fix
4. Run tests and ensure all pass
5. Create a pull request for code review
6. Merge to main branch after approval

## API Documentation
[\[Link to detailed API documentation\]](https://www.zoho.com/books/api/v3/introduction/#organization-id)

### Sample Endpoints
- POST /api/auth/login
- GET /api/sales-orders
- POST /api/sales-orders
- PUT /api/sales-orders/:id/stage

## Database Schema
### User
- id: ObjectId
- username: String
- email: String
- password: String (hashed)
- role: String

### SalesOrder
- id: ObjectId
- orderNumber: String
- customer: String
- items: Array
- total: Number
- stage: Number
- createdAt: Date
- updatedAt: Date

## Testing
- Backend: Jest
- Frontend: React Testing Library

To run tests:
```
npm test
```

## Troubleshooting
[Common issues and their solutions]

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

For major changes, please open an issue first to discuss what you would like to change.

```

This wiki provides a solid foundation for your project documentation. You should expand each section with more detailed information as your project progresses. For example:

- In the API Documentation section, you'll want to provide detailed information about each endpoint, including required parameters, response formats, and example requests and responses.
- The Database Schema section should be expanded to include all fields for each model, along with any relationships between models.
- The Deployment section should include detailed steps for your specific deployment process, including any necessary configuration steps.
- The Troubleshooting section should be regularly updated with common issues that team members encounter and their solutions.
