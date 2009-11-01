include("emulator/Tools.js");
include("emulator/lib/Track.js");
include("emulator/lib/Playlist.js");

function iTunesLibrary()
{
	this.tracks = [];
	this.playlists = [];
}

iTunesLibrary.prototype.findTracksByTextFields = function(aObject)
{
	var theMatchingTracks = [];
	
	for (var i = 0; i < this.tracks.length; i++)
		if (this.tracks[i]._matchByTextFields(aObject))
			theMatchingTracks.push(this.tracks[i]);
			
	return (theMatchingTracks.length == 0) ? null : theMatchingTracks;
}

iTunesLibrary.prototype.findTrackByPersistentID = function(aPersistentID)
{
	var theMatchingTracks = this.findTracksByTextFields({persistentID: aPersistentID});
	return (theMatchingTracks) ? theMatchingTracks[0] : null;
}

iTunesLibrary.prototype.findTracksByStoreID = function(aStoreID)
{
	return this.findTracksByTextFields({storeID: aStoreID});
}

iTunesEmulator.prototype.findTracksByGeniusID = function(aGeniusID)
{
	return this.findTracksByTextFields({geniusID: aGeniusID});
}

iTunesEmulator.prototype.findTracksByXID = function(aXID)
{
	return this.findTracksByTextFields({xid: aXID});
}

iTunesEmulator.prototype._findPlaylistsByTextFields = function(aObject)
{
	var theMatchingPlaylists = [];
	
	for (var i = 0; i < this.playlists.length; i++)
		if (this.playlists[i]._matchByTextFields(aObject))
			theMatchingPlaylists.push(this.playlists[i]);
			
	return (theMatchingPlaylists.length == 0) ? null : theMatchingPlaylists;
}


iTunesEmulator.prototype.findPlaylistsByName = function(aPlaylistName)
{
	return this._findPlaylistsByTextFields({name: aPlaylistName});
}

iTunesEmulator.prototype.findPlaylistByPersistentID = function(aPersistentID)
{
	var theMatchingPlaylists = this._findPlaylistsByTextFields({persistentID: aPersistentID});
	return (theMatchingPlaylists) ? theMatchingPlaylists[0] : null;
}

iTunesLibrary.prototype._load = function(aLibraryXML)
{
	// Load an iTunes XML Library export
	var theRequestObject = loadXMLDoc(aLibraryXML);
	
	// Take the second node from the main XML tree (the first is the
	// doctype), and then it's dict node
	var theXML = theRequestObject.responseXML.childNodes[1].childNodes[0];
	while (theXML.nodeName == "#text") theXML = theXML.nextSibling;
	
	// Then find the node containing the tracks
	var theTracksXML = null;
	for (var i = 0; i < theXML.childNodes.length; i++) {
		var theNode = theXML.childNodes[i];
		if ((theNode.nodeName == "key") && (theNode.textContent == "Tracks")) {
			theTracksXML = theNode.nextSibling;
			while (theTracksXML.nodeName == "#text") theTracksXML = theTracksXML.nextSibling;
		}
	}
	
	var k = 0;
	for (i = 0; i < theTracksXML.childNodes.length; i++) {
		var theNode = theTracksXML.childNodes[i];
		if (theNode.nodeName == "dict") {
			// Found a track
			
			var theTrack = new Track();

			for (var j = 0; j < theNode.childNodes.length; j++) {
				var theSubNode = theNode.childNodes[j];
				if (theSubNode.nodeName == "key") {
					var theValue = theSubNode.nextSibling;
					while (theValue.nodeName == "#text") theValue = theValue.nextSibling;
					
					theTrack._setPropertyFromXML(theSubNode.textContent, theValue.textContent);
				}
			}
			
			this.tracks.push(theTrack);
		}
	}
}
