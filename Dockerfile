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