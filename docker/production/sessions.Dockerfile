FROM node:20
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build sessions
# PROD COMMAND:
CMD [ "npm", "run", "start", "sessions" ]