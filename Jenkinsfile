pipeline {
    agent any

    stages {

        stage('Build Backend Image') {
            steps {
                sh 'docker build -t sowrimanoj/bloodbank-backend ./backend'
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh 'docker build -t sowrimanoj/bloodbank-frontend ./lifeline-link-22-main'
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds',
                                                 usernameVariable: 'USER',
                                                 passwordVariable: 'PASS')]) {
                    sh 'docker login -u $USER -p $PASS'
                    sh 'docker push sowrimanoj/bloodbank-backend'
                    sh 'docker push sowrimanoj/bloodbank-frontend'
                }
            }
        }

        stage('Deploy using Kubernetes') {
            steps {
                sh 'kubectl apply -f k8s/'
            }
        }
    }
}
