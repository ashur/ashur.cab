const fsUtils = require( "nodejs-fs-utils" );

let stat = fsUtils.fsizeSync( "./dist" );
console.log( stat );

