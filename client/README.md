## Website URL

https://voicenitjsr.org.in

https://voicenitjsr.netlify.app/

## Requirement Doc

Doc1 : https://docs.google.com/document/d/1O96d557jAIvqVctbrLSEXTMS14BhL5vb/edit

Doc2 : https://docs.google.com/document/d/1l5gTqJkfccZt4XQ2w094pyU9-N8keuokuk7TNJELH6U/edit

## Firebase Console

https://console.firebase.google.com/u/0/project/voicewebappreact/overview

## Project

https://github.com/ankit-c11/jamshedpur-voice/projects/1

## Deployment

https://github.com/ankit-c11/jamshedpur-voice/deployments

## Tech stack

1. React js
2. Redux saga
3. Firebase

## How to run

clone the project and run:-

1. npm install
2. npm start
3. open your application on http://localhost:3000/

Note:- If you application doesn't start still then you may need to replace your start command in package.json with 'react-scripts --openssl-legacy-provider start' to start your application and build command with 'react-scripts --openssl-legacy-provider build' to build your application

## To resolve clone issue

// If you are not able to clone the application, i.e it's throwing error that you don't have corrects access rights the follow these steps

1. ssh-keygen -t ed25519 -C "your_email@example.com"
2. cd /Users/<your current user in your laptop>/.ssh/
3. ls
4. cat id\_\*\*\*.pub and copy the key and
5. On you GitHub account open settings > ssh and pgp
6. Click on Add token and paste the above copied token
7. Now you can try git clone using ssh (not https)

## How to raise a Merge Request
1. git add . // this will add all you files changes
2. git commit -m '<Commit message for the changes>' // This will provide information about your changes
3. git push // This will publish your local changes on remote branch
4. Now you can go to pull requests section and create a new pull request from your branch to master(Provide the title and description of the pull request)

## How to create a new branch
1. git checkout -b <branchname> // A new branch will be created with the current branch as the reference
