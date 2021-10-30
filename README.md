### Node.JS Task
Reza Mirjahanian

#### Setup
- Node.JS 14 ( or later )
- Install dependencies `yarn` or `npm i`
- `npm start` - Runs project.
- `npm test` - Runs tests.
- `npm run coverage` - Runs code coverage.

#### Assumptions
- ✅ Default Port is 3000 (.env)

#### Description
First, You should make it clear what are the requirements of the project. I wasn’t sure about the modeling of the Database, relation between the Models, data types,Input and Output format, …

Some data was in Spanish!

Anyway,I just added some improvement. But How can I make something production ready when I have many questions about the goal and requirements.



1.  Removed extra logs and comments, fix typos.

2.  Add database name for dev and test mode.

3.  Add Nodemon + Nodemon.json

4.  There was redundant package in Package.json like handlebar and chart.js

5.  Add .gitigonre

6.  Some cleanup in Config.ts. Server and Database URL. Port wasn’t dynamic.

7.  Create test folder and commands for testing and test coverage

8.  CORS made dynamically based on config file

9.  Using Node_ENV for test,dev, production

10.  Using the Logger function. For example you want send all the logs to the file or a server

11.  Create some indexes and unique rules for the DB model. I should know more to create a correct model.

12.  In the Favorite model, create a favorites array instead of 3 columns of favorites.

13.  Put data logic in repository folder

14.  In api.ts add “uncaughtException”

15.  In the seed script, some cleanup. We should first remove database

16.  Clean up the routes. Adding validation. Add try catch with 500 status

17.  Unnecessary .exec(); at the end of mongoose commands.

18.  Some fields in seed.ts weren't sync with models!

19.  In the model folder , index.ts. Function for connect,disconnect, validate and create objectId

20.  Create a middlewares folder for validation. 'Node-input-validator' package helped me. I know messages and validation are not good enough. But I should know the schema better.

21.  TypeScript is used at best. We can have interface, type and disable any by config. Also we can have JsDoc and better OOP programming.

22.  We can go further and use caching, logging request, API throttling

#### Todo
- 💡 Improve Testing
- 💡 https://swagger.io
- 💡 Dictionary for Errors
- 💡 Better modeling for database
- 💡 Use JsDoc and TypeScript type system
