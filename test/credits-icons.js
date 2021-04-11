const {assert} = require( "chai" );
const globby = require( "globby" );
const credits = require( "../src/_data/credits" );

describe( "Credits", async () =>
{
	describe( "Icons", async () =>
	{
		let paths = await globby( ["src/_includes/images/*.svg"] );

		it( "should have a matching entry in credits.js", () =>
		{
			paths.forEach( path =>
			{
				let credit = credits.find( credit => credit.path === path );
				assert.isObject( credit, `Credit for '${path}'` );
			});
		});

		it( "should be purchased", () =>
		{
			paths.forEach( path =>
			{
				let credit = credits.find( credit => credit.path === path );
				if( process.env.NODE_ENV === "production" )
				{
					assert.isTrue( credit.purchased, `Purchased '${credit.source}'` );
				}
				else
				{
					if( !credit.purchased )
					{
						console.warn( `⚠️ You need to purchase '${credit.source}'` );
					}
				}
			});
		});
	});
});
