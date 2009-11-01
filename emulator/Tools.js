/**
 * Load an XML file into a DOM structure
 *
 * @param aURL {string}
 * The URI of the file to load
 *
 * @return An XMLHttpRequest object with the loaded file or null if the file couldn't be
 * loaded.
 */
function loadXMLDoc(aUrl)
{
	var theXmlRequest = new XMLHttpRequest();
	theXmlRequest.open("GET", aUrl, false);
	theXmlRequest.send("");

   	if (theXmlRequest.readyState == 4)
		return theXmlRequest;

	return null;
}

/**
 * Converts a duration in seconds to a time string
 *
 * @param aDuration {number}
 * The duration to convert into a string
 *
 * @return The duration as a string of the format "m:ss" where m is minutes and s is seconds.
 */
function timeString(aDuration)
{
	var theSeconds = Math.round(aDuration);
	var theMinutes = 0;
	
	while(theSeconds > 60) {
		theSeconds -= 60;
		theMinutes++;
	}
	
	return theMinutes + ":" + ((theSeconds < 10) ? "0" : "") + theSeconds;
}

/**
 * Generate a random persistentID to assign to tracks and playlists
 *
 * @return A 20 character string of numbers containing a randomized (hopefully unique) ID
 */
function generatePersistentID()
{
	var thePersistentID = "";
	for (var i = 0; i < 20; i++)
		thePersistentID += Math.floor(Math.random() * 10);
	
	return thePersistentID;
}
