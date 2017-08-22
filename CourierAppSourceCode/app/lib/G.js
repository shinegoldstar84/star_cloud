import Config from 'react-native-config';

export default class G
{

	static baseUrl = Config.API_URL;
	static serverUrl= Config.SERVER_URL;

	static bgLocateInterval = 2000;
	static bgLocateIntervalWithOrder = 15000;

	static jwtToken = null;

	static orderResponseTime = 20000;

	static checkOrderTimeout = 10000;

	static sharingSubject:any = 'پیک رایگان الوپیک';
	static sharingTextVal:any = 'یه پیک رایگان با الوپیک بگیر!{splitter}با اپلیکیشن الوپیک میتونی به راحتی هر جا و هر وقت، راحت پیک درخواست کنی و بسته خودتو ارزان و مطمئن با بهترین راننده ها به مقصد برسونی.{splitter}برای استفاده از پیک رایگان کافیه الوپیک رو از لینک زیر دانلود کنی:{splitter}https://alopeyk.com{splitter}و بعد از نصب اپلیکیشن در هنگام ثبت نام کد زیر رو در قسمت کد معرف وارد کنی:{splitter}';

	static supportTel = '02196623425';

	static broadcastingMessage = "سفیر گرامی \n چنانچه همه درخواست های ورودی شما مورد پذیرش قرار گیرند مشمول دریافت پاداش از الوپیک خواهید شد.";

	static pickupTimeout = 5;

	static banWarnings;

	static appVersion = '3.0.2';

	static pushToken = '';

	static telegramSafiranLink = 'https://telegram.me/alopeyk_safiran';

	static telegramSafiranName = 'alopeyk_safiran';

	static sharingText ( referralCode:any = '' ) 
	{
	    let splitter = "\n";
	    return this.sharingTextVal.replace(/\{splitter\}/g, splitter) + referralCode;
	}

	static setConfig( config )
	{
		if ( config && config.supportTel ) G.supportTel = config.supportTel;
		if ( config && config.bglocateIterval ) G.bgLocateInterval = config.bglocateIterval;
		if ( config && config.pickupTimeout ) G.pickupTimeout = config.pickupTimeout;
		if ( config && config.broadcastingMessage ) G.broadcastingMessage = config.broadcastingMessage;
		if ( config && config.ban ) G.banWarnings = config.ban;
		if ( config && config.check_order_interval ) G.checkOrderTimeout = config.check_order_interval;
		if ( config && config.bglocateItervalUnderOrder ) G.bgLocateIntervalWithOrder = config.bglocateItervalUnderOrder;
		if ( config && config.social && config.social.telegram && config.social.telegram.safiran )
		{
			if ( config.social.telegram.safiran.link ) G.telegramSafiranLink = config.social.telegram.safiran.link;
			if ( config.social.telegram.safiran.name ) G.telegramSafiranName = config.social.telegram.safiran.name;
		}
	}

}