# DEEL BACKEND TASK

💫 Welcome! 🎉

This backend exercise involves building a Node.js/Express.js app that will serve a REST API. We imagine you should spend around 3 hours at implement this feature.

## Data Models

> **All models are defined in src/model.js**

### Profile

A profile can be either a `client` or a `contractor`.
clients create contracts with contractors. contractor does jobs for clients and get paid.
Each profile has a balance property.

### Contract

A contract between and client and a contractor.
Contracts have 3 statuses, `new`, `in_progress`, `terminated`. contracts are considered active only when in status `in_progress`
Contracts group jobs within them.

### Job

contractor get paid for jobs by clients under a certain contract.

## Getting Set Up

The exercise requires [Node.js](https://nodejs.org/en/) to be installed. We recommend using the LTS version.

1. Start by creating a local repository for this folder.

1. In the repo root directory, run `npm install` to gather all dependencies.

1. Next, `npm run seed` will seed the local SQLite database. **Warning: This will drop the database if it exists**. The database lives in a local file `database.sqlite3`.

1. Then run `npm start` which should start both the server and the React client.

❗️ **Make sure you commit all changes to the master branch!**

## Technical Notes

- The server is running with [nodemon](https://nodemon.io/) which will automatically restart for you when you modify and save a file.

- The database provider is SQLite, which will store data in a file local to your repository called `database.sqlite3`. The ORM [Sequelize](http://docs.sequelizejs.com/) is on top of it. You should only have to interact with Sequelize - **please spend some time reading sequelize documentation before starting the exercise.**

- To authenticate users use the `getProfile` middleware that is located under src/middleware/getProfile.js. users are authenticated by passing `profile_id` in the request header. after a user is authenticated his profile will be available under `req.profile`. make sure only users that are on the contract can access their contracts.
- The server is running on port 3001.

## APIs To Implement

Below is a list of the required API's for the application.

1. **_GET_** `/contracts/:id` - This API is broken 😵! it should return the contract only if it belongs to the profile calling. better fix that!

1. **_GET_** `/contracts` - Returns a list of contracts belonging to a user (client or contractor), the list should only contain non terminated contracts.

1. **_GET_** `/jobs/unpaid` - Get all unpaid jobs for a user (**_either_** a client or contractor), for **_active contracts only_**.

1. **_POST_** `/jobs/:job_id/pay` - Pay for a job, a client can only pay if his balance >= the amount to pay. The amount should be moved from the client's balance to the contractor balance.

1. **_POST_** `/balances/deposit/:userId` - Deposits money into the the the balance of a client, a client can't deposit more than 25% his total of jobs to pay. (at the deposit moment)

1. **_GET_** `/admin/best-profession?start=<date>&end=<date>` - Returns the profession that earned the most money (sum of jobs paid) for any contactor that worked in the query time range.

1. **_GET_** `/admin/best-clients?start=<date>&end=<date>&limit=<integer>` - returns the clients the paid the most for jobs in the query time period. limit query parameter should be applied, default limit is 2.

```
 [
    {
        "id": 1,
        "fullName": "Reece Moyer",
        "paid" : 100.3
    },
    {
        "id": 200,
        "fullName": "Debora Martin",
        "paid" : 99
    },
    {
        "id": 22,
        "fullName": "Debora Martin",
        "paid" : 21
    }
]
```

## Going Above and Beyond the Requirements

Given the time expectations of this exercise, we don't expect anyone to submit anything super fancy, but if you find yourself with extra time, any extra credit item(s) that showcase your unique strengths would be awesome! 🙌

It would be great for example if you'd write some unit test / simple frontend demostrating calls to your fresh APIs.

## Submitting the Assignment

When you have finished the assignment, zip your repo (make sure to include .git folder) and send us the zip.

Thank you and good luck! 🙏


# Final considerations


## Running

To create/recreate the database, use `npm run seed`

To start the server, use `npm start`

To run tests, use `npm run tests` while the server is running
- Be aware that when running tests the database will be recreated, so all data will be lost

## Architecture Design

```
Project
├──> __tests__						# Jest test folder to execute tests
├──> src							
|	├──> app						
|	|	├──> controllers			# Responsible of handling HTTP request and responses
|	|	├──> models				# Corresponds and represents the database tables
|	|	├──> repositories			# Responsible for interacting with the database
|	|	├──> services				# Contains the business logic and ties the controllers with the app
|	|	└──> associations.js	        	# File for handling DB models associations
|	├──> config				        # Configuration files for the application, such as database settings
|	├──> middleware					# Contains all middlewares used in the API
|	└──> routes					# Routes that define the URL and HTTP methods for each endpoint
└──> tests						# Test folder with test cases
└──> e2e						
└──> routes					        # Contains the test cases of every endpoint being tested
└──> generic.js				                # Generic test cases that are reused on various endpoints
```


## About this exercise
There were many approaches that could be used for this exercise, for better use of time I've chosen to use the following decisions: 

### Design
Usage of modules to separate the code into different files.

Usage of the MVC pattern to separate the business logic from the database and the HTTP requests/responses. 

Repository pattern to separate the database logic from the business logic. 

This way, if we decide to change the database, we only need to change the repository layer and the business logic will remain the same.


### Authentication
For admin endpoints, I've decided to alter the profile module to add a new field called `role`, which can be either `user` or `admin`.

This way, we can easily check if the user is an admin or not, and if the user is an admin, we can allow him to access the admin endpoints.

For the purpose of this exercise, I've added the role `admin` to user of `profile_id = 1`

Although it's not the best approach, it's a simple way to make sure the admin endpoints are working as expected and preventing other users from accessing them.


### Database

I've implemented sequelize transactions to make sure the database is not in an inconsistent state if an error occurs during the execution of a request.

The transactions are used on all the repositories functions, including read-only queries. Although it's not necessary and does come with a cost, it's a good practice to make sure the database is not in an inconsistent state and to ensure consistency of protection.

It is important to note that SQLite transactions are always serializable, so the isolation level is not used.



### Validation

For validating the requests, I've chosen to use express-validator, since it's a simple library that makes it easy to validate parameters and body requests.


### Testing
For testing, I've chosen to use Jest, since it's a very popular testing framework, and it's easy to use. 

I've also chosen to use supertest to test the API endpoints.

There are plenty of tests that could be added, but I've chosen to focus on E2E tests to make sure the API is working as expected.
Due to time limitations, the tests are using the same database as the API, so they are not isolated. 

**This is not a good practice, but it was a compromise to make sure I could deliver the tests on time.**

Jest has a limitation on running tests in parallel, so I've chosen to run the tests sequentially, to make sure the database is not on a different state due to parallel tests.


## Future Improvements

* Configure a staging server/database to run E2E tests
* E2E tests are slow and have a higher cost. It would be great to have unit and integration tests to make sure the business logic is working as expected before having to resort to E2E tests.
* It is not best practice to return the entity on the response, instead we should be returning a DTO.
* A front-end application could be created to make it easier to test the API.

