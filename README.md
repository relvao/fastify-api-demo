# Basic XTTP Server

- Request XML data from the pub api, convert it to json and serve an HTML table with that data.
- Table must be sortable by clicking on any table header
- Download link for the same json data as the table.

The frontend code is designed to work on modern browsers. I'm assuming support for really old browsers isn't relevant for a server-side project.

# Usage
Ensure you have Node.js v10.x.x installed. 

Pull the repo, run `npm i` and then `npm start`.

Tests are run with `npm run build && npm test`.

This project was built with vscode and you should get better code inspection by using it. There is already a project settings folder that should ask you to install the relevant plugins in case they aren't already available.

No build tools like grunt or gulp. I really don't need the added complexity here.

# Structure 
The same endpoint `/` is returning both the HTML document and the JSON data. We use the accept header to decide the correct format. This is totally uncalled for in this case but I think it is nice if HTTP APIs actually respect the protocol and use it's features to their advantage.

# Dependencies
These dependencies should be fit for purpose and if I'm developing a small demonstration project I may as well have some fun while I'm doing it.

## Typescript
Because I like typed JavaScript.

## IO-TS
Runtime validation of objects against a schema/type. Typescript is great but this is a huge limitation. I really don't want to trust user inputs and I don't need to write the same schema twice, eg. using JSON schemas.

## Fastify
Supposedly super fast http server. Express, Koa and Hapi are fine too, I just like what these guys are doing and I haven't used it in a while.

## Tape
Testing library. I like tape. Jest or Mocha would be fine too, but I like tape.
