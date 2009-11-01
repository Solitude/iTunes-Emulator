include("emulator/Tools.js");
include("emulator/lib/Track.js");

function Playlist()
{
	/* CONSTANTS */
	this.StoreItemKindUnknown = 0;
	this.StoreItemKindSong = 1;
	this.StoreItemKindBook = 2;
	this.StoreItemKindAlbum = 3;
	this.StoreItemKindWork = 4;
	this.StoreItemKindPDFBooklet = 5;
	this.StoreItemKindMusicVideo = 6;
	this.StoreItemKindPodcastEpisode = 7;
	this.StoreItemKindPodcast = 8;
	this.StoreItemKindMovie = 9;
	this.StoreItemKindTVEpisode = 10;
	this.StoreItemKindInteractiveBooklet = 11;
	this.StoreItemKindSoftwarePackage = 12;
	this.StoreItemKindCoachedAudio = 13;
	this.StoreItemKindRingtone = 14;
	this.StoreItemKindMovieRental = 15;
	this.StoreItemKindTVEpisodeRental = 16;
	this.StoreItemKindDigitalBooklet = 17;
	this.StoreItemKindSoftwareApplication = 18;
	this.StoreItemKindSoftwareUpgrade = 19;
	this.StoreItemKindSoftwareGame = 20;
	this.StoreItemKindAudioPass = 21;
	this.StoreItemKindVideoPass = 22;
	this.StoreItemKindiTunesUSub = 23;
	this.StoreItemKindiTunesUEpisode = 24;

	this.SpecialKindFolder = -1;
	this.SpecialKindNone = 0;
	this.SpecialKindMovies = 2;
	this.SpecialKindTVShows = 3;
	this.SpecialKindMusic = 4;
	this.SpecialKindAudiobooks = 5;
	this.SpecialKindPodcasts = 10;
	this.SpecialKindPurchasedMusic = 19;
	this.SpecialKindPartyShuffle = 22;
	this.SpecialKindITunesU = 31;

	this.RepeatModeOff = 0;
	this.RepeatModeAll = 1;
	this.RepeatModeOne = 2;

	/* */
	this.tracks = [];
	this.repeatMode = this.RepeatModeOff;
	this.persistentID = generatePersistentID();
	
	this.valid = true;
	this.isSmart = false;
	this.isVisible = true;
	this.isSetToShuffle = false;
	this.isShared = false;
	this.parent = null;
	
	this.duration = 0;
	this.durationAsString = "0:00";
	this.sizeInBytes = 0;
	this.name = "__JSTemp__";
	
	this.specialKind = this.SpecialKindNone;
}

Playlist.prototype.addURLs = function(aURLList)
{
	// Not sure if this signature is even correct
}

Playlist.prototype.addTracks = function(aTrackList)
{
	for (var i = 0; i < aTrackList.length; i++) {
		this.tracks.push(aTrackList[i]);
	}
	
	this._updatePlaylistStats();
}

Playlist.prototype._updatePlaylistStats = function()
{
	var theDuration = 0;
	var theSizeInBytes = 0;
	for (i = 0; i < this.tracks.length; i++) {
		theDuration += this.tracks[i].duration;
		theSizeInBytes += this.tracks[i].sizeInBytes;
	}
	
	this.duration = theDuration;
	this.durationAsString = timeString(theDuration);	
}

Playlist.prototype.clear = function()
{
	this.tracks = [];
	this._updatePlaylistStats();
}

Playlist.prototype.removeTrack = function(aTrack)
{
	var theNewTrackList = [];
	for (var i = 0; i < this.tracks.length; i++) {
		if (this.tracks[i] != aTrack)
			theNewTrackList.push(this.tracks[i]);
	}
	
	this.tracks = theNewTrackList;
	this._updatePlaylistStats();
}

Playlist.prototype._matchByTextFields = function(aObject) {
	for (var key in aObject) {
		if (this[key] != aObject[key]) return false;
	}
	return true;
}

Playlist.prototype.reveal = function (aTrackNumber)
{
	// I don't know yet what this is supposed to do
}

Playlist.prototype.play = function (aTrackNumber)
{
	window.iTunes._play(this.tracks, aTrackNumber);
}