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

## Setup Video1
- https://minikube.sigs.k8s.io/docs/start/ -> Tutorial and download
- start with: minikube start --driver=hyperv
- check status with: minikube status
- open dashboard with: minikube dashboard
- continue with kubectl
- get info of nodes in cluster with: kubectl get node

- write the config files

- apply the config files with: kubectl apply -f <filename>
- check if everything is up with: kubectl get all
- get all pods with: kubectl get pod
- view logs with: kubectl logs <pod-name> -> stream logs with -f at the end
- get ip to access the node with: minikube ip or kubectl get node -o wide
- get service list with: kubectl get service
- get external ip to connect with: minikube service <service-name> --url

- stop the cluster with: minikube stop
- check it with: minikube status

## Video2
- delete cluster with:  minikube delete --profile <profile-name>
- view existing clusters with: minikube profile list
- see more details of one cluster with: minikube profile view <profile-name>
- view status with: minikube status --profile <profile-name>
- get minikube ip with: minikube ip
- connect to cluster in minikube cli with: minikube ssh
- see all docker containers inside vm with: docker ps

### Explore Kubernetes node
- get cluster info with: kubectl cluster-info
- get info of nodes in cluster with: kubectl get node
- get all pods with: kubectl get pod
- list kubectl namespaces with: kubectl get namespaces
- get pods in namespaces with: kubectl get pods --namespace=<namespace>

### Create a Kubernetes pod
- kubectl run nginx --image=nginx
- view status with: kubectl get pods
- get description of pod with: kubectl describe pod nginx

### Explore Kubernetes pod
- connect to cluster with: minikube ssh
- docker ps
- filter for nginx: docker ps | grep nginx
- run a command on a container in a pod with: kubectl exec <podname> <command>
- print the logs of a container with: kubectl logs <podname> <containername>

### Connect to a container in a pod
- docker exec -it <ID> sh
- check hostname and ip with: hostname and hostname -i
- curl <IP>
- get IP adress of the pod with: kubectl get pods -o wide

the ip is the internal ip of the virtual maschine and the container is not accessable from our computer right now

### Deleting the pod
- kubectl delete pod nginx
- check if it is deleted with kubectl get pods

### Creating and exploring deployment
In Kubernetes, a Deployment or a Replica-Set is an object that manages a set of identical Pods. A Deployment ensures that the desired number of Pods are running and available at all times.
If a Pod fails or is terminated, the Deployment automatically replaces it with a new Pod.

- kubectl create deployment nginx-deployment --image=nginx
- get deployments with: kubectl get deployments
- see description with: kubectl describe deployment nginx-deployment

when the command "kubectl get pods" is typed in a list of pods will appear. The name of the pod is the actual name in this case "nginx-deployment". After that name is a random ID like value to identify this one pod. This is because in a deployment there are many of one container with the same name and to clearly identify each of them the random ID is added to the name

- see each pods of a deployment with: kubectl get pods

### Scale the pods in a deployment
- scale the deployment up or down with: kubectl scale deployment nginx-deployment --replicas=5
- check pods and they're IP´s with: kubectl get pods -o wide
- connect to minikube to check if container are running: minikube ssh
- check if container are running with: curl <ContainerIP>

now the containers are accessable inside the nodes

### Services: Connect to Container outside the pods
- create a service for a deployment with: kubectl expose deployment nginx-deployment --port=8080 --target-port=80
- check the service with: kubectl get services
- get infos with: kubectl describe services

the ip of the deployment is just accessable inside the cluster -> check this with: curl <ClusterIP> -> there should be no result

- ssh into the node with: minikube ssh
- curl <ClusterIP> -> return result -> it works

### Delete deployment
- kubectl delete deployment nginx-deployment

### Delete service
- kubectl delete service nginx-deployment