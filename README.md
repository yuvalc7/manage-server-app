# manage-server-app - a fullStack web app that allow the user to manage servers.

## about the project

A server is defined as
IP Address (String)
Name (String)
Type (Server Type)
isRunning (Boolean)

Server Type is defined as
Name
Price Per Minute (In $)

The User able to see all servers
The User able to create a server and choose from server type
The User able to start a server
The User able to stop a server
The User able to delete a server
The User able to know what is the price for a running server
The price for a running server is defined as the time in minutes that the server runs
multiplied by the price of the server type
The price applied only for the time that the server was in running state
(isRunning=True).
The User able to change the price currency

## technologies:    
           Front-end: React    
           Back-end: NodeJS  
           DataBase: MongoDB


## how to run
### npm install  
### open 2 terminal:         
                  - cd client  
                     - replace REACT_APP_CURRENCY_API_KEY with your CURRENCY_API_KEY  
                     - npm start (will open browser in http://localhost:3000/ )
                    
                  - cd server  
                     - configare mongoDB cluster and replace MONGO_DB_CONNECT with yours
                     - node index.js       

