FROM node:18-alpine as builder

# working directory
WORKDIR /app

ENV PORT=3000

COPY package.json ./

# Install dependencies using Yarn
RUN yarn install

# Copy the app from the host to the container
COPY . .

# RUN yarn build (Do not uncomment next line)
RUN yarn run build


FROM nginx:1.22-alpine

## Setup Nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY src/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built React app from the previous stage to the Nginx public directory
COPY --from=builder  app/dist/ /usr/share/nginx/html/

# Expose port 80 to docker host
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


# TODO: Something to improve:
# 1. it is possible that we will reach how many images we can fetch from DockerHub
#    solution is to store the Node image in ESR

# 2. Right now we have the entire build file (dist) on github, we includes all the api keys for AWS cognito
#    The solution is to use Codebuild to build the code for us using Run yarn build and set api keys as an env var in EB
#    But the issue is that something is wrong when we try to deploy using EB (command failed to execute)

