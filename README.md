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
```


---

### Reference
[Docker and Kubernetes: The Complete Guide](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/)
[A Docker Tutorial for Beginners](https://docker-curriculum.com/)
[Getting Started with Docker](https://serversforhackers.com/c/getting-started-with-docker)
