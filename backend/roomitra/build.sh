#!/bin/bash

echo "Building RooMitra application..."

# Make script executable
chmod +x mvnw

# Clean and package the application
./mvnw clean package -DskipTests

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "Build successful!"
    
    # Create deploy directory if it doesn't exist
    mkdir -p target/deploy
    
    # Copy JAR file to deploy directory with custom name
    cp target/roomitra-0.0.1-SNAPSHOT.jar target/deploy/roomitra.jar
    
    # Copy application.properties to deploy directory
    cp src/main/resources/application.properties target/deploy/
    
    echo "Deployment files ready at target/deploy/"
else
    echo "Build failed!"
    exit 1
fi