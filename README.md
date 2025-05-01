* JIRA board URL: https://ifn636liyang.atlassian.net/jira/software/projects/FDB/boards/100?atlOrigin=eyJpIjoiNTdkYTM1NTU1Y2Q5NDQxMGJmNjU0ZDk0ZTVkNzIyOWYiLCJwIjoiaiJ9

* App base URL: http://3.106.250.158:5001
* Discussion Board Application Overview: The discussion board application is designed to provide a platform for users to solve problems and contribute knowledge and experience. This is a web-based discussion board application that supports users to register, log in, create, edit and delete posts and sending/deleting replies. It also has user management function which can only allow the content creators to change their own posts/replies. The application is suitable for learning or as a basic platform for small communities.

Features:
- User Authentication:
- New user sign up
- User Login/Log-out

- Post your Threads:
- Create, edit, delete your own posts
- View all Threads

- Reply others Threads:
- Create, delte your own replies
- View all replies

Tech stack:

- **Backend**: Node.js + Express
- **Frontend**: React
- **Database**: MongoDB
- **Authentication**: JWT
- **CI/CD**: GitHub Actions + AWS EC2

## Project Setup

### 1. Clone the repository
```git clone https://github.com/liyang9933/IFN636-A1.git```

### 2. Install dependencies
```npm install```

### 3. Environment setup

MONGO_URI=mongodb+srv://liyang9933:199933@cluster0.gafcx.mongodb.net/taskmanager?retryWrites=true&w=majority&appName=Cluster0<br/>
JWT_SECRET=2J8zqkP7VN6bxzg+Wy7DQZsd3Yx8mF3Bl0kch6HYtFs=<br/>
PORT=5001


### 4. Run the application
```npm start```

## CI/CD Pipeline Details
This project uses GitHub Actions for CI/CD Pipline. A runner is set up on an AWS EC2 instance. 


```yaml
name: Backend CI

on:
  push:
    branches:
      - main  # Trigger CI on pushes to the main branch


jobs:
  test:
    name: Run Tests
    runs-on: self-hosted

    strategy:
      matrix:
        node-version: [22] # Test on multiple Node.js versions


    environment: MONGO_URI

    steps:
    - name: Checkout Code
      uses: actions/checkout@v3

    # Set up Node.js
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}

    - name: Print Env Secret

      env:
        MONGO_URI: ${{ secrets.MONGO_URI }}
        JWT_SECRET: ${{ secrets.JWT_SECRET }}
        PORT: ${{ secrets.PORT }}
      run: | 
        echo "Secret 1 is: $MONGO_URI"
        echo "Secret 2 is: $JWT_SECRET"
        echo "Secret 3 is: $PORT"
      
    - run: pm2 stop all

    # Install dependencies for backend
    - name: Install Backend Dependencies
      working-directory: ./backend
      run: | 
       npm install --global yarn
       yarn --version
       yarn install
      
    # Install dependencies for frontend
    - name: Install Frontend Dependencies
      working-directory: ./frontend
      run: |
        df -h
        sudo rm -rf ./build
        yarn install
        yarn run build


    # Run backend tests
    - name: Run Backend Tests
      env:
        MONGO_URI: ${{ secrets.MONGO_URI }}
        JWT_SECRET: ${{ secrets.JWT_SECRET }}
        PORT: ${{ secrets.PORT }}
      working-directory: ./backend
      run: npm test


    - run: npm ci
    - run: | 
        cd ./backend
        touch .env
        echo "${{ secrets.PROD }}" > .env

    - run: pm2 start all

    - run: pm2 restart all
    