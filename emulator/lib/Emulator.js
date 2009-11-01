include("emulator/lib/Library.js");
include("emulator/lib/Playlist.js");

function iTunesEmulator(iTunesMusicLibraryURL)
{
	this.StoppedState = 1800426323;
	this.RewindingState = 1800426322;
	this.FastForwardingState = 1800426310;
	this.PlayingState = 1800426320;

	/* The iTunes Library */
	this._library = new iTunesLibrary();
	this._library._load(iTunesMusicLibraryURL);
	this._trackList = null;
	this._trackNumber = 0;
	
	/* Global iTunes properties */
	this.platform = "Mac";
	if (navigator.appVersion.indexOf("Win")!=-1) this.platform="Win";
	if (navigator.appVersion.indexOf("Mac")!=-1) this.platform="Mac";
	this.version = "9.0.2";
	this.quickTimeVersion = "7.6.3";
	this.acceptedLanguages = "en-us, en;q=0.50";

	this.volume = 1;
	this.isMuted = false;
	this.currentPlayerState = this.StoppedState;
	this.currentPlayingTrack = null;
	this.currentChapter = 0;
	this.currentTime = 0;
	this.isInFullscreen = false;

	// @todo Create fake data while playing
	this.waveform = null;

	this.isCoverFlowAvailable = false;
	this.screenReaderRunning = false;
	
	this._audioEngine = new Audio();
	this._audioEngine.style.display = "none";
	
	this._audioEngine.loop = false;
	this._audioEngine.volume = this.volume;
	
	function _initAudioEngine(aContext){
		if (document.body) {
			document.body.appendChild(aContext._audioEngine);
		} else {
			setTimeout(_initAudioEngine, 50, aContext);
		}
	}

	var ref = this;
	this._audioEngine.addEventListener("ended", function() {ref._onAudioEnded();});
	
	_initAudioEngine(this);

}

iTunesEmulator.prototype.findTracksByTextFields = function(aObject)
{
	return this._library.findTracksByTextFields(aObject);
}

iTunesEmulator.prototype.findTrackByPersistentID = function(aPersistentID)
{
	return this._library.findTrackByPersistentID(aPersistentID);
}

iTunesEmulator.prototype.findTracksByStoreID = function(aStoreID)
{
	return this._library.findTracksByStoreID(aStoreID);
}

iTunesEmulator.prototype.findTracksByGeniusID = function(aGeniusID)
{
	return this._library.findTracksByGeniusID(aGeniusID);
}

iTunesEmulator.prototype.findTracksByXID = function(aXID)
{
	return this._library.findTracksByXID(aXID);
}

iTunesEmulator.prototype.findPlaylistsByName = function(aPlaylistName)
{
	return this._library.findPlaylistsByName(aPlaylistName);
}

iTunesEmulator.prototype.findPlaylistByPersistentID = function(aPersistentID)
{
	return this._library.findPlaylistByPersistentID(aPersistentID);
}

iTunesEmulator.prototype.setVolume = function(aVolume)
{
	this.volume = aVolume;
	// Do something to actually change the audio-volume
}

iTunesEmulator.prototype.setMute = function(aShouldMute)
{
	this.isMuted = aShouldMute;
	// Do something to actually change the audio-volume
}

iTunesEmulator.prototype.play = function(aPlayURL, aTrackDataObject)
{
	var theTrack = new Track();
	theTrack._location = aPlayURL;
	for (var key in aTrackDataObject) {
		theTrack[key] = aTrackDataObject[key];
	}
	
	var theTemporaryPlaylist = new Playlist();
	theTemporaryPlaylist.addTracks([theTrack]);
	theTemporaryPlaylist.play();
}

iTunesEmulator.prototype.goToLibrary = function()
{
	alert("If this was iTunes you'd be back in the iTunes library again.");
}

iTunesEmulator.prototype.nextTrack = function()
{
	if (this._trackList)
		this._play(this._trackList, this._trackNumber + 1);
}

iTunesEmulator.prototype.nextChapter = function()
{
	// Go to the next chapter
}

iTunesEmulator.prototype.fastForward = function()
{
	// Not yet sure what this does EXACTLY
}

iTunesEmulator.prototype.previousTrack = function()
{
	if (this._trackList)
		this._play(this._trackList, this._trackNumber - 1);
}

iTunesEmulator.prototype.previousChapter = function()
{
	// Go to the previous chapter
}

iTunesEmulator.prototype.rewind = function()
{
	// Not yet sure what this does EXACTLY
}

iTunesEmulator.prototype.backTrack = function()
{
	// No idea what this does yet
}

iTunesEmulator.prototype.stop = function()
{
	this._audioEngine.pause();
	
	this._trackList = null;
	this._trackNumber = 0;
}

iTunesEmulator.prototype.pause = function()
{
	this._audioEngine.pause();
}

iTunesEmulator.prototype.resume = function()
{
	if (this.trackList)
		this._audioEngine.play();
}

iTunesEmulator.prototype.createTempPlaylist = function()
{
	var thePlaylist = new Playlist();
	return thePlaylist;
}

iTunesEmulator.prototype._play = function(aTrackList, aTrackNumber)
{
	this.pause();

	this._trackList = aTrackList;
	this._trackNumber = aTrackNumber;
	this.currentPlayingTrack = this._trackList[this._trackNumber];

	if (this.currentPlayingTrack) {
		this._audioEngine.src = this.currentPlayingTrack._location;
		this._audioEngine.load();
		this._audioEngine.play();
	} else {
		this.stop();
	}
}

iTunesEmulator.prototype._onAudioEnded = function()
{
	this.nextTrack();
}