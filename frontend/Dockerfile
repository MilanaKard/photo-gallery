# Use the official Node.js image as the base image
FROM node:18.19.1

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app
RUN npx webpack --mode=production --env port=3000

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["npx", "webpack", "serve", "--mode=production", "--env", "port=3000"]
