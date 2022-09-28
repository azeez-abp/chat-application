pipeline {
    agent any
    tools {nodejs "node"}
    // agent {
    //     docker {
    //         image 'node:lts-bullseye-slim' 
    //         args '-p 3000:3000' 
    //     }
    // }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
    }
}
