(function(){
	let audio = new Audio("/audio/ashur.mp3");
	let pronounce = document.querySelector( "[data-pronunciation]" );

	pronounce.addEventListener( "click", function()
	{
		audio.play();
	});
})();
