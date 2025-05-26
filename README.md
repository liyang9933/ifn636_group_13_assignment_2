#  Discussion board forum



## Discussion Board Application Overview



*  The discussion board application is designed to provide a platform for users to solve problems and contribute knowledge and experience. This is a web-based discussion board application that supports users to register, log in, create, edit and delete posts and sending/deleting replies. It also has user management function which can only allow the content creators to change their own posts/replies. The application is suitable for learning or as a basic platform for small communities.

* App base URL: http://3.106.250.158

  <hr/>

## Features:

#### 	Member users can:

- User Authentication

- New user sign up

- User Login/Log-out

- Post your Threads

- Create, edit, delete your own posts

- View all posts

- Reply others posts

- Create, delete your own replies

- View all replies

  <hr/>

#### Admin users can:

- User Authentication

- New user sign up

- User Login/Log-out

- Post your Threads

- Create, edit, delete your own posts

- Delete any other posts

- View all posts

- Reply others posts

- Create, delete your own replies

- Delete any other replies

- View all replies

  

## A list of API Endpoints

| Method       | URL                           | **Functionality Description**     |
| ------------ | ----------------------------- | --------------------------------- |
| ```POST```   | ```/api/auth/register```      | Register a new user.              |
| ```POST```   | ```/api/auth/login```         | Existed user login.               |
| ```GET```    | ```/api/auth/profile```       | Retrieve user profile.            |
| ```PUT```    | ```/api/auth/profile```       | Update data in user profile.      |
| ```GET```    | ```/api/posts```              | Retrieve all posts.               |
| ```DELETE``` | ```/api/posts/:id```          | Delete post #id.                  |
| ```POST```   | ```/api/posts/```             | Create a new post.                |
| ```PUT```    | ```/api/posts/:id```          | Update data in post #id.          |
| ```POST```   | ```/api/posts/:id/replies/``` | Create a new reply to post #id.   |
| ```DELETE``` | ```/api/posts/replies/:id```  | Delete reply #id.                 |
| ```GET```    | ```/api/posts/:id/replies/``` | Retrieve all replies of post #id. |

## Tech stack:

- **Backend**: Node.js + Express

- **Frontend**: React

- **Database**: MongoDB

- **Authentication**: JWT

- **CI/CD**: GitHub Actions + AWS EC2

  <hr/>

## Project Setup

### 1. Clone the repository
```git clone https://github.com/liyang9933/ifn636_group_13_assignment_2.git```

### 2. Install dependencies
```npm install```


### 3. Run the application
```npm start```

<hr/>

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
```

##  How to contribute to the development of Discussion board

I welcome contributions! If you'd like to help, please:

- Fork this repository.
- Create a new branch (`git checkout -b feature-branch`).
- Make your changes and commit them (`git commit -am 'Add new feature'`).
- Push to your fork and submit a pull request."

##  How to report issues

Found a bug or have a suggestion? We are hearing from you!

1. **Check existing issues**
   Before opening a new issue, please [search the existing issues](https://github.com/liyang9933/ifn636_group_13_assignment_2/issues) to avoid duplicates.
2. **Open a new issue**
   If your issue hasn’t been reported yet, [open a new issue](https://github.com/liyang9933/ifn636_group_13_assignment_2/issues/new) and include the following details:
   - **Title**: A short and descriptive summary of the issue.
   - **Description**: What happened? What did you expect to happen?
   - **Steps to Reproduce**: Provide clear steps so we can reproduce the problem.
   - **Screenshots** (if applicable): Help us understand the issue faster.
   - **Environment**: Browser, OS, device, or other relevant info.
3. **Be respectful**
   We're all here to build a better project. Please be polite and constructive in your communication.

> ✅ Tip: If you're not sure whether something is a bug or a feature request, feel free to ask — We are happy to help!