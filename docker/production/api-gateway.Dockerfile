FROM node:20
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build riat
# PROD COMMAND:
CMD [ "npm", "run", "start", "riat" ]