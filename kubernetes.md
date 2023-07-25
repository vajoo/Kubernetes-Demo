# Kubernetes

## Main Concepts:
- Pod -> abstraction of containers
- Service -> for communication with static IP´s
- Ingress -> route traffic into cluster, individual IP to external
- ConfigMap -> external configuration for connections
- Secret -> external communication for passwords and secrets
- Volume -> to store data which is not lost after recreate some pods
- Deployment -> blueprint to deploy and build application pods 
- StatefulSet -> blueprint to deploy and build stateful applications like database pods

## Kubernetes Cluster setup
- every cluster needs a master process
- any amount of application pods or database pods
- every pod has a service with a static IP to access it
- the services are connected to an ingress to get data from external
- Clusters where configured declerativ

## Minicube
- for testing purposes it will generate the master process and worker pods on one maschine(node)
- on production theese are seperated
- otherwise it would be hard to setup the cluster on one local maschine
- it's for configuration of the environment

## Kubectl
- commandline tool to interact with the master process (pod)
- communicates to the api server on the master process
- most powerfull tool for communication next to UI or API
- auto installed with minikube

## Setup
- https://minikube.sigs.k8s.io/docs/start/ -> Tutorial and download
- start with: minikube start --driver docker
- check status with: minikube status
- continue with kubectl
- get info of nodes in cluster with: kubectl get node

- write the config files

- apply the config files with: kubectl apply -f <filename>
- check if everything is up with: kubectl get all
- get all pods with: kubectl get pod
- view logs with: kubectl logs <pod-name> -> stream logs with -f at the end
- get ip to access the node with: minikube ip or kubectl get node -o wide