const fs = require( "fs" );
const fsUtils = require( "nodejs-fs-utils" );

function getSize( dirName, token )
{
	let originalSize = fsUtils.fsizeSync( dirName );
	let finalSize = originalSize - token.length + "1023-abcdbyte".length;

	let i = 0;
	while( finalSize / 1024 > 1 )
	{
		finalSize = finalSize / 1024;
		i++;
	}

	let suffixes = {
		0: "byte",
		1: "kilobyte",
		2: "megabyte"
	}

	return `${ Math.floor( finalSize ) }-${ suffixes[i] }`;
}

function replaceToken( token, size )
{
	let filePath = "./dist/index.html";

	try
	{
		let contents = fs.readFileSync( filePath );
		let newContents = contents
			.toString()
			.replace( token, size );

		fs.writeFileSync( filePath, newContents );
	}
	catch( error )
	{
		console.log( error );
		process.exit( 1 );
	}
}

let token = "{size}";
let finalSize = getSize( "./dist", token );
replaceToken( token, finalSize );
