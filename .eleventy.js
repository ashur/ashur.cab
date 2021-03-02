const CleanCSS = require( "clean-css" );
const markdownIt = require( "markdown-it" );

module.exports = config =>
{
	/* Copy assets */
	config.addPassthroughCopy({"src/static": "/"});

	/* Components */
	const componentsDir = "./src/_includes/components";
	config.addPairedShortcode( "Tile", require( `${componentsDir}/Tile.js` ) );

	/* Filters */
	config.addFilter( "cssmin", css =>
	{
		if( css && process.env.NODE_ENV === "production" )
		{
			console.log( "ℹ️  Minifying CSS" );
			return new CleanCSS({})
				.minify( css ).styles;
		}

		return css;
	});

	/**
	 * @param {Object} object
	 * @returns {string[]}
	 */
	config.addFilter( "keys", object => Object.keys( object ) );

	/* Markdown */
	let mdOptions = {
		html: true,
		typographer: true,
		code: false,
	};

	let md = markdownIt( mdOptions )
		.disable( "code" );

	md.use( require( "markdown-it-anchor" ) );
	md.use( require( "markdown-it-attrs" ) );

	config.setLibrary( "md", md );

	return {
		dir: {
			input: "src",
			output: "dist",

		},

		htmlTemplateEngine: "njk",
		markdownTemplateEngine: "njk",

		templateFormats: ["css", "md", "njk"],
	};
};
