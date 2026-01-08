# AccessFlow

Authentication system with Admin/Customer roles using Express, PostgreSQL, and bcrypt.

## Setup

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your DATABASE_URL

# Create database and schema
psql -U postgres -c "CREATE DATABASE accessflow_db;"
psql -U postgres -d accessflow_db -f schema.sql

# Start server
npm start

# Run tests
npm test
```

## API Endpoints

**POST /signup** - Register new user

```json
{ "email": "user@example.com", "password": "pass", "role": "admin|customer" }
```

**POST /signin** - Login

```json
{ "email": "user@example.com", "password": "pass" }
```

Server runs on http://localhost:4000
