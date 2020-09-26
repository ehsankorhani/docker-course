# Docker Compose

> With Compose, you use a YAML file to configure your application’s services. Then, with a single command, you create and start all the services from your configuration.

In real world several different types of softwares are required to make a an application. An API service, database, front-end app, caching or messaging services, etc. Each of these services can run and extend in different containers.

In this section we will explore how to run and manage multi-container docker environment.

<br>

## Install docker-compose

In Ubuntu terminal install with:

```
$ sudo apt  install docker-compose
```

<br>

## Create an app

For this example I will create a express.js API with Redis.

Install these dependencies:
* express
* redis

Create a Redis Client module:

```js
// ./redis/client.js
const redis = require('redis');
const {promisify} = require('util');
const client = redis.createClient(process.env.REDIS_URL);

module.exports = {
  ...client,
  getAsync: promisify(client.get).bind(client),
  setAsync: promisify(client.set).bind(client),
  keysAsync: promisify(client.keys).bind(client)
};
```


In ```server.js``` create two endpoint to store and retrieve data:

```js
// server.js
app.post('/store', async (req, res) => {
    const key = Object.keys(req.body)[0];
    const value = req.body[key];
    await redisClient.setAsync(key, value);
    return res.send('Success');
});

app.get('/:key', async (req, res) => {
    const { key } = req.params;
    const rawData = await redisClient.getAsync(key);
    return res.send(rawData);
});
```

Create a simple ```Dockerfile```:

```
FROM node:14.11.0-alpine
WORKDIR /usr/src/app
```

And now put everything together in a ```docker-compose.yml``` file:

```yml
redis:
  image: redis
  container_name: cache
  expose:
    - 6379
app:
  build: ./
  volumes:
    - ./:/usr/src/app
  links:
    - redis
  ports:
    - 3000:3000
  environment:
    - REDIS_URL=redis://cache
    - NODE_ENV=development
    - PORT=3000
  command:
    sh -c 'npm i && node server.js'
```

<br>

### Run the application

Run the docker compose with:

```
docker-compose up
```

You should be able to use a REST API client to interact with this application.

<br>
<br>

---

### References

[Overview of Docker Compose](https://docs.docker.com/compose/)

[Docker for beginners](https://docker-curriculum.com/)

[A Docker/docker-compose setup with Redis and Node/Express](https://codewithhugo.com/setting-up-express-and-redis-with-docker-compose/)