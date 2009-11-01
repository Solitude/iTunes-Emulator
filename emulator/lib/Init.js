if (window.iTunes === undefined) {
	if (typeof iTunesMusicLibrary == "undefined") {
		alert("To use this emulator you need to set the iTunesMusicLibrary variable to the location of your iTunes Library XML");
	} else {
		window.iTunes = new iTunesEmulator(iTunesMusicLibrary);
	}
}