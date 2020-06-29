FROM node:8.13.0

# Maintainer
LABEL maintainer="Vmoksha Technologies <devops@vmokshagroup.com>"

#Install Base Packages or dependence softwares of Build and Nginx Proxy
RUN apt-get update && apt-get install -y  \
    build-essential                       \
    libssl-dev                            \
    gcc                                   \
    g++                                   \
    make                                  \
    nano                                  \
    curl                                                             
RUN mkdir -p /usr/app/
# Add Node.js app
COPY . /usr/app/

WORKDIR /usr/app/
# Copy default node env file
COPY .env.example .env

# Install Node modules and build the packages
RUN npm install

#RUN npm run build

# Expose Nginx port
EXPOSE 3000

# Run the startup script
CMD [ "npm", "start" ]
#CMD [ "/bin/sh", "-c", "npm start > deskweb.log 2>&1" ]

