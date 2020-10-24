What we will create:
A DynamoDB database with schemas managed by Amplify SDK
An AppSync GraphQL API
Frontend site hosted in S3 with Cloudfront CDN and SSL


Setting up the environment

First begin by Installing the Amplify CLI globally npm i -g @aws-amplify/cli
Then in your working directory create a React app in the usual way                  	 npx create-react-app aws-amplify-swanson
Now you can move into new working directory aws-amplify-swanson and initialise Amplify with amplify init 
You can configure Auth here or use a profile from ~/.aws/credentials.


Once this has completed you have access to  the following commands:
amplify {category} add - will allow you to add features like user login or a backend API
amplify status - shows what you've added already and if it's locally configured or deployed
amplify push - will build all your local backend resources and provision it in the cloud
amplify publish - will build all your local backend and frontend resources (if you have hosting category added) and provision it in the cloud


The GraphQL API
Now an API of some kind is required to expose our data. Traditionally we might have created a database with RDS, then create some middleware to perform operations on the data, but because we are using Amplify this whole process is handled nicely for us.

We will add a Graphql API by running amplify add api



Selecting Y for the last option will launch VSCode and allow you to edit the schema.
For this Swanson quotes API we only need 2 fields, an ID and the quote itself. 
Once you have designed your schema you can update the database with 
amplify push

You will also want to generate the Graphql code automatically. The defaults should be fine.

This may take a while to complete as it is triggering a cloudformation script which inturn builds out the infrastructure for your backend. It will also generate the connection strings and queries for your application and add them to your React project.

Once the rollout completes you will be presented with an API Key as well as the GraphQL endpoint.  These can also be found in src/aws-exports.js


Now it gets exciting - head over to AWS AppSync and you ill find your DynamoDB and GraphQL API

Navigate to the Queries panel and you can start to run your own mutations to populate the API with sample data.

You can find what your mutations should look like in src/graphql/mutations.js
Once you have inserted your data you can view it all in the DynamoDB console as well. This is the data that will be served over the GraphQL endpoint.


And that’s the backend configured. We have just created a new AppSync API and DynamoDB database in a few simple commands and are now ready to look at frontend hosting.




Simple React Test

I have created a very simple App.js that will print out the quote returned from a graphql query - Arguably Lambda triggers should be used to randomly grab a row from Dynamo, but as we have a small sample size I’ll just use a dirty Math() function. 

You can find this sample app at: https://github.com/pauljflo/nodejs-amplify


If you have been following along and using the example frontend, you will be able to  build and run the app with npm install && npm run start your browser should load up and you will be able to see a quote which is pulled via the AppSync API. Essentially magic. 
This is the application running on your local machine and authenticating with the GraphQL API in AWS. All of this is managed by the Amplify SDK for you. 


Deploying to AWS

The final part of this guide is to add static hosting for our frontend app which again is fully managed by Amplify -  amplify hosting add

As this is a simple React SPA I have selected to deploy to S3 and to utilise Cloudfront to provide HTTPS access. This is a really low latency, low cost hosting option for static websites. Name the S3 bucket as you like, or leave it as the default. 
You have now configured your deployments.



When you are ready to deploy, simply type amplify publish and AWS Amplify will handle the rest.

Here you can see it will add s3 and cloudfront hosting, the API has no changes pending.

Once cloudformation has deployed all of the infrastructure, your React project will be built and automatically uploaded to S3. 

You will see the cloudfront endpoint listed at the bottom, where you will be able to view your application in AWS. As CloudFront is a global resource, it may take a little while for the endpoint to resolve correctly if this is a new deployment. 





If you would like to remove all of these resources afterwards you can use
 amplify delete

Amplify - FullStack Solutions for FrontEnd Developers
AWS Amplify is a fantastic framework to rapidly build new web applications.It reduces the overhead and complexity of managing infrastructure and introduces alot of serverless-like concepts. It seems ideal for start-ups in a rapid development phase or independent developers who want to focus on app design and functionality over infrastructure optimisation and management. 

It also feels pretty cool.


