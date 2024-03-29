
## Link to the game in prod
https://mastermindgame.web.app/

## 1. Overview

Mastermind Game
============
The idea of the game is for one player (the code-breaker) to guess the secret code chosen by the computer (the code-maker).

![ezgif com-gif-maker](https://user-images.githubusercontent.com/33399226/143380204-97c0d633-d5f0-431c-92c7-408e35489850.gif)

### Game rules:

- At the start of the game the computer will randomly select a pattern of different numbers. 
- A player will have 5-15 attempts to guess the number combinations
- At the end of each guess, computer will provide one of the following response
  as feedback:
  - The player had guess a correct number - Orange color
  - The player had guessed a correct number and its correct location - Green color
  - The player’s guess was incorrect - Red color 

#### For a better user experience
- Each guess number in the square has its own color. 
- A group of squares displays feedbacks to the user input.

### Features:
- Difficulty level - Player is able to choose difficulty level: Easy, Medium, Hard.
- Colored attempt - for better visual perception each number is associated with a color.

### Architecture

My goal for this project was to write clean modular code. I used component based architecture for that which is common for Angular. Here is the overview of the project code structure.

![Diagram](https://lucid.app/publicSegments/view/222c51e0-ef61-4308-b2fe-3eb43c037ccd/image.png)

### Data models
Data models are classes that only contain data and state. GameModel is the main data model of the project.

#### GameModel contains the following variables:
- ```randomNumbers``` hold an array of randomly generated numbers received from ```IntegerGeneratorService``` (which gets the numbers from Random.org API).
- ```attempts``` hold an array of ```Attempt```. ```Attempt``` contains user ```guessNumbers``` and respective ```feedbacks```. Each Attempt is generated by ```GameService```.
- ```mockAttempt``` holds mock data of ```Attempt``` generated by ```GameService```. It is Used in ```GameView``` as default data shown to the user before user starts to play ("empty state"). The goal is to improve user experience.
- ```attemptCounter``` counts user guesses. The aim of this counter is to stop the game and show message in the modal window.
- ```gameSettings``` hold game settings. Once user changes game settings in the GameView component ```GameSettingsService``` returns to ```GameModel``` a new data interface ```GameSettingsDto```. GameModel will keep settings, until the user make changes to them in the view.
- ```gameStatus``` it is a flag for stopping game under different conditions.
- ```content``` holds the message generated by ```GameService``` saying who the winner is.
### Services
Services are responsible for the business logic of the game. Services don’t hold any data or state which makes them easy to test.

### Component
The component is responsible for maintaining the relationship between data and the view. It doesn’t hold any business logic. Instead, it uses Services to process any user input and make changes to data models.

### UI
The view is bound to data models via two-way data binding and is updated automatically when data models get updated.

## 2 Getting Started

### Requirements

- The IDE/text editor of your choice, such as  [WebStorm](https://www.jetbrains.com/webstorm),  [Atom](https://atom.io/),  [Sublime](https://www.sublimetext.com/), or  [VS Code](https://code.visualstudio.com/)
- The package manager  [npm](https://www.npmjs.com/), which typically comes with  [Node.js](https://nodejs.org/en/)
- A terminal/console
- A browser of your choice, such as Chrome
- Docker on your machine - [Get Docker](https://docs.docker.com/get-docker/)

Clone the [GitHub repository](https://github.com/honoyr/mastermindGame)  from the command line:
```
git clone https://github.com/honoyr/mastermindGame
```
Alternatively, if you do not have git installed, you can  [download the repository as a ZIP file](https://github.com/honoyr/mastermindGame/archive/main.zip).

## 3. Deployment (Frontend)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version ^13.

## Local environment

### Development server
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
