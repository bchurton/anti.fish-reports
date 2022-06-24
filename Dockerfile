FROM node:16-alpine

WORKDIR /workspace

# Install dependencies
COPY package.json package-lock.json ./
RUN npm i

# Checkout project
COPY . ./

# Run app
CMD ["sh", "./start-app.sh"]
