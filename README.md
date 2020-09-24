# Microservices architecture with Docker containers
A path to build a master Docker and Kubernetes.

<br>

## Why Docker

Docker allows users to package an application with all of its dependencies into a standardized unit for software development.

<br>

### Images and containers

A Docker image includes everything needed to run an application - the code or binary, runtimes, dependencies, and any other filesystem objects required.

As a developer, we can think of image as a ```class```. Then container is an ```instance``` of that class.

Container is just a running process. Only with extra features to isolate it from the host and other containers.

The process that runs in the operating system is called ```Daemon```. Daemon manages building, running and distributing Docker containers.

<br>

### Installation

Follow the instruction on: [Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/) for Ubuntu OS.


<br>

## Check Docker status

Run the Docker status checker command:

```
sudo systemctl status docker
```

You should see:

```
● docker.service - Docker Application Container Engine
     Loaded: loaded (/lib/systemd/system/docker.service; enabled; vendor preset: enabled)
     Active: active (running) since Tue 2020-09-22 18:43:20 AEST; 2h 12min ago
TriggeredBy: ● docker.socket
       Docs: https://docs.docker.com
   Main PID: 171660 (dockerd)
      Tasks: 18
     Memory: 53.8M
     CGroup: /system.slice/docker.service
             └─171660 /usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock
...
```

<br>

## What is Kubernetes

<br>

### Table of contents
Section 1 - **Docker commands**: basic commands.

Section 2 - **First container**: a working redis container.

Section 3 - **Dockerfile**: creating a docker image.

Section 4 - **Dockerizing**: an app in a container.


<br><br>

### References

[A Docker Tutorial for Beginners](https://docker-curriculum.com/)