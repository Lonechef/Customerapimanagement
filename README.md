# Api management

A Node.js application using Express and MongoDB Atlas with three main API endpoints: `db-save`, `db-search`, and `time-based-api`.

## Features

- Save customer data with rate limits to prevent DOS attacks
- Search for customer data
- Restrict API access based on time conditions

## Prerequisites

- Node.js (14.x or higher)
- npm (6.x or higher)
- MongoDB Atlas account

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/lonechef/Customerapimanagement.git
    ```
2. Navigate to the project directory:
    ```sh
    cd your-Customerapimanagement
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
4. Set up your environment variables in a `.env` file:
    ```
    PORT=3000
    MONGODB_URL="mongodb+srv://pro2:3456@cluster0.jiz9vay.mongodb.net/"
    ```

## Usage

1. Start the server:
    ```sh
    npm start
    ```
   The server will start on the port specified in the `.env` file (default is 3000).

2. Use an API client like Postman to interact with the endpoints.

## API Endpoints

### 1. Save Customer Data (`/db-save`)

- **Method:** POST
- **Rate Limits:** 1 hit per 2 mins with the same `customer_name`, 2 hits per 5 mins.

- **Request Body:**
    ```json
    {
        "customer_name": "ABC",
        "dob": "2000-01-01",
        "monthly_income": 1000
    }
    ```

### 2. Search Customer Data (`/db-search`)

- **Method:** GET
- **Request Parameters:** `customer_name` 

### 3. Time-based API Access (`/time-based-api`)

- **Method:** POST
- **Request Body:**
    ```json
    {
        "data": "Some data"
    }
    ```

## Project Structure

- `server.js`: Entry point of the application. Configures middleware and routes.
- `middleware/rateLimit.js`: Middleware for rate limiting based on `customer_name`.
- `models/customer.js`: Mongoose model for customer data.
- `routes/db-save.js`: Defines the `/db-save` endpoint.
- `routes/db-search.js`: Defines the `/db-search` endpoint.
- `routes/time-based-api.js`: Defines the `/time-based-api` endpoint.




