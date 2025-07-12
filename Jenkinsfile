pipeline {
  agent any

  environment {
    DOCKER_IMAGE = "sumit0708/gcs-telemetry"
    DOCKER_CREDENTIALS_ID = 'docker-hub-creds'
  }

  tools {
    nodejs 'NodeJS' // Make sure this matches Jenkins NodeJS tool name
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/sumit0106/gcs-telemetry.git'

      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Lint') {
      steps {
        sh 'npm run lint'
      }
    }

    stage('Test') {
      steps {
        sh 'npm test'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh 'docker build -t $DOCKER_IMAGE .'
      }
    }

    stage('Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: env.DOCKER_CREDENTIALS_ID, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh '''
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
            docker push $DOCKER_IMAGE
          '''
        }
      }
    }

    stage('Deploy using docker-compose') {
      steps {
         withCredentials([string(credentialsId: 'env-file-secret', variable: 'ENV_CONTENT')]) {
          sh '''
            echo "$ENV_CONTENT" > .env
            docker-compose down || true
            docker-compose up -d
          '''
      }
    }
  }
  }
  post {
    always {
      echo 'Pipeline completed'
    }
  }
}

