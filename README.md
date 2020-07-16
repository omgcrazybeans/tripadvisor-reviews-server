# Wanderlust - Wander off onto your next adventure

## Goals:

I built the back-end of a user reviews microservice from a travel web app. The app was deployed on AWS cloud service. The web app was scaled to handle 500 user queries/second with sub second latency time on a database containing 40+ million data entries.

## Technologies:

**Systems Programing Language**
* JavaScript

**Web Frameworks**
* React.JS
* Express
* Axios

**Database Managment**
* MongoDB
* Couchbase
* MySQL

**Development Frameworks Or Tools**
* Babel
* Webpack
* Enzyme
* Jest
* Chai
* Mocha
* New Relic
* Loader.io

**Container Orchestration Services**
* Docker
* AWS Images

**Public Cloud Services**
* AWS
* Mongo Atlas

**Collaborative Methodologies**
* Continuous Integration
* Unit, Integrated, Functional Testing
* Code Branching, Architecture Branching

## Reproduction Steps:

Assumes MongoDB or Mongo Atlas cloud service is installed and running in the local environment.

1. Install repo dependencies:
  * $ npm install

2. Seed the test data:
  * $ npm run mongo-seed

3. Start the local server:
  * $ npm run mongo-start

4. Routs:
  * http://localhost:4060/
  * http://localhost:4060/review (Retrieves reviews)
  * http://localhost:4060/datasize (Returns database info)
  * http://localhost:4060/thefinalcountdown (Deletes whole databse)