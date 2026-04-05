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
        sh "docker login -u ${env.GITHUB_CREDS_USR} -p ${env.GITHUB_CREDS_PSW} https://ghcr.io"
        script {
          docker.withRegistry('https://ghcr.io') {
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
