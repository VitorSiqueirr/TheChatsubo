# The Chatsubo 茶壺 by Vitor Siqueira

> The Chatsubo was a bar for professional developers; you could drink there for a week and never hear two words in JavaScript. - _Gilliam Wibson_

In this challenge we're going to implement the Chatsubo, or "The Chat", a chat application for developers. Since the users are developers, the features are similar to what we have out-of-box in VIM: simple and boring stuff, mostly. But we're frontend developers, so it's going to look pretty, at least.

The Chatsubo has a single user but multiple attendants, similiar to a virtual reality simulator. The user should be able to add new attendants to the conversation and select one of them to send a message on their behalf.

Here are the terms we're going to use during this challenge description:

- `User`: the person that is using the application
- `Attendant`: each of the integrants of the conversation. An attendant includes: the attendant id and their name
- `Message`: a interaction between the attendant and the chat. A message includes: the message id, the text, the attendant id of the author of the message, and the time it was sent

We will use React to implement the UI and Redux to store and manage the data for the attendants and the messages, anything else can be stored in the local state of the components.

**Important ⚠️: unless stated otherwise, do not use Redux Toolkit.**

This is an example of how the application should look like. You don't need to implement it exactly like the example, and you get extra cool points if you give it a cyberpunk look. Also, the application should be responsive.

![the-chatsubo](https://user-images.githubusercontent.com/4325587/263061028-35c06079-a601-436c-aa5d-e6b58f03d040.png)

## Task 1 - Add and select attendants

The first step to build The Chat is to implement the feature that allows the user to add a new attendant and select the attendant that is going to send a message. To do that, add a "Add attendant" button to the interface that shows a small dialog that asks for the new attend name and a "Ok" button. After the user clicks ok, the dialog disappears and the attendant is added to the list of available attendants, but be aware: we should not allow two attentands with the same name to be created, so if the user tries to create an attentand with an existing name we show an error message instead of closing the dialog. Additional to that, we will show a dropdown menu right below the message box where the user can select one of the attendants.

At the end of this task, your application should have:

- An empty box to represent the messages
- A non-functional textarea at the bottom of the box where the message text is going to be inserted (We will make this textarea functional in the next task)
- A non-functional "Send" button at the right side of the text area (We will make this textarea functional in the next task)
- A dropdown menu with the list of attentands bellow the text area
- A "Add attendant" button that works as described previously
- Tests for anything that you judge necessary

## Task 2 - Send messages

Just having attendants is not very useful, is it? They need to talk to each other! In this task we're going to allow the user to send messages on behalf of the attentands. To do that, the user selects an attendant in the dropdown, type a message and hits "Send". After that, the message will be shown in that box we created in the first task. When displaying the message we should show: the message text, the name of the attendant who sent it and the time it was sent. There are some important details there: there should be a selected attendant and at least 3 characters in the message textarea, otherwise we don't allow the user to send the message, the "Send" button should be disabled until all conditions are met.

Don't forget to add tests, we want to minimize the chance of getting hit by an [Icebreaker](https://williamgibson.fandom.com/wiki/Icebreaker).

## Task 3 - Load the initial state from the API

As of right now every time the user refreshes the page they get a blank state... that sucks! Let's make it suck a little less. In this task we are going to load the initial data from an API. The link for the API is this one: https://gitlab.com/codeminer-42/trainee-projects/02-2023/the-chatsubo-api. From this point on you should run the API as well to be able to use The Chat. The documentation for the endpoints of the API is in the link. All the loading should be done through the usage of thunks. While the data is still loading the user should see some kind of loading UI, maybe a spinner or a "Loading..." message, that's up to you. If the request fails, the user should see an error message and a button that retries the request.

Again, tests, don't forget them.

## Extra 1 - Save new attendants and messages to the API

The previous task made the app suck a little less but not too much. Let's make it even better now. After having done the previous task we get some kind of initial state from the API, but any change done after that is not persisted, so if the user refreshes the page they are back to that initial state. Bummer. In this task we are going to send a request every time a new attendant or message is added using the available endpoints of the API, this should also be done with thunks.

At the end of this task, the user should be able to persist all the changes done to the application.

## Extra 2 - Normalize the state

It's very likely that the state you are storing is not normalized. If this is the case, in this task you are going to use a technique called [state normalization](https://redux.js.org/usage/structuring-reducers/normalizing-state-shape) on your implementation. Pay attention to that important point: the change should be done only on your reducers and and selectors, you should **not** need to change the components in this task.

## Extra 3 - Redux Toolkit

If you got here, now refactor your code to use Redux Toolkit.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
