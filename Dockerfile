FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

# NEXT_PUBLIC_API_URL should be set by Kubernetes deployment
# NEXT_PUBLIC_BASE_PATH should be set by Kubernetes deployment

CMD ["sh", "-c", "npm run build && npm start"]