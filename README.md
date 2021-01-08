# Github Repository Search Engine

This web app consumes the GitHub Repo API and displays a searchable filtered list by a github username.
The result of the username search, it display a list of repos, if any, showing the description and the coding language that was used.

## Views

### Index.vue

The main view that routes to the app and being configured in ```../router/index.js```


## Components

### Header.vue
- To display the title and icon at the top

### Repositories.vue
- To display a list of repos' names, description, github url, coding languages, and the details of each repo

### SearchEngine.vue
- This is the heart of the API reqests, where the user search the username to get a list of repos from Github API and pass the data to the Repositories component. 
- It also make validations to check if the username exist or if any repositories of the user exist.
- The count of the number of repo is being tracked.
- It can also filter the repos by the languages as tags.

## Unit-Testing (Jest)
- Used Jest for unit-testing for its simplicity.
- Wrote unit-test for Header.vue and Repositories.vue component
- Tested on each individual component level to see if props data match the expected outcome 
- Tested on function call when action is triggered
- TBD: Unit-Test for SearchEngine.vue


## End-To-End Testing (Cypress)
- To test the application work flow from the beginning to the end
- The following flow of the e2e test:
	- User visit the web app
	- User type the username and press enter
	- Username exist is checked
	- If user exist, make a 'GET' request to Github API to get the user and should expect a response status as success (200)
	- If response is success (200), show the respositories
- TBD: Test if user doesn't exist and repositories doesn't exist

## Setup and Install

Clone the project and navigate into the project folder

```
npm install
```

To run lint errors:

```
npm run lint
```

or use [prettier](https://prettier.io/)

```
npx prettier --write "**/*.{vue,js}"
```

Compiles and start the server
```
npm run serve
```

Go to http://localhost:8080 on browser

## Libraries and Tools Used:
- [Vue CLI](https://github.com/vuejs/vue-cli)
- [Vue](https://github.com/vuejs/vue)
- [Vue Router](https://github.com/vuejs/vue-router)
- [Vuetify](https://github.com/vuetifyjs/vuetify)
- [Jest](https://jestjs.io/)
- [Cypress](https://www.cypress.io/)

