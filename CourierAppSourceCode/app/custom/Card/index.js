import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import Styles from './style';
import Text from '../Text';
import Icon from '../Icon';
import { HiddenStyles } from '../../config/styles';
import { GetColor } from '../Utils/color';

class Card extends Component 
{
	constructor(props) {
		super(props);
		this.state = {
			collapsed: props.collapsed
		};
		this.toggle = this.toggle.bind(this);
	}

	componentWillReceiveProps(nextProps)
	{
		let collapsed = nextProps.collapsed;
		if(this.props.collapsed != collapsed)
		{
			this.setState({
				collapsed
			});
		}
	}

	toggle() {
		this.setState({
			collapsed: !this.state.collapsed
		});
	}

	render() {
		const { isLight, timelineCircleIcon, timelineCircleText, timelineCircleBackground, timelineCircleColor, footerTogglable, togglable, hasToggleIcon, hasTimeline, first, last, disabled, children, ...restProps } = this.props;

		let headerComponents = null,
			bodyComponents = null,
			footerComponents = null,
			bodyOtherComponents = [];


		if ( children )
		{
			if ( Array.isArray( children ) )
			{
				for ( let i in children )
				{
					if ( children[ i ] && children[ i ].props )
					{
						const { role } = children[ i ].props; 
						switch ( role )
						{
							case 'header':
								headerComponents = children[ i ];
								break;
							case 'body':
								bodyComponents = children[ i ];
								break;
							case 'footer':
								footerComponents = children[ i ];
								break;
							default:
								bodyOtherComponents = children[ i ];
								break;			
						}
					}
				}
			}
			else if ( typeof children === 'object' )
			{
				const { role } = children.props;
				switch ( role )
				{
					case 'header':
						headerComponents = children;
						break;
					case 'body':
						bodyComponents = children;
						break;
					case 'footer':
						footerComponents = children;
						break;
					default:
						bodyOtherComponents = children;
						break;			
				}
			}
		}

		let hasHeader = headerComponents;
		let hasFooter = footerComponents;
		let hasBody = bodyComponents || bodyOtherComponents.length > 0;
		hasBody = hasBody || ( footerTogglable && hasFooter );
		let footer = (
				footerComponents &&
				<View style={[Styles.card__footer, (disabled ? Styles.card__footerDisabled : (isLight ? { borderTopColor: GetColor('gray-e') } : {})), (footerComponents && footerComponents.props.style ? footerComponents.props.style : {})]}>
					{footerComponents.props.children}
				</View>
			),
			hasTimelineCircleColor = timelineCircleColor && timelineCircleColor.length,
			defaultCircleColor = StyleSheet.flatten(Styles.timeline__circleComponentDefaultColor).color,
			defaultCircleDisable = StyleSheet.flatten(Styles.timeline__circleComponentDefaultDisable),
			hasTimelineCircleBackground = timelineCircleBackground && timelineCircleBackground.length,
			disablable = hasTimelineCircleBackground && disabled;

		return (
			<View style={[ Styles.card__container, this.props.cardContainerStyle ? this.props.cardContainerStyle : {} ]} {...restProps}>
				<View style={[ Styles.card, this.props.cardStyle ? this.props.cardStyle : {} ]}>
					{hasTimeline?(
					<View style={Styles.card__colTimeline}>
						<View style={Styles.colTimeline__inner}>
							<View style={[Styles.timeline__lineTop, (first ? HiddenStyles : {})]}></View>
							<View style={[Styles.timeline__circle, (hasTimelineCircleBackground ? {backgroundColor: (disabled ? defaultCircleDisable.backgroundColor : timelineCircleBackground)} : {})]}>
								{timelineCircleText && timelineCircleText.length ? (<Text color={hasTimelineCircleColor ? timelineCircleColor : (disablable ? defaultCircleDisable.color : defaultCircleColor)} style={Styles.timeline__circleComponent}>{timelineCircleText}</Text>) : null}
								{timelineCircleIcon && timelineCircleIcon.length ? (<Icon size="small" name={timelineCircleIcon} color={hasTimelineCircleColor ? timelineCircleColor : (disablable ? defaultCircleDisable.color : defaultCircleColor)} style={Styles.timeline__circleComponent} />) : null}
							</View>
							<View style={[Styles.timeline__lineBottom, (last ? HiddenStyles : {})]}></View>
						</View>
					</View>
					):null}
					<View style={[Styles.card__colContent, (last ? {paddingBottom: 0} : {})]}>
						{hasTimeline ? (<View style={[Styles.card__arrow, (disabled ? Styles.card__arrowDisabled : (isLight ? { backgroundColor: GetColor('white') } : {}))]}></View>) : null}
						<View style={[Styles.card__box, (disabled ? Styles.card__boxDisabled : {}), this.props.cardBoxStyle ? this.props.cardBoxStyle : {} ]}>
							{hasTimeline ? (<View style={[Styles.card__arrowOverlay, (disabled ? Styles.card__arrowOverlayDisabled : (isLight ? { backgroundColor: GetColor('white') } : {}))]}></View>) : null}
							<View style={[Styles.card__boxInner, (disabled ? Styles.card__boxInnerDisabled : (isLight ? { backgroundColor: GetColor('white') } : {})), this.props.cardBoxInnerStyle ? this.props.cardBoxInnerStyle : {}]}>
								{hasHeader ? (
								<TouchableHighlight onPress={togglable ? this.toggle : null} underlayColor="transparent">
									<View style={[ Styles.card__header, ( headerComponents && headerComponents.props.headerStyles ? headerComponents.props.headerStyles : {} ) ]}>
										<View style={[Styles.header__contentCol, (headerComponents && headerComponents.props.style ? headerComponents.props.style : {})]}>
											{headerComponents.props.children}
										</View>
										{hasToggleIcon ? (<View style={Styles.header__toggleCol}>
											{hasBody ? (<Icon name={this.state.collapsed ? 'arrow-up' : 'arrow-down'} size="small" style={Styles.header__toggleIcon} />) : null}
										</View>) : null}
									</View>
								</TouchableHighlight>) : null}
								{hasBody && bodyComponents ? (<View style={[Styles.card__body, this.state.collapsed == false ? { height: 0 } : {}]}>
									<View style={[Styles.card__bodyInner, (hasHeader ? Styles.card__bodyInnerBordered : {}), (disabled ? Styles.card__bodyInnerBorderedDisabled: (isLight ? { borderTopColor: GetColor('gray-e') } : {})), (bodyComponents && bodyComponents.props.style ? bodyComponents.props.style : {})]}>
										{bodyComponents.props.children}
										{bodyOtherComponents}
									</View>
									{footerTogglable && hasFooter ? footer : null}
								</View>) : null}
								{!footerTogglable && hasFooter ? footer : null}
							</View>
						</View>
					</View>
				</View>
			</View>
		);
	}
};

export default Card;
