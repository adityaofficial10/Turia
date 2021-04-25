# Setup Instructions:
1. Clone this repository.
2. Create an environment file named '.env' in the root directory and set the value of the variables 'SECRET_KEY' and 'PORT'.                                                             
3. Run 'npm install' from the root directory to install the dependencies.
4. Run 'npm start' from the root directory and the server starts on the specified port.

# Documentation:

## Queries:
The server supports the following queries:
1. user(id) => returns the user details with the passed id
2. users() => returns a list of all the registered users

## Mutations:
The server supports the following mutations:
1. login(email, password) => makes a login attempt and returns the user instance with an authorization token, if successful.
2. create(...user_details) => creates and registers an user and returns the instance if successful.
3. logout() => logs the user out if logged in.   
4. delete(email, phone_number, password) => deletes the user from the record if the auth matching was successful.
5. updatePassword(email, current_password, new_password) => updates the password if the entered password and email match.
6. updatePhoneNumber(email, password, phone_number) => updates the phone number if the entered password and email match.
