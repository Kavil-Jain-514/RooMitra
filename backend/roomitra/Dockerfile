FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
COPY target/deploy/roomitra.jar app.jar
COPY target/deploy/application.properties application.properties
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]