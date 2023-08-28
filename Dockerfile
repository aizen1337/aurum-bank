# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app
ENV NODE_ENV production
ENV HOSTNAME "aurum.bank"
# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .
RUN npx prisma generate 
# Build the Next.js app
RUN npx next build

RUN npx prisma generate 
# Expose the port that the app will run on
EXPOSE 3000
# Define the command to run your app
CMD ["npm", "start"]