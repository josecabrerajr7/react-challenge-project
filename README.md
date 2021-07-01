# Shift3 React Challenge Project
This project represents a challenge to test your git flow, programming, and troubleshooting fundamentals. Below you will find instructions on how to complete the challenge, as well as additional information on how to stand up and navigate this project.

## Challenge Instructions
You will begin by creating a fork of this repository to your own Github account. All work will be completed and reviewed within your own fork. Please do not create a Pull Request (PR) back into this repository.

Once you have created your fork, review the Issues labeled `challenge task` [HERE](https://github.com/Shift3/react-challenge-project/issues?q=is%3Aissue+is%3Aopen+label%3A%22challenge+task%22). Shift3's standard for branching is as follows:

- Maintain a `master` and development (`dev`) branch on your fork
- For each feature/task (Issue), create a new branch based off of your `dev` branch
- Once a task has been completed, create a Pull Request from the working branch to your `master` branch and reference the Issue you are working on. **These open PRs will be the final submission which Shift3 will review.**

Once you are ready to submit your work, send an email to your Shift3 contact with a link to your fork.

**Please apply the following Shift3 Standard Practices as you work on this project:**
- Each unit of work (Issue) should be completed within its own [branch](https://github.com/Shift3/standards-and-practices/blob/master/standards/branching.md).
- Use Karma-style formatting for your [Git Commit Messages](https://github.com/Shift3/standards-and-practices/blob/master/standards/commits.md).
- Generate a PR for each unit of work (Issue) which is completed. Keep the scope of these PRs as narrow as possible. Try not to create PRs which rely on or contain code from previous PRs unless there is truly a dependency between the two units of work.

## Project Information

This is a multi-container docker environment that utilizes Docker to create three seperate but linked containers:

- MongoDB database
- Node/Express Server
- React client

## Project Requirements

- Docker
    - For Mac Users: [Docker Desktop for Mac](https://docs.docker.com/docker-for-mac/install/)
    - For Windows 10 Pro/Enterprise Users: [Docker Desktop for Windows](https://docs.docker.com/docker-for-windows/install/)
    - For Windows 7 or Windows 10 home Users: [Docker Toolbox](https://docs.docker.com/toolbox/toolbox_install_windows/)
    - For Linux Users (follow link and choose your Distro): [Docker Engine](https://docs.docker.com/engine/install/)
- Do not have anything running on the required ports (3000 for client, 4000 for server, 27017 for mongo.)

## Running the project

- After cloning the repo, go into the project's root directory and run `docker-compose up`. The first time running this the server and client will both go through the build process, but this should only happen once.
- Your connection target on Mac and Linux is `localhost://`. For Windows, you will need to run `docker-machine ip` to find your address to connect to, default is `192.168.99.100:`.
- Database can be found at `(target):27017`, server at `(target):4000`, client at `(target):3000`.

## Development process

Shutting down the servers can be done with a Ctrl-C command from your terminal. Alternatively, you can load up Kitematic to close them as well.

If you need to exec into one of the containers, Kitematic has a GUI to do that for you. Otherwise, you will need to run `docker ps`, find the container ID, and then run `docker exec (container_name) -it bash`.

Kitematic can also be useful for looking at the logs for one specific container, since all three are tailed in the terminal.

## Endpoint testing

The following backend endpoints can be queried via Postman for testing purposes:

- Login (POST) - `(server addr)/api/login` (Expects name/password in request body)
- Current Orders (GET) - `(server addr)/api/current-orders`
- Add Order (POST) - `(server addr)/api/add-order` (Expects ordered_by, quantity, menu_item in request body)
- Delete Order (DELETE) - `(server addr)/api/delete-order/:id` (Expects id in request params)
- Edit Order (PUT) - `(server addr)/api/edit-order/:id` (Expects id in request param. Will look for only id.)
- Flush Orders (DELETE) - `(server addr)/api/delete-all` (This deletes all current orders in the DB)
