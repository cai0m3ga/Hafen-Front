
<img src="https://i.ibb.co/ky5S3b2/pixlr-image-generator-1cb542a6-fd0e-4c4b-aa19-10478624047e.png" width="600"/>

# Hafen_React

This application was created with the solo purpose of fulfilling the proposed code challenge.

## Base

This project was created using a free template as base:
https://demos.creative-tim.com/argon-dashboard-react/#/admin/index

## Components and Libs

For the sake of the test I've also created some libs and components and they're under the path 
```
src/components/Utils
```

-  **DataList**: This component was created under the principle of reusability, even this project containing only one table of data the ideia was to create something able to handle more tables in a generic way, currently it is bound to the current template by using its components but I can imagine a better and more generic version.

-  **formater**: Just a helper lib to assist user inputs and enable dynamic field masks like the ship code.

### Executing program

This application requires [node v16.20.2](https://nodejs.org/en/download/current) in order to run.

First you need to install the dependencies and it can be achieved by running:
```
npm i
```

To run the project from the root:
```
npm start
```
To run tests:
```
npm test
```
To connect to the backend project you may need to specify the correct port where your backend is running, to do so you need to update the BaseUrl property of the file:
```
src/variables/constant.jsx
```
