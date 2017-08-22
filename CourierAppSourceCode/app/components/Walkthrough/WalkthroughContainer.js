import React 			from 'react';
import Walkthrough 		from './Walkthrough';

export default class WalkthroughContainer extends React.Component
{

	render()
	{
		return <Walkthrough navigate={ () => this.props.navigation.navigate( 'Login' ) } />
	}

}