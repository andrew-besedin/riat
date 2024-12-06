FROM node:20
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build bookings-consumer
# PROD COMMAND:
CMD [ "npm", "run", "start", "bookings-consumer" ]