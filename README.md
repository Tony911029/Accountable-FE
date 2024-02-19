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


# AWS
The app is deployed to AWS ec2 instance via elastic beanstalk and we are using nginx as our server

## Architecture: CodePipeline

### Source: V2 GitHub  (org connection)
### Build: CodeBuild
  - Uses buildspec.yml
    1. login to aws using CLI tool for ECR
    2. we use the first 7 characters of the commit hash as our tag
    3. Pull `Dockerrun.aws.json` from specified s3 buckets path (`params` and will need IAM permission)
    4. Inject vite params for FE (`params`)
    5. Run Docker build
    6. Tag the image we just built with "latest" too for `Dockerrun.aws.json`
    7. Push the image to ECR for Beanstalk (`params`)
    8. Set the artifact as `Dockerrun.aws.json`

### Deploy: Elastic Beanstalk
  - Retrieve the artifacts: `Dockerrun.aws.json`
  - Runs `Dockerrun.aws.json` file to tell EBS which ECR to pull the image from (security is done via IAM)
  - Run the docker container

### just some side nodes:
  - Need to give EB role to access ECR
  - Potentially: log file to S3 bucket as well (future)
  - In CodeBuild, double check where the artifact are sending to (should be in the bucket codepipeline created)
  - Maybe s3 bucket as well (for storing artifacts?)
  - Remember to add SLL certificate (can be obtained from certificate manager) and add listener (port 443) in EBS config
  - Remember to use Route53 to route HTTP(S) to correct server
  - EC2 Security Group: Inbound traffic: 22 (SSH), 80 (TCP) and 3000 (don't think is necessary?)
