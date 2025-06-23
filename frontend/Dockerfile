# Build step
FROM node:18 as build

WORKDIR /app
COPY . .
RUN npm install && npm run build

# Serve with Nginx
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
