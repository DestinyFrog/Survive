const express = require( 'express' );
const fs = require( 'fs' );
const fetch = require( 'node-fetch' );
const router = express.Router()

//! http://LINK:PORT/data returns the data.json file
router.get( "/", ( _req,res ) => { res.json( JSON.parse( fs.readFileSync( "./data/data.json", "utf-8" ) ) ) } );

router.get( "/add", ( request, response ) => {
    var data = request.query
    data["id"] = data.name.split(" ")[0];
    data["alive"] = true;
    if( data["profile"] == "" ) {
        data["profile"] = process.env.ANONIMOUS_PROFILE;
    }

    var file = JSON.parse( fs.readFileSync( "./data/data.json", "utf-8" ) )
    file.push( data );

    fs.writeFile( "./data/data.json", JSON.stringify( file ), (err) => { if (err) throw err } )
    response.redirect( "/persona/" )
} )

router.get( "/clear", ( _request, response ) => {
    fs.writeFile( "./data/data.json", "[]", (err) => { if (err) throw err } )
    response.redirect( "/persona" )
} )

router.get( "/unit", ( request, response ) => {
    fetch( 'http:/127.0.0.1:3000/data' )
    .then( response => response.json() )
    .then( ( data ) => {
        data.map( ( obj ) => {
            if( obj["id"] == request.query.name ) {
                response.json( obj );
                return;
            }
        } )
    } )
} )

module.exports = router;