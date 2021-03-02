const fs = require( "fs" );
const path = require( "path" );

module.exports = () =>
{
	return new Promise( (resolve, reject) =>
	{
		let stylesheetsDir = "src/_includes/css/pages";

		fs.readdir( stylesheetsDir, {}, (error, files) =>
		{
			if( error )
			{
				if( error.code === "ENOENT" )
				{
					console.log( `⚠️  Stylesheets directory not found: '${stylesheetsDir}'` );
					resolve( [] );
				}
				else
				{
					reject( error );
				}
			}
			else
			{				
				let stylesheets = files.filter( file => path.extname( file ) === ".css" );
				resolve( stylesheets );
			}
		});
	});
};
