---
path: "/blog/continuous-deployment-for-free"
date: "2020-04-08"
title: "Continuous development for FREE with Github, Travis CI and Heroku"
description: "In this tutorial I'll show you how to set up professional development process with help of continuous deployment."
thumbnail: "../blog/travis_thumbnail.png"
category: "continuous deployment"
language: "en"
---

# Continuous development for FREE with Github, Travis CI and Heroku

In this tutorial I'll show you how to set up professional development process with help of continuous deployment.

---

We'll be using React with help of [Create-react-app](https://create-react-app.dev/) but you can easily follow with any other project maintained with NPM. Even if you are not using NPM, you can adjust the core build and run scripts for your needs quite easily. By any means you don't have to have any React experience whatsoever. It's just a sample project that will be used to show the flow of setting up the environment.

Requirements before we start:

- Installed [NodeJS](https://nodejs.org/en/download/) with NPM and [Git](https://git-scm.com/),

- You have to have an account on [Github](https://github.com), Github account linked with [Travis-ci.org](https://travis-ci.org/) and [Heroku](https://www.heroku.com/). All of them are free. Travis CI has .org TLD for free repos and .com TLD for private repos. For this tutorial we'll use .org version for free repos.

## Create React project with Create-React-App

Open your terminal of choice in your work folder. For me, it's `~/sandbox/`

```shell
cd ~/sandbox/
```

Within this folder, we'll create the React project with NPX (A tool for executing Node packages) that is pre-installed with NPM version 5.2+

```shell
npx create-react-app tutorial-cicd
```

Installation of boilerplate project will begin. When everything is good to go you'll see a message with list of commands that can be run within the app. We'll just `cd` into the project

```shell
cd tutorial-cicd
```

We don't have to do `npm install` since the `npx` command already dit it. Now we can start the app with:

```shell
npm start
```

New browser tab will get open with `http://localhost:3000` and following page will be shown.

![Create-react-app](../images/blog/create-react-app.png)

The good thing about create-react-app is that it has tests included out of the box so we don't have to set up anything. For the reference you can run tests within you folder with

```shell
npm test
```

You'll be prompted with few options of running your tests. Simple press `a` to run all tests. Only one test should be run with text `renders learn react link` that checks if the app renders link that can be seen on `http://localhost:3000`. Since React renders the link just fine, the test passes.

Now we have our project setup.

## Create Github repo and link it to our app

If you already setup your Github account you are good to go, if not please register on [Github.com](https://github.com). After you login to Github, we'll create new repository. You can create new repository on [https://github.com/new](https://github.com/new).

We'll name the repository `tutorial-cicd` and set it to `Public`. Now we have repo created but still not linked to our app. We can do that with following commands

```shell
git remote add origin git@github.com:<your_github_username>/tutorial-cicd.git
git push -u origin master
```

NOTE that you should swap `<your_github_username>` in first command with your username. Also this way we are using SSH to connect our repo. If you don't want to use SSH auth you can use HTTPS versions.

We don't have to do `git init` since npx already included `.git` and `.gitignore` in our app folder.

If you've done everything correctly, you should see the app on Github under project `tutorial-cicd`.

We have now working app that is connected to Github repo.

## Connect Github repo with Travis CI

Now comes the part where we connect the repo with Travis CI. You should be logged in into Travis CI with the same Github account that has our `tutorial-cicd` repo. You'll be afterwards redirected to Github for authorization.

After you have successfully logged in. Click on your profile logo in the upper right side of the dashboard, click `Settings` and then the green `Activate` button. After that you should see a list of repositories on your Github account. If you don't see the `tutorial-cicd` repo, click on `Sync account` in the left side of the screen. It'll take few mins (don't know why it takes so much time to sync) to sync Github and Travis CI. After success you should see the `tutorial-cicd` repo.

![Success Travis CI](../images/blog/success-travisci.png)

## Create Travis config file

To tell Travis CI what to do, we must create `.travis.yml` config file in our projects root directory.

```shell
touch .travis.yml
```

Within this file, we will specify language to be used in build, its version and script to be run.

Since we need JavaScript on server, we will use Node.js v12. For this demo we will run only our test and production build of create-react-app so we can add following to .travis.yml

```yml
language: node_js

node_js:
  - "12"

script:
  - npm test
  - npm run build
```

Let's try that. Push new file to Github repo with

```shell
git add .
git commit -m "add travis.yml config file"
git push
```

If you visit `tutorial-cicd` in Travis on URL

`https://travis-ci.org/github/<your-github-name>/tutorial-cicd`

You should see either running (yellow) build, already finished build (green), or failed build (red).

![Build Travis CI](../images/blog/build-travisci.png)

Under it, there is a log of the build. If something failed, you will see there the appropriate error message.

If everything passed, you just run first build! Good job

## Create Heroku project

Now we will create project on Heroku where we can run our app in the cloud. For that you need to create an account on their [website](https://heroku.com). After you create and account, create new app on this [link](https://dashboard.heroku.com/new-app). Name the app as "-tutorial-cicd" and choose a region that is closer to your location. For me Europe. If the app name is already taken, just modify it slightly. Click "Create app".

### Map Deployment Method to Github

To link Heroku project with you Github repo, in the Herokus Deployment method, choose Github. Then find the Github repo project and connect it. In the Automatic deploys section, check the "Wait for CI to pass before deploy" and then click on "Enable Automatic Deploys".

![Heroku Success Deployment Method](../images/blog/deployment-heroku.png)

## Link Travis and Heroku

To connect Travis and Heroku, we need to update .travis.yml file. But before updating the file, we need to create our secure api key. For this, you need to have both [Heroku](https://devcenter.heroku.com/articles/heroku-cli) and [Travis](https://github.com/travis-ci/travis.rb#readme) CLI. After installation login to heroku CLI with

```shell
heroku login
```

That will prompt you with e-mail and password for Heroku.

If you have both CLIs installed you will run

```shell
travis encrypt $(heroku auth:token) --add deploy.api_key
```

You will verify detected repository with `yes`. Then it will prompt you what the CLI will overwrite our Travis config file with `deploy` part. Answer with `y`. At last we will specify provider of our deploy to be heroku and app name. Final .travil.yml config file should look like this.

```yml
language: node_js

node_js:
  - "12"

script:
  - npm test
  - npm run build

deploy:
  provider: heroku
  app: <your_heroku_app_name>
  api_key:
    secure: <your_secure_key>
```

Now you can push changes to Github repo with

```shell
git commit -m "add deploy section to travis.yml"
git push
```

## Serve static files on Heroku

We have build our create-react-app to production version but we have not specified how to run such build. For that we will use `serve` package. Sure there are better ways to do that but I have chosen the most straightforward for this tutorial. We need to install one extra dependency to our project

```shell
npm install --save serve
```

After that we will change our `start` script in `package.json` to use our installed `serve` package as following

NOTE: only edit `start` in `scripts` object.

```json
{
    ...
    "scripts": {
        "start": "serve -s build",
        "build": "react-scripts build",
        "test": "react-scripts test",
        "eject": "react-scripts eject"
    }
    ...
}

```

We can again commit new changes

```shell
git commit -m "add serve package"
git push
```

After success CI in Travis, you should be able to see you app running on URL

`https://<your_heroku_app_name>.herokuapp.com/`

## Conclusion

You have now setup continuous deployment that will deploy your changes to production without human intervention. Only failed tests or build will need additional steps. Remember that you should create new git branch when developing new feature so another college can check your changes before they are deployed to production.

My full repo can be found on my [Github](https://github.com/michalhonc/tutorial-cicd).
