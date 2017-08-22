import React 						from 'react';
import Account 						from './Account';
import { bindActionCreators }		from 'redux';
import { connect }					from 'react-redux';
import { ActionCreators }			from '../../actions';
import {BackHandler}				from 'react-native';
import {showAlert}					from '../../lib/Helpers';

class AccountContainer extends React.Component
{

	constructor(props) 
	{
		super(props);
		this.state = { id: '', owner: '', number: '', bank_name: '', isValid: false };
	}

	componentWillMount()
	{
		this.props.getBanks();
		this.props.getUserAccount().then( () => 
			{
				if ( this.props.userAccount )
				{
					this.setState(
					{
						id: this.props.userAccount.id,
						owner: this.props.userAccount.owner,
						number: this.props.userAccount.number,
						bank_name: this.props.userAccount.bank_name ? this.props.userAccount.bank_name.id : '',
						isValid: this.props.userAccount.number ? true : false,
					})
				}
			});
		BackHandler.addEventListener('hardwareBackPress', () =>
		{
			BackHandler.exitApp();
			return true;
		});
	}

	handleFormChanges = ( data ) =>
	{
		if ( data.hasOwnProperty( 'name' ) && this.state.hasOwnProperty( data.name ) )
		{
			if ( data.name == 'number' )
			{
				data.value = data.value.replace( /-/g, '' );
			}

			this.setState(
			{
				[ data.name ] : data.value
			})
			if (data.value.length == 24)
			{
				this.props.validateSheba(data.value)
					.then(data =>
						{
							if (data && data.IsSuccess && data.Data)
							{
								this.setState(
								{
									owner: data.Data.AccountOwners[0].FirstName + ' ' + data.Data.AccountOwners[0].LastName,
									isValid: true
								})
							}
							else
							{
								this.setState(
								{
									isValid: false,
								})
								showAlert('شماره شبا نامعتبر است.');
							}
						})
					.catch(e =>
						{
							this.setState(
							{
								isValid: false,
							})
							showAlert('شماره شبا نامعتبر است.');
						});
			}
		}
	}

	isFormValid = () =>
	{
		return !this.state.number || this.state.number.length != 24 || !this.state.isValid;
	}

	submitAccount = () =>
	{
		this.props.saveData( this.state );
	}

	render()
	{
		return <Account 
					isLoading={ this.props.isLoading }
					formHandler={ this.handleFormChanges }
					bankList={ this.props.banks }
					defaultValue={ this.state.bank_name }
					handlePress={ this.submitAccount }
					disabled={ this.isFormValid() }
					owner={ this.state.owner ? this.state.owner : null }
					number={ this.state.number ? this.state.number : null }
					bankName={ this.state.bank_name ? this.state.bank_name : null }
					clear={() => this.setState({number: '', owner: ''})}
				/>
	}

}

const mapStateToProps = ( state ) =>
{
	return {
		banks: state.account && state.account.banksList ? state.account.banksList : [],
		userAccount: state.account && state.account.userAccount ? state.account.userAccount : {},
		isLoading: state.loading.AccountContainer,
		user: state.auth && state.auth.user ? state.auth.user : {}
	}
}

const mapDispatchToProps = ( dispatch ) =>
{
	return bindActionCreators(
	{
		getBanks: ActionCreators.getBanksList,
		getUserAccount: ActionCreators.getUserAccount,
		saveData: ActionCreators.saveUserAccount,
		validateSheba: ActionCreators.validateSheba
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( AccountContainer );