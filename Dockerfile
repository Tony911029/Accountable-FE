FROM node:18-alpine

# working directory
WORKDIR /app

ENV PORT=3000

COPY package.json ./

# Install dependencies using Yarn
RUN yarn install

# Copy the app from the host to the container
COPY . .

RUN yarn build

FROM nginx:1.22-alpine

## Setup Nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY src/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built React app from the previous stage to the Nginx public directory
COPY --from=0  app/dist/ /usr/share/nginx/html/

# Expose port 80 to docker host
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# it is possible that we will reach how many images get call we can use on Docker hub,
# solution is to stoere the Node image in your private registry