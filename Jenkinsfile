pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/SowriManoj/Bloodbanknew-main.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                bat 'docker build -t sowrimanoj/bloodbank-backend ./backend'
            }
        }

        stage('Build Frontend Image') {
            steps {
                bat 'docker build -t sowrimanoj/bloodbank-frontend ./lifeline-link-22-main'
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds',
                                                 usernameVariable: 'USER',
                                                 passwordVariable: 'PASS')]) {
                    bat 'docker login -u %USER% -p %PASS%'
                    bat 'docker push sowrimanoj/bloodbank-backend'
                    bat 'docker push sowrimanoj/bloodbank-frontend'
                }
            }
        }

        stage('Deploy using Kubernetes') {
            steps {
                bat 'kubectl apply -f k8s/'
            }
        }
    }
}
