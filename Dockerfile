FROM node:18-alpine

# working directory
WORKDIR /app

COPY package.json ./

# Install dependencies using Yarn
RUN yarn install

# Copy the app from the host to the container
COPY . .

# Expose the port your app runs on
ENV PORT=3000
EXPOSE 3000

# Entry point command
CMD ["yarn", "start"]



# it is possible that we will reach how many images get call we can use on Docker hub,
# solution is to stoere the Node image in your private registry