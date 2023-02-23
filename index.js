require( 'dotenv' ).config();
const express = require( "express" );
const app = express();

app.use( "/home", express.static( "./public/home" ) );
app.use( "/persona", express.static( "./public/persona" ) );
app.use( "/game", express.static( "./public/game" ) );
app.use( "/img", express.static( "./public/img" ) );

app.use( "/data", require( "./router/data.js" ) );
app.use( "/act" , require( "./router/act.js" ) );

app.get( "/", ( _request,response ) => response.redirect( "/home" ) );

app.listen( process.env.PORT || 3000, () => console.log( process.env.LINK ) );
