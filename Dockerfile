FROM debian:latest

# Set environment variables
ENV NODE_VERSION=20 \
    ANGULAR_CLI_VERSION=latest

# Install dependencies
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    ca-certificates \
    && curl -fsSL https://deb.nodesource.com/setup_$NODE_VERSION.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g @angular/cli@$ANGULAR_CLI_VERSION \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set work directory
WORKDIR /app

# Copy package.json and package-lock.json first for efficient caching
# COPY package*.json ./

# Install dependencies
# RUN npm install

# Copy the rest of the application
COPY . .

# Expose the Angular default port
EXPOSE 4200

# Start the Angular application
#CMD ["npm", "start"]
#CMD bash
CMD ["ng serve"]
