# build environment
FROM node:13.12.0-alpine as build
WORKDIR /usr/src/app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json .
COPY package-lock.json* .
RUN npm ci --silent
RUN npm install
COPY . ./
# EXPOSE 80
RUN npm run build

# production environment
FROM nginx:1.12-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]