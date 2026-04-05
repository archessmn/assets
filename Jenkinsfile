library 'github.com/archessmn/jenkins-library@main'

pipeline {
  agent any
  
  options {
    ansiColor('xterm')
  }

  environment {
    GITHUB_CREDS = credentials('github-app-archessmn')
    PATH="/run/current-system/sw/bin"
  }

  stages {
    stage('Prepare') {
      steps {
        script {
          def imageNamePrefix = ''
          if (env.BRANCH_NAME != 'main') {
            imageNamePrefix = "${env.BRANCH_NAME}-"
          }
          imageTag = "${imageNamePrefix.replace('/', '--')}${env.BUILD_NUMBER}"
        }
      }
    }
    stage('Build Images') {
      steps {
        script {
          image = docker.build("archessmn/assets:${imageTag}")
        }
      }
    }

    stage('Push') {
      when {
        anyOf {
          branch 'main'
          tag 'v*'
          changeRequest target: 'main'
        }
      }
      steps {
        script {
          docker.withRegistry('https://ghcr.io', 'github-app-archessmn') {
            image.push()
          }
        }
      }
    }
  }

  post {
    always {
      cleanWs()
    }
  }
}
