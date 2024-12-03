

# Use the official Node.js LTS image as the base
FROM node:22-slim

# Set the working directory inside the container
WORKDIR /usr/src/server

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application (if applicable)
# RUN npm run build  # Uncomment if you have a build step
ENV PORT = 5000

# Expose the port the app runs on
EXPOSE 5000

# Define environment variable
ENV NODE_ENV=production

# Start the application
CMD ["node", "backend/src/server.js"]
