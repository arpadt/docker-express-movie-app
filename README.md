# Movie app

This simple app is loosely based on Netflix. You can search for movies in the Open Movie Database (http://omdbapi.com) and save your favourite movies in a MongoDB database.

The front-end part is created in Angular 6 and the backend is in Node.js.

In order for it to work (Windows only, for Linux/Mac the `environment.prod.ts` file host url needs to be changed accordingly):
1) Go to the `server` folder and run `npm run build`
2) Go to the `public` folder and run `npx ng build --prod`
3) From the root project folder, run `docker-compose up`. It should be running on http://192.168.99.100

You will also need an Open Movie Database API key.
