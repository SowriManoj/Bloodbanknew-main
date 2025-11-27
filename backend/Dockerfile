# Stage 1: Build the app
FROM eclipse-temurin:21-jdk AS builder

WORKDIR /app

# Install dos2unix (needed because Jenkins clones on Windows)
RUN apt-get update && apt-get install -y dos2unix

# Copy Maven wrapper
COPY mvnw .
COPY mvnw.cmd .
COPY .mvn/ .mvn/

# Fix Windows → Linux line endings
RUN dos2unix mvnw && chmod +x mvnw

# Copy project files
COPY pom.xml .
COPY src ./src

# Download dependencies
RUN ./mvnw dependency:go-offline

# Build application
RUN ./mvnw clean package -DskipTests

# Stage 2: Run the app
FROM eclipse-temurin:21-jdk

WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]
