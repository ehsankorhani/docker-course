# Dockerize a Node.js Express API

*Node.js* is a non-blocking JavaScript runtime and *Express.js* is a middleware for developing REST APIs.

## Retrieve and start a Node container 

The *Node* image is around 650mb in size. We can retrieve an smaller version. But then we have to install the requirements on the smaller ones. We might end up having too many different containers with larger size than if we were using the original one.


For our example, we will get an slimmer version of node.

```
$ docker run -it --name my-app node:14.11.0-alpine sh
```
```
Status: Downloaded newer image for node:14.11.0-alpine
Welcome to Node.js v14.11.0.
/ #
```

<br>

## Dockerizing an app

To make an application work inside a container:
1. Create the app
2. Create Dockerfile
3. Build the image
4. Run container
5. Connect to (web) app (from a browser)

<br>

### Create a Node.js Express API 

Follow these steps to create a simple express API:

1. Initialize a new npm project

```
$ npm init -y
```

2. Create required files and folders:

```
$ touch .gitignore
$ touch .dockerignore
$ touch app.js
```

Ignore required files and folder in ```.gitignore``` and ```.dockerignore```.

3. Install ```express.js``` basic app required modules:

```
$ npm install --save express cors
```

4. Add code to create the API inside ```app.js```.

5. Run and test the app

```
$ npm run dev
```

<br>

### Dockerfile

Create a Dockerfile as follows (remove comments):

```dockerfile
# using alpine version of node as the base image
FROM node:14.11.0-alpine

# Create and set the default app directory
# If not specified, everything will be copied to the root folder in container Linux system
WORKDIR /usr/src/app

# Copy package.json to install dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy all files to the image
COPY . .

# Expose a port to outside word
EXPOSE 3000

# CMD is the command the container executes by default when you launch the built image.
CMD ["npm", "run", "start"]
``` 

Dockerfile can have only one CMD but can be overridden with ```docker run <image> <command>```.

<br>

### .dockerignore

To prevent your local modules and debug logs from being copied onto your Docker image and possibly overwriting modules installed within your image add these lines to ```.dockerignore```:

```yaml
# Ignore node_modules
node_modules/
npm-debug.log
```

<br>

## Build the image

In terminal, go the directory containing the *Dockerfile* and run the build command:

```
$ docker build -t ehsankorhani/node-express-app .
```
The ```-t``` flag allows you to tag your image.

```
Sending build context to Docker daemon  61.95kB
Step 1/7 : FROM node:14.11.0-alpine
 ---> b85fc218c00b
Step 2/7 : WORKDIR /usr/src/app
 ---> Running in aacfee76802d
Removing intermediate container aacfee76802d
 ---> e841f36aba16
Step 3/7 : COPY package*.json ./
 ---> 723f0ead22fb
Step 4/7 : RUN npm install
 ---> Running in 72b6a9edf667

> nodemon@2.0.4 postinstall /usr/src/app/node_modules/nodemon
> node bin/postinstall || exit 0

added 170 packages from 87 contributors and audited 171 packages in 4.889s

10 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

Removing intermediate container 72b6a9edf667
 ---> 8fae6cdfd4e3
Step 5/7 : COPY . .
 ---> 746ad0609b51
Step 6/7 : EXPOSE 3000
 ---> Running in 2fe028ee3d66
Removing intermediate container 2fe028ee3d66
 ---> 3c83f5c3d3eb
Step 7/7 : CMD ["npm", "run", "start"]
 ---> Running in 35c62c73bdb5
Removing intermediate container 35c62c73bdb5
 ---> c3f26624d555
Successfully built c3f26624d555
Successfully tagged ehsankorhani/node-express-app:latest
```

Your image is ready.

```
$ docker images
```
| REPOSITORY | TAG | IMAGE ID | CREATED | SIZE |
| ------------ | ----- | ------- | ------- | ------ |
| ehsankorhani/node-express-app| latest | c3f26624d555 | About a minute ago | 122MB |

<br>

## Run the image

Run the image with a ```-d``` flag so it stays running in the background.

```
docker run --name my-express-app -p 8080:3000 -d ehsankorhani/node-express-app
```

<br>

### Port mapping

The ```-p``` flag redirects a public port (in the case 8080) to a private exposed port inside the container. Remember we exposed port 3000 in Dockerfile?

This would be visible when you ```docker ps``` to view the running containers.

<br>

### Interact with the container

In you browser enter address ```http://127.0.0.1:8080/``` and you should be able to view the response from this API route:

```js
app.get('/', (req, res) => {
    res.status(200).send('hello world');
});
```

Or use the terminal to run a ```curl``` get command:

```
$ curl -i localhost:8080
```

In addition, you can execute the container in interactive mode and view your files:

```
$ docker exec -it my-express-app sh
```
```
/usr/src/app # ls
Dockerfile         README.md          app.js             node_modules       package-lock.json  package.json
```

<br>
<br>

---

### Reference
[Docker and Kubernetes: The Complete Guide](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/)

[Let’s Dockerize a Nodejs Express API](https://itnext.io/lets-dockerize-a-nodejs-express-api-22700b4105e4)

[Dockerizing a Node.js web app](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)