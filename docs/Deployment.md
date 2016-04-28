# Deployment

## Local Setup

### Bash

```sh
# install all this bullshit
brew cask install dockertoolbox
brew install kubernetes-cli
brew install awscli

# set up your aws credentials
aws configure

# weird docker stuff you have to do
docker pull node:latest
docker pull rethinkdb:latest
docker-machine create --driver virtualbox default
eval "$(docker-machine env default)"
docker build -t <your username>/<your app name> .

# configure kubernetes
export KUBERNETES_PROVIDER=aws
export KUBE_AWS_ZONE=eu-west-1c
export NUM_NODES=2
export AWS_S3_REGION=eu-west-1
export AWS_S3_BUCKET=yourappname-kubernetes-artifacts
export INSTANCE_PREFIX=k8s
curl -sS https://get.k8s.io | bash
```

## Local Testing

```
docker run -d -p 9080:80 <your username>/<your app name>
```
