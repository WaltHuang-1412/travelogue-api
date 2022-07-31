FROM node:15

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --production
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source


EXPOSE 5000
CMD [ "npm", "start" ]
