pipeline {

    environment {
        registry = "f-ksolutions"
        acPort = 1337
        dockerImage = ''
        }

    agent {
    node {
     label 'alphahedgeHoldings_com','alphahedgeHoldings_ru'
     }
    }

    stages {
            stage('Delete old container') {
                        steps {
                            script {
                             try {
                           sh("java --version")
                           sh("docker stop alphahold-f")
                           sh("docker rm alphahold-f")
                           sh("docker rmi alphahold-f")
                                        } catch (err) {
                                            echo err.getMessage()
                                        }
                            }
                         }
                    }
            stage('Build docker image') {
                 steps {
                     script {
                        sh("docker build -t  alphahold-f . ")
                     }
                  }
             }
            stage('Run docker container') {
                 steps {
                     script {
                        sh("docker run -td --restart unless-stopped --name alphahold-f -p 5000:3000 alphahold-f")
                     }
                  }
             }
        }
}
