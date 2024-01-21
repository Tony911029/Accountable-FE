# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn install`
Install all the dependencies

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## AWS
The app is deployed to aws ec2 instance via elastic beanstalk and we are using nginx as our server

### Architecture

#### CodePipeline:
##### Source: V2 GitHub
##### Build: CodeBuild
  - Uses buildspec.yml
    1.login to aws using cli tool to for ECR
    2. we use first 7 characters of commit as our tag
    3. Docker build with tags 
    4. Docker build with tag: latest
    5. Push the image to ECR for beanstalk
##### Deploy: Elastic Beanstalk
  - Retrieve the artifacts (build file)
  - Runs Dockerrun.aws.json file to know which private registry to pull image from
  - Run docker container

### just some side nodes:
  - Need to give EB role to access ECR
  - Potentially: log file to S3 bucket as well (future)
  - In CodeBuild, double check where the artifact are sending to (should be in the bucket codepipeline created)
  - Maybe s3 bucket as well (for storing artifacts?)