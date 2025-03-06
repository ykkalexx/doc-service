# Document Service Microservice

This is a document management microservice built with Node.js, TypeScript, Express, and SQLite. It provides functionality for uploading, retrieving, and deleting documents.

## Architecture

The service follows a microservice architecture pattern with:

- Express REST API
- SQLite database for document storage
- React frontend for document management UI

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Backend Setup

1. Install dependencies:

```bash
cd doc-service
npm install
```

2. Start the development server:

```bash
npm run dev
```

The backend service will be available at http://localhost:8004.

3. Go to client side and install dependencies aswell

```bash
cd doc-service/client
npm install
```

4. Start the development client:

```bash
npm run dev
```

The frontend will be available at http://localhost:5173.
