# Dockerfile

## Docker image

Docker images are the basis of containers. They are like blueprints that we make our containers from them.

In the previous sections, the *busybox* and *redis* where the images that we pulled from *Docker Hub* registry. The ```run``` command created a container based on these images.

To view the list of all pulled images in our local machine:

```
$ docker images
```
| REPOSITORY | TAG | IMAGE ID | CREATED | SIZE |
| ------------ | ----- | ------- | ------- | ------ |
| node | 14.11.0-alpine | b85fc218c00b | 6 days ago | 117MB |
| ehsankorhani/ec2-app | latest | 23f69032881b | 7 days ago | 118MB |
| redis | latest | 23f69032881b | 12 days ago | 118MB |
| busybox | latest | 6858809bf669 | 2 weeks ago | 1.23MB |
| postgres | latest | 62473370e7ee | 5 weeks ago | 314MB |
| python | 3 | 659f826fabf4 | 4 months ago | 934MB |
| hello-world | latest | bf756fb1ae65 | 8 months ago | 13.3kB |

```TAG``` refers to a particular snapshot/version of the image. When pulling if you don't provide a tag, docker will get us the ```latest``` by default.

```
$ docker pull node
# or
$ docker pull node:latest
# or
$ docker pull node:14.11.0-alpine
```

We can browse the https://hub.docker.com to find a particular image, or we can use ```docker search <search-term>``` to look for them locally.

```
$ docker search ehsankorhani
$ docker search node 
```

<br>

### Base vs. Child image

Every **child** image requires a **base** image. The base images might in turn have other images as base.

To create a child image we need:
1. A base image
2. Commands to add or install other programs/dependencies
3. Command(s) to run on container startup

<br>

## Create a Dockerfile

A Dockerfile is a simple text file that contains a list of commands and configurations. These configurations specify the container behavior - what does it contain and what it does.

In the simplest form it includes these lines of command:

```dockerfile
FROM <base-image>
RUN <command>
CMD <instructions>
```

Steps to create a Dockerfile are:

1. Create a blank file and name it ```Dockerfile``` (without any extension)
2. Enter the configurations
3. Build the image

<br>

### Example

**Redis server**

In Dockerfile:

```dockerfile
FROM alpine
RUN apk add --update redis
CMD ["redis-server"]
```

And build with:

```
$ docker build .
```

The ```.``` is the current path and provides the set of files that we want to wrap into this container.

```
Sending build context to Docker daemon   5.12kB
Step 1/3 : FROM alpine
latest: Pulling from library/alpine
df20fa9351a1: Pull complete 
Digest: sha256:185518070891758909c9f839cf4ca393ee977ac378609f700f60a771a2dfe321
Status: Downloaded newer image for alpine:latest
 ---> a24bb4013296
Step 2/3 : RUN apk add --update redis
 ---> Running in 51cb884e3a38
fetch http://dl-cdn.alpinelinux.org/alpine/v3.12/main/x86_64/APKINDEX.tar.gz
fetch http://dl-cdn.alpinelinux.org/alpine/v3.12/community/x86_64/APKINDEX.tar.gz
(1/1) Installing redis (5.0.9-r0)
Executing redis-5.0.9-r0.pre-install
Executing redis-5.0.9-r0.post-install
Executing busybox-1.31.1-r16.trigger
OK: 7 MiB in 15 packages
Removing intermediate container 51cb884e3a38
 ---> c93ebe6fe658
Step 3/3 : CMD "redis-server"
 ---> Running in ff256f1fd170
Removing intermediate container ff256f1fd170
 ---> 8aa97cb0f591
Successfully built 8aa97cb0f591
```

This took Docker a little bit of time to fullfil all the steps. For every instruction, a container is created and then removed (beside the first one).<br>

Also this image does not have a name and only an Id:

```
$ docker images
```
| REPOSITORY | TAG | IMAGE ID | CREATED | SIZE |
| ------------ | ----- | ------- | ------- | ------ |
| ```<none> ``` | ```<none>``` | 8aa97cb0f591 | 4 minutes ago | 8.74MB |


<br>

### Rebuild with cache

Docker caches unchanged steps and tasks. Everything after a change will re-build again. So, if we only make a change in ```CMD``` the rest does not need to be run again.

> If you expect a change, place it as far down as possible

We can specify a **Tag** to create our image with a name:

```
$ docker build -t ehsankorhani/redis:latest .
```
```
Sending build context to Docker daemon  6.656kB
Step 1/3 : FROM alpine
 ---> a24bb4013296
Step 2/3 : RUN apk add --update redis
 ---> Using cache
 ---> c93ebe6fe658
Step 3/3 : CMD "redis-server"
 ---> Using cache
 ---> 8aa97cb0f591
Successfully built 8aa97cb0f591
Successfully tagged ehsankorhani/redis:latest
```

This time the build was much faster.

```
$ docker images
```
| REPOSITORY | TAG | IMAGE ID | CREATED | SIZE |
| ------------ | ----- | ------- | ------- | ------ |
| ehsankorhani/redis | latest | 8aa97cb0f591 | 13 minutes ago | 8.74MB |

<br>

### Commit
With ```docker commit``` an image can be created from a container.<br>
But this does not used often.


<br>
<br>

---

### Reference
[Docker and Kubernetes: The Complete Guide](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/)

[A Docker Tutorial for Beginners](https://docker-curriculum.com/)