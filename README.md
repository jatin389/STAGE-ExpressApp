# My List Feature

## Setup Instructions


1. Install dependencies:
    ``` bash
    npm install

2. Setup environment variables:
Create a .env file in the root directory with the following content:

    ``` bash
    MONGODB_URI=mongodb://localhost:27017/mylist
    PORT=3000


3. Run Script to initialize DB
   ``` bash
   npx ts-node initializeDBScript.ts

4. Run the application
   ``` bash
   npm run dev-start


