pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
        DOCKER_USER = "${DOCKERHUB_CREDENTIALS_USR}"
        DOCKER_PASS = "${DOCKERHUB_CREDENTIALS_PSW}"
        BACKEND_IMAGE = "sowrimanoj/bloodbank-backend"
        FRONTEND_IMAGE = "sowrimanoj/bloodbank-frontend"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/SowriManoj/BloodBankSystem.git'
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                script {
                    dir('backend') {
                        sh """
                        docker build -t ${BACKEND_IMAGE}:latest .
                        """
                    }
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                script {
                    dir('lifeline-link-22-main') {
                        sh """
                        docker build -t ${FRONTEND_IMAGE}:latest .
                        """
                    }
                }
            }
        }

        stage('Push Backend Image to Docker Hub') {
            steps {
                sh """
                echo '${DOCKER_PASS}' | docker login -u '${DOCKER_USER}' --password-stdin
                docker push ${BACKEND_IMAGE}:latest
                """
            }
        }

        stage('Push Frontend Image to Docker Hub') {
            steps {
                sh """
                echo '${DOCKER_PASS}' | docker login -u '${DOCKER_USER}' --password-stdin
                docker push ${FRONTEND_IMAGE}:latest
                """
            }
        }

        stage('Deploy using Docker Compose') {
            steps {
                script {
                    sh """
                    docker-compose down
                    docker-compose pull
                    docker-compose up -d
                    """
                }
            }
        }
    }
}
