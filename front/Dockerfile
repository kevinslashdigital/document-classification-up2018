FROM node:8.5.0

# install dependencies
RUN apt-get update -y && \
    apt-get install -y \
    curl \
    build-essential \
    vim \
    libfile-which-perl

# npm install
ADD package.json /tmp/package.json
ADD package-lock.json /tmp/package-lock.json
RUN npm install
RUN ls
CMD ["npm", "start"]