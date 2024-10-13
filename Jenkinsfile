def img
pipeline {
    environment{
        registry = "pankaj384/webinterface"
        registryCredential = "docker-hub-login"
        dockerImage = ""
    }
    agent any

    stages {
        stage("build checkout"){
            steps{
                echo "===============Fatching New code from GitHub====================="
                git branch: 'main', url: 'https://github.com/Pankaj-22/API-Learning.git'
            }
        }
        stage("build Image"){
            steps{
                echo "===============Building the build image=========================="
                script{
                    img = registry + ":${env.BUILD_ID}"
                    println("${img}")
                    dockerImage = docker.build("${img}")
                }
            }
        }
        stage("build Test"){
            steps{
                echo "===============Test the build====================================="
                powershell "docker ps -q | % { docker stop \$_ }"
                bat "docker run -d --rm --name ${JOB_NAME} -p 5500:80 ${img}"
            }
        }
        stage("Push build to docker"){
            steps{
                echo "===============Publish to stage/docker repo========================"
                script{
                    // This step should not normally be used in your script. Consult the inline help for details.
                    withDockerRegistry(credentialsId: 'docker-hub-login', url: 'https://index.docker.io/v1/') {
                    // some block
                        bat "docker push ${img}"
                        bat "docker logout"
                    }
                }
            }
        }
        stage("Deploy build to ubuntu server"){
            steps{
                script{
                    echo "===============Deploy the build========================"
                    sshagent(['ubserver-login-key']) {
                        // def dockerKill = "docker kill \$(docker ps -q)"
                        def dockerRun = "docker run -d --rm --name ${JOB_NAME} -p 5500:80 ${img}"
                        echo "ssh -o StrictHostKeyChecking=no  ubserver@192.168.56.101 /home/ubserver/dockerKill.sh"
                        sh "ssh -o StrictHostKeyChecking=no  ubserver@192.168.56.101 /home/ubserver/dockerKill.sh"
                        
                        echo "ssh -o StrictHostKeyChecking=no  ubserver@192.168.56.101 ${dockerRun}"
                        sh "ssh -o StrictHostKeyChecking=no  ubserver@192.168.56.101 ${dockerRun}"
                    }
                }
            }
        }
    }
}
