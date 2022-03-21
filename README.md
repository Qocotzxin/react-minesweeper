This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### `npm test`

Launches the test runner in the interactive watch mode.

#### `npm test-coverage`

Launches the test runner in the interactive watch mode and displays the total coverage of current tests.

#### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

## Description

Fully functional Minesweeper game with 4 difficulty levels.

## Tech Stack:

- React 17.0, Material-ui 5.5, TypeScript 4.6, react-redux 7.2, redux-toolkit 1.8, redux-saga 1.1, node 14.19, yarn 1.22

## General notes:

- a11y: this project allows player to use mouse, keyboard or touch actions to play the game.
- User is allowed to use up to 10 flags per level.
- Grid is virtualized to improve loading time.

## Deployment:

- This minesweeper was deployed using Vercel. You can check deployed version [here](https://react-minesweeper-phi.vercel.app/)
