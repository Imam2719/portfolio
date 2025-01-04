# Use Eclipse Temurin JDK 17 with Alpine Linux as the base image
FROM eclipse-temurin:17-jdk-alpine

# Set working directory in container
WORKDIR /app

# Copy the JAR file
COPY target/Portfolio-0.0.1-SNAPSHOT.jar

# Set Java options if needed (optional but recommended)
ENV JAVA_OPTS="-Xmx512m -Xms256m"

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application with optional Java opts
ENTRYPOINT ["sh", "-c", "java ${JAVA_OPTS} -jar app.jar"]