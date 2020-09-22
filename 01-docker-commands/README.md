## Section 1
# Docker commands

## Run command

Docker has a concept of "base containers", which you use to build you image off.

The command to run an image is:

```bash
$ docker run <image-name> [command]
```

```<image-name>``` is the name of the image you want to run as a container. The optional ```[command]``` is the command that will run on the container when it loads up.

Behind the scene ```docker run``` will try to find the image in the local machine, and if not found it will download it from [Docker Hub](https://hub.docker.com/) repository.

<br>

### Display containers

We can manually look for available images in the local system with:

```bash
$ docker ps # all running containers right now
$ docker ps -all # lists all containers ever created
$ docker ps -a # same as above
```

### Pull image

An image can be pulled from Docker registry by:

```bash
$ docker pull <image-name>[:TAG]
```

As mentioned ```docker run``` will perform this command if it couldn't find the image locally.

<br>

### Create and Start

```Docker run``` is equal to:

```bash
$ docker create <image-name>
$ docker start -a <container-id> [command] # command will run only the first time
```

Command ```-a``` is to watch for output/attach. Or you can add this command:

```bash
$ docker attach
```

Normally we only use ```run``` command instead of all these different commands.

<br>

## Run example

**BusyBox** is a very small distributions of Linux. Let's run it for the very first time:

```bash
$ docker run busybox
```
```
Unable to find image 'busybox:latest' locally
latest: Pulling from library/busybox
df8698476c65: Pull complete 
Digest: sha256:d366a4665ab44f0648d7a00ae3fae139d55e32f9712c67accd604bb55df9d05a
Status: Downloaded newer image for busybox:latest
```
```
$
```

So docker downloaded this image. Ran an empty command and exited.

We can confirm this by running:

```
docker ps -a
```

| CONTAINER ID | IMAGE | COMMAND | CREATED | STATUS | PORTS | NAMES |
| ------------ | ----- | ------- | ------- | ------ | ----- | ----- |
| 8991792fcfe8 | busybox | "sh" | 2 minutes ago | Exited (0) 2 minutes ago |  | quizzical_sanderson |

<br>

Lets run a command and list the directories inside these distribution:

```
$ docker run busybox ls
```
```
bin
dev
etc
home
proc
root
sys
tmp
usr
var
```

And check the images again:

```
docker ps -a
```

| CONTAINER ID | IMAGE | COMMAND | CREATED | STATUS | PORTS | NAMES |
| ------------ | ----- | ------- | ------- | ------ | ----- | ----- |
| 2884aaa0b803 | busybox | "ls" | 1 minutes ago | Exited (0) 1 minutes ago |  | unruffled_tu |
| 8991792fcfe8 | busybox | "sh" | 9 minutes ago | Exited (0) 9 minutes ago |  | quizzical_sanderson |
                                                  
Both images exist, but they have been exited. Also, Docker has randomly assigns a ```Name``` to this images.

<br>

### Assign a name to a container

> Tip: it's always a good practice to give the containers a meaningful name when running them.

Beside using container-id we can give a name to a container:

```bash
$ docker run --name ubuntu_bash -i -t busybox sh
```

then (in a separate terminal):

```bash
$ docker stop ubuntu_bash
```

<br>

### Docker Client
Is the command line tool that allows the user to interact with the daemon.

Lets run a new container but this time make it interactive:

```
$ docker run -it --name busybox-distro busybox
#or
$ docker run -it --name busybox-distro busybox sh
```

> Note: the order of these parameters can be important.

The ```-it``` flag attaches an interactive tty in the container. This time the container is not exiting. But awaits our command. We can enter any Linux command or even install stuff there:

```
/ # uname -srm
Linux 5.4.0-45-generic x86_64

/ # echo "hello world!"
hello world!
```

Every time we run an image a new container is created, unless we specify the same name which will cause a Conflict error.

Also, we can - for instance - delete the *bin* folder with ```rm -rf bin```. After that we cannot run any other commands.

If we stop and exit the container, we can run a new fresh container and everything will work. But the same container (specified with particular name) will not work. The changes on that container is permanent.

To find out more about ```run``` command use ```docker run --help```.

<br>

## Remove containers

As we discussed, every time we execute run command a new container is created. We might need to do some cleanup on our system:

Remove a specific container(s):

```bash
$ docker rm <container-id>|<container-name>
```

Remove all stopped (exited) containers:

```bash
$ docker container prune
```

Or alternatively:

```bash
docker rm $(docker ps -a -q -f status=exited)
```

To remove:
  - all stopped containers
  - all networks not used by at least one container
  - all dangling images
  - all dangling build cache

```bash
$ docker system prune
```

If we want to remove a container after we exit we can attach the ```--rm``` flag:

```
docker run --rm -it --name busybox-distro busybox sh
```

<br>

## Start and Log

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

<br>

## Stopping a running container

To stop a detached container, run:

```bash
$ docker stop <container-id> # will give 10 second to container to stop
```

But if you want to stop it immediately:

```bash
$ docker kill <container-id>
```

<br>

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
$ docker run -it <image-name> <command>
```

<br>

---

### Reference
[Docker and Kubernetes: The Complete Guide](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/)

[A Docker Tutorial for Beginners](https://docker-curriculum.com/)

[Getting Started with Docker](https://serversforhackers.com/c/getting-started-with-docker)

[Docker Documentation](https://docs.docker.com/)
