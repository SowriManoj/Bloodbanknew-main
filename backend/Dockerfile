# ================================
#  Stage 1: Build the application
# ================================
FROM eclipse-temurin:21-jdk AS builder

WORKDIR /app

# Copy Maven wrapper and config
COPY mvnw .
COPY .mvn/ .mvn/

# Copy pom.xml first (layer caching)
COPY pom.xml .

# Pre-download dependencies (optional but speeds up builds)
RUN chmod +x mvnw && ./mvnw dependency:go-offline

# Copy source code
COPY src ./src

# Build the application
RUN ./mvnw clean package -DskipTests


# ================================
#  Stage 2: Run the application
# ================================
FROM eclipse-temurin:21-jdk

WORKDIR /app

# Copy built JAR from builder stage
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar"]
