let rhymes = [
	"brasher",
	"clasher",
	"crasher",
	"dasher",
	"gnasher",
	"hasher",
	"masher",
	"smasher",
	"stasher",
	"thrasher"
];

let matches = [];
while( matches.length < 3 )
{
	let match = Math.floor( Math.random() * rhymes.length );
	if( !matches.includes( match ) )
	{
		matches.push( match );
	}
}

module.exports = matches.map( match => rhymes[match] );
