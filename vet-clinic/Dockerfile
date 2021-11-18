# Set the base image to node:12-alpine
FROM node:12-alpine as build

# Specify where our app will live in the container
WORKDIR /vet-clinic

# Copy the React App to the container
COPY .. /vet-clinic/

# Prepare the container for building React
RUN yarn install
RUN yarn global add react-scripts@3.0.1
# We want the production version
RUN yarn run build

# Prepare nginx
FROM nginx:1.16.0-alpine
COPY --from=build build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

# Fire up nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]