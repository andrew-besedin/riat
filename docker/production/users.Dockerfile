FROM node:20
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build users
# PROD COMMAND:
CMD [ "npm", "run", "start", "users" ]