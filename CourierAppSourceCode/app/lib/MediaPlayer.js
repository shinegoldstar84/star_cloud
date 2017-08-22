import Sound from 'react-native-sound';

class MediaPlayer 
{

	constructor()
	{
		this.loadSounds();
	}

	/**
	 * play the income sound
	 */
	playIncome()
	{
		if ( this.incomeSound )
		{
			this.incomeSound.play();
			this.incomeSound.setVolume( 1 );
		}
	}

	/**
	 * preload sounds 
	 */
	loadSounds()
	{
		this.incomeSound = new Sound( 'income.mp3', Sound.MAIN_BUNDLE );
		this.alertSound = new Sound( 'alert.mp3', Sound.MAIN_BUNDLE );
	}

	/**
	 * play the alert sound
	 */
	playAlert()
	{
		if ( this.alertSound )
		{
			this.alertSound.play();
			this.alertSound.setVolume( 1 );
		}
	}

	/**
	 * release the media resource
	 */
	release()
	{
		this.incomeSound.stop();
		this.incomeSound.release();
		this.alertSound.stop();
		this.alertSound.release();
		this.loadSounds();
	}

}

export const mediaPlayer = new MediaPlayer();