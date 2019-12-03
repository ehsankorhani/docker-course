### Section 1
## Docker commands

### Run command

Docker has a concept of "base containers", which you use to build off of.

An image can be pulled from Docker registry by:

```bash
$ docker pull <image>
```

Command to run an image:

```bash
$ docker run <image> [command]
```

This command is equal to:

```bash
$ docker create <image> 
$ docker start -a <container-id> [command] # command will run only the first time
```

Command ```-a``` is to watch for output/attach. Or you can add this command:

```bash
$ docker attach
```

**example:**

```bash
$ docker run busybox
# or
$ docker run busybox echo "hello from busybox"
```

### Display containers

```bash
$ docker ps # all running containers right now
$ docker ps -all # lists all containers ever created
$ docker ps -a # same as above
```

### Remove containers

Remove a specific container(s):

```bash
$ docker rm <container-id>
```

Remove all stopped containers:

```bash
$ docker container prune
```

Remove:
  - all stopped containers
  - all networks not used by at least one container
  - all dangling images
  - all dangling build cache

```bash
$ docker system prune
```

### Start and Log

We might want to view the output result of a container for second time.

```bash
$ docker run busybox echo "hello from busybox"
# -> hello from busybox
```

The ```start``` command will make that possible.

```bash
$ docker start -a <container-id>
```

as in:

```bash
$ docker start -a 537270fbc66f
# -> hello from busybox
```

However, ```start``` can be expensive and time-consuming to run.

```logs``` command will only display the container output without running it.

```bash
$ docker logs 537270fbc66f
# -> hello from busybox
```

### Stopping a running container

To stop a detached container, run:

```bash
$ docker stop <container-id> # will give 10 second to container to stop
```

But if you want to stop it immediately:

```bash
$ docker kill <container-id>
```

### Assign a name to a container

Beside using container-id we can give a name to a container:

```bash
$ docker run --name ubuntu_bash --rm -i -t ubuntu bash
```

then (in a separate terminal):

```bash
$ docker stop ubuntu_bash
```

### Execute additional command

We can run commands on a running container with:

```bash
$ docker exec -it <container-id>|<name> <command> 
```

the ```-it``` is consist of ```-i``` for interactive/stdin and ```-t``` to allocate a pseudo-TTY.

Suppose we run a container as:

```bash
$ docker run --name ubuntu_bash --rm -i -t ubuntu bash
```

in a separate terminal we can run:

```bash
$ docker exec -it ubuntu_bash bash
```

or create a folder by:

```bash
$ docker exec -d ubuntu_bash touch /tmp/docker_tutorial
```

We can check the effect in the first terminal with:

```bash
/ cd tmp
/tmp/ dir
```

If the container is not in run mode we can do:

```bash
$ docker run -it <image> <command>
```


---

### Reference
[Docker and Kubernetes: The Complete Guide](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/)

[A Docker Tutorial for Beginners](https://docker-curriculum.com/)

[Getting Started with Docker](https://serversforhackers.com/c/getting-started-with-docker)

[Docker Documentation](https://docs.docker.com/)
