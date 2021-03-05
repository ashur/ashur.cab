const CleanCSS = require( "clean-css" );
const markdownIt = require( "markdown-it" );
const {optimize} = require( "svgo" );

module.exports = config =>
{
	/* Eleventy options */
	config.setDataDeepMerge( true );

	/* Copy assets */
	config.addPassthroughCopy({"src/static": "/"});

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

	config.addPairedShortcode( "svgmin", svg =>
	{
		let result = optimize( svg, {} );
		return result.data;
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
