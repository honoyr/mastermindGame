
## 1. Overview

Mastermind Game
============
The idea of the game is for one player (the code-breaker) to guess the secret code chosen by the computer (the code-maker).

![ezgif com-gif-maker](gif)
### Features:
- Difficulty level - Player able to choose difficulty level: Easy, Medium, Hard.
- Colored attempt - for better visual perception to guess the numbers.

### Requirements

- The IDE/text editor of your choice, such as  [WebStorm](https://www.jetbrains.com/webstorm),  [Atom](https://atom.io/),  [Sublime](https://www.sublimetext.com/), or  [VS Code](https://code.visualstudio.com/)
- The package manager  [npm](https://www.npmjs.com/), which typically comes with  [Node.js](https://nodejs.org/en/)
- A terminal/console
- A browser of your choice, such as Chrome
- Docker on your machine - [Get Docker](https://docs.docker.com/get-docker/)

### Architecture

image with UML diagram

## 2 Getting Started

Clone the [GitHub repository](https://github.com/honoyr/mastermindGame)  from the command line:
```
git clone https://github.com/honoyr/mastermindGame
```
Alternatively, if you do not have git installed, you can  [download the repository as a ZIP file](https://github.com/honoyr/leader_talks/archive/main.zip).

## 3. Deployment Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version ^13.

#### Local environment

## Development server
- Move to the project directory
```
cd mastermindGame

```
- Run Docker compose locally
```
docker-compose -f docker-compose.frontend.yml up

```
-----------
- Alternatively you can run the project from angular CLI
```
cd mastermindGame/mastermindGameFrontend

```
- Install dependency with npm
```
npm install

```
- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.
```
ng serve

```
