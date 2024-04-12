pipeline {

    environment {
        registry = " alphahold-f"
        acPort = 1337
        dockerImage = ''
        }

   agent none 

    stages {
            stage('Deploy on com node') {
                 agent {
                    node {
                     label 'alphahedgeHoldings_com'
                         }
                        }
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
                         sh("docker build -t  alphahold-f . ")
                         sh("docker run -td --restart unless-stopped --name alphahold-f -p 5000:3000 alphahold-f")
                            }
                         }
                    }
            stage('Deploy on ru node') {

                agent {
                    node {
                         label 'alphahedgeHoldings_com'
                         }
                      }
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
                         sh("docker build -t  alphahold-f . ")
                         sh("docker run -td --restart unless-stopped --name alphahold-f -p 5000:3000 alphahold-f")
                            }
                  }
             }
        }
}
