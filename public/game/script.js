async function getPersonas(  ) {
    const response = await fetch( "/data" )
    return await response.json();
}

async function createBlock( act ) {
    // write message to block
    var mess = act["message"];
    for( let i = 0; i < act["members"].length; i++ ) {
        mess = mess.replaceAll( `_${i}`, act["members"][i] );
    }

    document.getElementById('message').innerText = mess;

    // add images to block
    document.getElementById('brother').innerHTML = "";

    for( let i = 0; i < act["members"].length; i++ ) {
        var name = act["members"][i]

        await getPersonas().then( data => {
            var obj = data.find( el => el.id === name );

            if ( obj )
            document.getElementById('brother').innerHTML +=
            `<img class="profile-image" src="${obj.profile}" alt="${name}">`
        } );
    }
}

async function getAction() {
    fetch( "/act/getAction" )
    .then( response => response.json() )
    .then( data => {
        createBlock( data );
    } );
}

getAction();