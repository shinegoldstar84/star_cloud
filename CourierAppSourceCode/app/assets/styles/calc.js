import { Dimensions }	from 'react-native';

const window = Dimensions.get('window');

export default class Calc
{
	/**
	 * Calculate Width by Percentage
	 *
	 * @param mixed percent
	 * @return mixed
	 */
	static widthPercent( percent )
	{
		return percent / 100 * window.width;
	}

	/**
	 * Calculate Height by Percentage
	 *
	 * @param mixed percent
	 * @return mixed
	 */
	static heightPercent( percent )
	{
		return percent / 100 * window.height;
	}

	/**
	 * Calculate Width
	 *
	 * @param mixed width
	 * @return mixed
	 */
	static width( width )
	{
		// TODO: Here we might need to convert width to be dynamically changed based on the device dimension or/and density
		return width;
	}

	/**
	 * Calculate Height
	 *
	 * @param mixed height
	 * @return mixed
	 */
	static height( height )
	{
		// TODO: Here we might need to convert height to be dynamically changed based on the device dimension or/and density
		return height;
	}

	/**
	 * Calculate Font Size
	 *
	 * @param mixed size
	 * @return mixed
	 */
	static fontSize( size )
	{
		// TODO: here we might need to convert font size to be dynamically changed based on the device dimension or/and density
		return size;
	}

	/**
	 * Calculate Line Height
	 *
	 * @param mixed height
	 * @return mixed
	 */
	static lineHeight( height )
	{
		// TODO: here we might need to convert line height to be dynamically changed based on the device dimension or/and density
		return height;
	}
}
