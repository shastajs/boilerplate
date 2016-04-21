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

# set your kubernetes shit to aws
export KUBERNETES_PROVIDER=aws

# weird docker stuff you have to do
docker-machine create --driver virtualbox default
eval "$(docker-machine env default)"
docker build -t <your username>/<your app name> .
```

## Local Testing

```
docker run -d -p 9080:80 <your username>/<your app name>

open 'http://localhost:9080'
```
