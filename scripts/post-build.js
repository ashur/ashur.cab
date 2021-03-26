const fs = require( "fs" );
const fsUtils = require( "nodejs-fs-utils" );

/**
 * @param {string} outputDir
 * @param {string} token - ex., "{size}"
 */
function getSize( outputDir, token )
{
	let originalSize = fsUtils.fsizeSync( outputDir );

	let assetsSize = 0;
	if( process.env.NODE_ENV === "production" )
	{
		const assetsSizes = require( "../external/assets-sizes" );
		assetsSize = assetsSizes.total || assetsSize;
	}

	let finalSize = originalSize + assetsSize - token.length + "1023-abcdbyte".length;

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

/**
 * @param {string} outputDir
 * @param {string} token - ex., "{size}"
 * @param {string} size
 */
function replaceToken( outputDir, token, size )
{
	let filePath = `${outputDir}/rera/index.html`;

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

/**
 * @param {string} outputDir
 * @param {string} token
 * @returns {string}
 */
module.exports.replaceSize = (outputDir, token) =>
{
	let finalSize = getSize( outputDir, token );
	replaceToken( outputDir, token, finalSize );

	return finalSize;
};
