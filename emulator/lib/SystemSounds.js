function SystemSounds() 
{
	/* Constants */
	this.SystemSoundSelect		= 10000;
	this.SystemSoundToggle		= 10001;
	this.SystemSoundScrollStart	= 10002;
	this.SystemSoundScrollLimit	= 10003;
	this.SystemSoundExit		= 10004;
	this.SystemSoundError		= 4294965796;

	/* Audio Engine */
	this._audioEngine = new Audio();
	this._audioEngine.style.display = "none";
	
	this._audioEngine.loop = false;
	this._audioEngine.volume = 1;
	
	function _initAudioEngine(aContext){
		if (document.body) {
			document.body.appendChild(aContext._audioEngine);
		} else {
			setTimeout(_initAudioEngine, 50, aContext);
		}
	}

	_initAudioEngine(this);
}

SystemSounds.prototype.playSystemSound = function(aSystemSound)
{
	switch (aSystemSound) {
		case this.SystemSoundSelect:
		case this.SystemSoundToggle:
			this._play("emulator/sounds/Selection.aif");
			break;
		case this.SystemSoundScrollStart:
			this._play("emulator/sounds/SelectionChange.aif");
			break;
		case this.SystemSoundScrollLimit:
			this._play("emulator/sounds/Limit.aif");
			break;
		case this.SystemSoundExit:
			this._play("emulator/sounds/Exit.aif");
			break;
		case this.SystemSoundError:
		default:
			break;
	}
}

SystemSounds.prototype._play = function(aFile)
{
	this._audioEngine.pause();

	this._audioEngine.src = window.iTunes._baseURL + aFile;
	this._audioEngine.load();
	this._audioEngine.play();
}
