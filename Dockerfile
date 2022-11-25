#Creates a layer from node:alpine image.
FROM node:16.3.0-alpine

#Sets an environment variable
ENV PORT 3000

RUN apk --no-cache add curl

#Sets the working directory for any RUN, CMD, ENTRYPOINT, COPY, and ADD commands
WORKDIR /usr/src/nextjs

#Copy new files or directories into the filesystem of the container
COPY package.json /usr/src/nextjs
COPY package-lock.json /usr/src/nextjs

#Execute commands in a new layer on top of the current image and commit the results
RUN npm install

##Copy new files or directories into the filesystem of the container
COPY . /usr/src/nextjs

#Execute commands in a new layer on top of the current image and commit the results
RUN npm run build

#Informs container runtime that the container listens on the specified network ports at runtime
EXPOSE 3000
