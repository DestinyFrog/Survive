const express = require( 'express' );
const fetch = require( 'node-fetch' );
const fs = require('fs');
const router = express.Router()

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

      // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
}

router.get( "/", function(_req, res) {
    res.json(
        JSON.parse(
            fs.readFileSync( "./data/action.json", "utf-8" )
        )
    );
});

router.get( "/getAction", async ( _request,response ) => {
    var members = [];
    var message = {
        ["members"]: new Array(),
        ["message"]: ""
    }

    await fetch( `${process.env.LINK}act/` )
    .then( res => res.json() )
    .then( data => {
        var index = Math.floor( Math.random() * data.length ) ;
        members = data[ index ].members;
        message.message = data[ index ].message;
    } )

    await fetch( "http://localhost:3000/data" )
    .then( res => res.json() )
    .then( data => {
        members.forEach( m => {

            let d = shuffle(data.map( obj => {
                let k = obj.persona;
                if ( eval(`${m}`) ) { return obj.id }
            } ).filter( o => o !== undefined ));

            message.members.push( d[0] );
        } )

        response.send( message );
    } )
} );

module.exports = router;