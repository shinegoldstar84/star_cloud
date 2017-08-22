
export function DecorateFloat( string )
{
	if( string )
	{
		string = + parseFloat( string ).toFixed( 2 );
		string = string.toString().replace( '.', '٫' );
	}
	return string;
}
