# README

## To start the project:

* Install node 14.18 and run 'nvm use 14.18'

* Run 'yarn' to install dependencies

* To start the server run 'yarn dev' or 'npm run dev'

## To add navigation to Navbar:

* Add a new object to the navigation array with title as 'name', navigation path as 'href' and add another field 'current' with value false.

* To add a dropdown, add an array to the object named 'subitems' with same format except the 'current' attribute.