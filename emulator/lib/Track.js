include("emulator/Tools.js");

function Track() 
{
	/* Constants */
	this.RatingKindUser			= 0;
	this.RatingKindComputed		= 1;

	this.VideoKindNone			= 0;
	this.VideoKindMovie			= 2;
	this.VideoKindMusicVideo	= 32;
	this.VideoKindTVShow 		= 64;
	
	/* OUR OWN ADDITIONS, WILL NOT WORK IN REAL iTUNES */
	this._location = "";
	this._trackID = 0;

	/* Info */
	this.name = "";
	this.artist = "";
	this.albumArtist = "";
	this.album = "";
	this.grouping = "";
	this.composer = "";

	this.year = 0;
	this.trackNumber = 0;
	this.trackCount = 0;
	this.discNumber = 0;
	this.discCount = 0;
	this.bpm = 0;

	this.comment = "";
	this.genre = "";
	this.compilation = false;

	/* Video */
	this.show = ""; 
	this.seasonNumber = 0;
	this.episodeID = "";
	this.episodeNumber = 0;
	this.shortDescription = ""; 
	this.longDescription = null;

	/* Sorting */
	this.sortName = "";
	this.sortArtist = "";
	this.sortAlbumArtist = "";
	this.sortAlbum = "";
	this.sortComposer = "";
	this.sortShow = "";
	
	/* Options */
	this.volumeAdjustment = 0;
	this.eqPreset = "";
	this.videoKind = this.VideoKindNone;

	this.albumRating = 0;
	this.albumRatingKind = this.RatingKindComputed;

	this.rating = 0;
	this.ratingKind = this.RatingKindComputed;
	this.startTimeOffest = 0;
	this.stopTimeOffest = 0;

	this.rememberBookmark = false;
	this.bookmark = 0;
	this.bookmarkAsString = "0:00";
	
	this.excludedFromShuffle = false;
	this.isPartOfGaplessAlbum = false;

	/* Lyrics */
	this.lyrics = null;
	
	/* Artwork */
	this.artworkURL = "";
	
	/* INTERNAL */
	this.duration = 0;
	this.durationAsString = "0:00";
	this.sizeInBytes = 0;
	this.bitRate = 0;
	this.sampleRate = 0;
	this.playedCount = 4;
	this.skippedCount = 1;

	this.isEnabled = true;
	this.isValid = true;
	this.isUnplayed = false;
	
	this.chapters = null;
	this.category = "";
	this.xid = "";

	/* TIMESTAMPS */
	this.releaseDate = ""; // Sat Oct 17 2009 01:48:10 GMT+0200 (CEST)
	this.skippedDate = "";
	this.dateAdded = "";
	this.lastPlayedDate = "";
	this.modificationDate = "";
	
	/* IDs */
	this.geniusID = 0;
	this.storeID = 0;
	this.persistentID = generatePersistentID();
}

Track.prototype._setPropertyFromXML = function(aPropertyName, aValue)
{
	var theIgnoreList = ["playDate", "artworkCount", "trackType", "fileFolderCount", "libraryFolderCount", "kind"];
	var thePropertyParts = aPropertyName.split(" ");
	thePropertyParts[0] = thePropertyParts[0].toLowerCase();
	var theComposedProperty = thePropertyParts.join("");
	
	if (theComposedProperty == "size") theComposedProperty = "sizeInBytes";
	if (theComposedProperty == "totalTime") theComposedProperty = "duration";
	if (theComposedProperty == "dateModified") theComposedProperty = "modificationDate";
	if (theComposedProperty == "comments") theComposedProperty = "comment";
	if (theComposedProperty == "playDateUTC") theComposedProperty = "lastPlayedDate";
	if (theComposedProperty == "playCount") theComposedProperty = "playedCount";

	if (theComposedProperty == "location") theComposedProperty = "_location";
	if (theComposedProperty == "trackID") theComposedProperty = "_trackID";

	if (theIgnoreList.indexOf(theComposedProperty) != -1) return;
	
	if (typeof this[theComposedProperty] == "undefined") {
		var a = "error with " + theComposedProperty;
	} else {
		var thePropertyType = typeof this[theComposedProperty];
		if (thePropertyType == "number") {
			this[theComposedProperty] = parseFloat(aValue);
		} else
		if (thePropertyType == "boolean") {
			this[theComposedProperty] = (aValue == "true");
		} else {
			this[theComposedProperty] = aValue;
		}

		if (theComposedProperty == "duration") {
			this.duration = parseFloat(aValue) / 1000;
			this.durationAsString = timeString(this.duration);
		}
	}
}

Track.prototype._matchByTextFields = function(aObject) {
	for (var key in aObject) {
		if (this[key] != aObject[key]) return false;
	}
	return true;
}

Track.prototype.reveal = function ()
{
	// I don't know yet what this is supposed to do
}

Track.prototype.play = function ()
{
	// Tell the global player to play back the track
	window.iTunes._play([this], 0);
}