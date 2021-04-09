(function(){
	var audio = new Audio("/audio/ashur.mp3");
	var pronounce = document.querySelector( ".button-pronounce" );

	pronounce.addEventListener( "click", function()
	{
		pronounce.classList.add( "playing" );
		audio.play();
	});

	audio.addEventListener( "ended", (e) =>
	{
		pronounce.classList.remove( "playing" );
	});
})();
