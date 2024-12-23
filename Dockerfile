FROM node:20-alpine
RUN npm install -g pnpm
WORKDIR /docs
COPY package.json /docs/ 
RUN npm install 
COPY . /docs/
RUN npm build
CMD ["npm","start"]
