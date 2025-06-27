FROM nginx:alpine

# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy the server block configuration files to the container
COPY ./.dev/nginx/nginx.conf /etc/nginx/conf.d/

# Expose ports 80 and 443
EXPOSE 80 443

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
