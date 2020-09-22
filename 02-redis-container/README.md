# Redis docker container

Redis is an in-memory key–value database with optional durability.

<br>

## Retrieve and start a Redis container 

```
$ docker run --name my-first-redis -d redis
```

```docker ps``` will confirm that our container is running:

| CONTAINER ID | IMAGE | COMMAND | CREATED | STATUS | PORTS | NAMES |
| ------------ | ----- | ------- | ------- | ------ | ----- | ----- |
| 8a94fd6753e4 | redis | "docker-entrypoint.s…" | 3 minutes ago | Up 3 minutes | 6379/tcp | my-redis |


This info shows that the access port for the container is: 6379

<br>

## Connect to Redis
Lets start the interactive shell with:

```
$ docker exec -it my-redis sh
```
```
# 
```

Now we can connect to the Redis container instance with ```redis-cli```:

```
# redis-cli
127.0.0.1:6379> 
```

Test the Redis connection with:

```
127.0.0.1:6379> ping
PONG
```

And set some key/value:

```
127.0.0.1:6379> set name ehsan
OK
127.0.0.1:6379> get name
"ehsan"
```

<br>

## Access Redis from another container

We use ```--link``` flag to connect two containers.

```
$ docker run --name my-app --link my-redis:redis -d redis
```

Because we want a container that has *Redis* installed, we create another Redis based container (my-app). In this new container we refer to our existing Redis container (my-redis) as redis.

Lets run an interactive shell:

```
$ docker exec -it my-app sh
```

And try to get ```name```:

```
# redis-cli
127.0.0.1:6379> get name
(nil)
```

So the 'name' does not defined here. ```quit``` and connect it to the previous Redis container:

```
127.0.0.1:6379> quit

# redis-cli -h redis
redis:6379> get name
"ehsan"
```

<br>

## Access Redis from Remote Server

To connect to a Redis container from a remote server, you can use **Docker port forwarding**: ```-p [host-port]:[client-port]```.

```
$ docker run it --name my-redis -p 9900:6379 redis sh
```

This container exposes port ```9900``` to outside world.

Set a key/value:

```
# redis-cli
127.0.0.1:6379> set car ranger
OK
127.0.0.1:6379> get car
"ranger"
127.0.0.1:6379> quit
```

If you have Redis installed in a server you can use the exposed port to connect to this container Redis with this command: ```redis-cli -h [host IP or domain name] -p [host-port]```

For example:

```
$ redis-cli -h 192.168.0.1 -p 9900
```

<br>

---

<br>

### References

[How To Deploy And Run Redis In Docker](https://phoenixnap.com/kb/docker-redis)