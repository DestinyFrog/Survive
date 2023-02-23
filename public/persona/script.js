const elem = [ "inteligencia","carisma","iniciativa","sanidade","vontade" ];
const fis = [ "força","agilidade","resistencia","foco","sorte" ]

const backColor = [
    "FFCCCC","FFE5CC","FFFFCC","E5FFCC",
    "CCFFCC","CCFFE5","CCFFFF","CCE5FF",
    "CCCCFF","FFCCFF","FFCCE5"
]

fetch( "/data" )
.then( response => response.json() )
.then( data => {
    data.forEach( obj => {
        var uni = document.createElement( "form" )
        uni.style.backgroundColor = "#" + backColor[ Math.floor(Math.random() * backColor.length) ];
        uni.className = "unit-profile";
        uni.method = "get";
        uni.action = "/data/unit";

        var txt = document.createElement( "input" )
        txt.type = "submit";
        txt.setAttribute( "name", "name" )
        txt.className = "unit-title";
        txt.value = obj["id"];

        var img = document.createElement( "img" )
        img.className = "unit-img";
        img.src = obj["profile"]

        uni.appendChild( img )
        uni.appendChild( txt )
        document.getElementById("brother").appendChild( uni )
    } )
} )

elem.forEach( obj => {
    var txt = document.createElement("a");
    txt.innerText = obj+":";

    var rng = document.createElement("input");
    rng.name = "persona["+obj.slice( 0, 3 )+"]"
    rng.type = "range";
    rng.min = -5;
    rng.max = 5;
    rng.className = "rng";
    rng.value = 0;
    rng.oninput = ( ev ) => {
        document.getElementById( "ptr-"+obj ).innerText = ev.target.value;
    }

    var ptr = document.createElement( "p" );
    ptr.id = "ptr-"+obj;
    ptr.innerText = 0;

    const box = document.getElementById("parameters-persona");
    box.append( txt );
    box.append( rng );
    box.append( ptr );

} );

fis.forEach( obj => {
    var txt = document.createElement("a");
    txt.innerText = obj+":";

    var rng = document.createElement("input");
    rng.name = "persona["+obj.slice( 0, 3 )+"]"
    rng.type = "range";
    rng.min = -5;
    rng.max = 5;
    rng.className = "rng";
    rng.value = 0;
    rng.oninput = ( ev ) => {
        document.getElementById( "ptr-"+obj ).innerText = ev.target.value;
    }

    var ptr = document.createElement( "p" );
    ptr.id = "ptr-"+obj;
    ptr.innerText = 0;

    const box = document.getElementById("parameters-fisica");
    box.append( txt );
    box.append( rng );
    box.append( ptr );

} );

function changeProfile( obj ) {
    var url = obj.value.trim();
    if( url == "" ) {
        document.getElementById( 'prof' ).src = "./img/noprofile.jpg";
    } else
    document.getElementById( 'prof' ).src = url;
}