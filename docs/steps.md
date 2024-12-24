# Building CI/CD Pipeline with GitHub actions

- Containerize the application with docker
- Prepare action scripts – Workflows
- Push application to docker hub using action runner
- Pull the application from the docker to your Linux environment
- Prepare action runner scripts in your Linux environment
- Install nginx server
- Install letsencrypt
- Enable firewall

## Create docker files for (Frontend, Backend, Database)

### Docker file for frontend

```bash
# Stage 1: Build the React.js application
FROM node:20-alpine AS builder

# Accept build argument for VITE_APP_API
ARG VITE_APP_API

# Set environment variable for Vite
ENV VITE_APP_API=${VITE_APP_API}

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the built app with Nginx
FROM nginx:stable-alpine

# Remove default Nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy your custom server configuration to conf.d
COPY default.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
```

### Docker file for backend API

```bash
# Stage 1: Build the Express.js application
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Define the command to run the application
CMD ["node", "index.js"]
```

### Create docker compose file

```bash
services:
  api:
    build:
      context: ./track-backend
      dockerfile: Dockerfile
    ports:
      - "8080:5000"
    depends_on:
      mongodb:
        condition: service_healthy
    environment:
      MONGODB_URI: mongodb://mongodb:27017/mydatabase

  portal:
    build:
      context: ./admin-dashboard
      dockerfile: Dockerfile
      args:
        VITE_APP_API: http://api:5000
    ports:
      - "8081:80"
    depends_on:
      - api

  mongodb:
    image: mongo:6.0
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
    healthcheck:
      test: ["CMD", "mongosh", "--eval", "db.adminCommand('ping')"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  mongo-data:
```

## Create Github Actions workflows

Create workflow file in the `.github/workflows/prod.yml`
[script should be here]

Now, go the girepository you're hosting The following should be added in your actions under the secrets & variables in the github repo you’re hosting the code
i. DOCKER_USERNAME
ii. DOCKER_PASSWORD
iii. DATABASE_URL (MongoDB URL in this case)
iv. DATABASE_USERNAME
v. DATABASE_PASSWORD 4. Ssh to your server
a. Using Username & Password
i. ssh username@ipaddress
ii. <Enter your password>
b. Using SSH keys
i. Ssh username@hostname
c. Using SSH Config
i. ssh <name>

Update and upgrade the server

```bash

sudo apt upgrade && sudo apt update
```

# List users in your linux server

```
cat /etc/passwd

```

## Add user

```


adduser [OPTIONS] USERNAME
sudo adduser server

  OR

useradd [OPTIONS] USERNAME
sudo useradd username





```

## Del user

```
userdel username
```

# Add user to suders

```
sudo usermod -a -G sudo <username>

```

# Enable Firewall

```bash
ufw app list #check available apps
ufw allow OpenSSH # allow ssh
ufw enable # enable firewall
sudo ufw allow 443 # enable https for your website


```

# Disable rootlogin

```bash

/etc/ssh/sshd_config
PermitRootLogin no #change to no

```

# install and configure nginx

```
sudo apt install nginx
sudo ufw allow 'Nginx HTTP' # allow nginx ports 80 / 443

```

# Install Docker

```bash
sudo apt-get update
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# Add Docker’s official GPG key:
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# 1.  Use the following command to set up the **stable** repository. To add the **nightly** or **test** repository, add the word `nightly` or `test` (or both) after the word `stable` in the commands below. [Learn about **nightly** and **test** channels](https://docs.docker.com/engine/install/).


echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

  # Install Docker Engine

 sudo apt-get update
 $ sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin

```

## Docker User Permissions

```bash

sudo groupadd docker
# Give user to docker permission
sudo gpasswd -a $USER docker
# sometimes the above method does not work
sudo chmod 666 /var/run/docker.sock


```

# Install Docker Compose

```bash


sudo curl -L "https://github.com/docker/compose/releases/download/1.26.0/docker-compose-$(uname -s)-$(uname -m)"  -o /usr/local/bin/docker-compose
sudo mv /usr/local/bin/docker-compose /usr/bin/docker-compose
sudo chmod +x /usr/bin/docker-compose


```

# Install Github Actions

Go to your github account and navigate to the repository you want to add github actions runner and click create self-hosted runner. there will be all the scripts to run

### Download GIhutb actions

```


# Create a folder
$ mkdir actions-runner && cd actions-runner# Download the latest runner package
$ curl -o actions-runner-linux-x64-2.295.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.295.0/actions-runner-linux-x64-2.295.0.tar.gz # Optional: Validate the hash
$ echo "1bde3f2baf514adda5f8cf2ce531edd2f6be52ed84b9b6733bf43006d36dcd4c actions-runner-linux-x64-2.291.1.tar.gz" | shasum -a 256 -c# Extract the installer
$ tar xzf ./actions-runner-linux-x64-2.291.1.tar.gz


```

### Cconfighure github actions

```bash

# Create the runner and start the configuration experience
$ ./config.sh --url https://github.com/AsalSolutions/MEAL__CRM --token ADFAMIZOMEXYOUVVCDBJBKLCRODEM# Last step, run it!
$ ./run.sh



```

## Using your self-hosted runner

```bash
# Use this YAML in your workflow file for each job
runs-on: self-hosted

```

## Run svc.sh for github actions automation

```bash
sudo ./svc.sh help
sudo ./svc.sh install
sudo ./svc.sh status
sudo ./svc.sh start




```

## Install Nginx

[Node app deploy with nginx & SSL · GitHub](https://gist.github.com/bradtraversy/cd90d1ed3c462fe3bddd11bf8953a896)

```bash
sudo apt install nginx
sudo systemctl status nginx
sudo systemctl nginx start
```

OR

```bash

sudo apt install nginx-core    # version 1.18.0-0ubuntu1.6, or
sudo apt install nginx-extras  # version 1.18.0-0ubuntu1.6
sudo apt install nginx-full    # version 1.18.0-0ubuntu1.6
sudo apt install nginx-light
```

## Configure Nginx

```bash

sudo nano /etc/nginx/sites-available/default


```

```
   location / {
                # First attempt to serve request as file, then
                # as directory, then fall back to displaying a 404.
                try_files $uri $uri/ =404;
        }

```

Sample Nginx File

```bash
server {
root /var/www/html;
# Add index.php to the list if you are using PHP

index index.html index.htm index.nginx-debian.html;

      server_name <domain> www.<domain>;



    location / {

        proxy_pass http://localhost:8000; #whatever port your app runs on
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;

    }

location /api {

        proxy_pass http://localhost:5000/api; #whatever port your app runs on

        proxy_http_version 1.1;

        proxy_set_header Upgrade $http_upgrade;

        proxy_set_header Connection 'upgrade';

        proxy_set_header Host $host;

        proxy_cache_bypass $http_upgrade;

    }

location /graphql {

        proxy_pass http://localhost:5000/graphql; #whatever port your app runs on

        proxy_http_version 1.1;

        proxy_set_header Upgrade $http_upgrade;

        proxy_set_header Connection 'upgrade';

        proxy_set_header Host $host;

        proxy_cache_bypass $http_upgrade;

    }

```

```bash
sudo nginx -t # check nginx config

sudo cp default crm.feedback.so

#change server name to  server_name crm.feedback.so www.crm.feedback.so;

sudo ln -s /etc/nginx/sites-available/mealcrm.dev.asal.so /etc/nginx/sites-enabled/


sudo apt install software-properties-common
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python-certbot-nginx

sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
sudo certbot --nginx -d crm.feedback.so -d www.crm.feedback.so
```

## Instructions on using install.py script

Make sure you have python 3.9 or higher to run the script, since we're using type hints.

```bash
sudo apt update && sudo apt upgrade -y

```

## Update the python version

```bash
sudo apt-get install python3.10
```

## Actions setup in github

Go to your repo -> settings -> acitons -> runner -> new runner -> [runner name]

You will get a script to run in your linux server. just follow the steps and you will be good to go.

## Run svc.sh for github actions automation

```bash
sudo ./svc.sh help
sudo ./svc.sh install
sudo ./svc.sh status
sudo ./svc.sh start
```
