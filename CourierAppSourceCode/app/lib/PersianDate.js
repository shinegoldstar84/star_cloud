class PersianDate
{
	weekDayNames = [
		"شنبه",
		"یکشنبه",
		"دوشنبه",
		"سه شنبه",
		"چهارشنبه",
		"پنج شنبه",
		"جمعه"
	];

	shortWeekDayNames = [
		"ش",
		"ی",
		"دو",
		"سه",
		"چهار",
		"پنج",
		"جمعه"
	];

	monthIndex =[
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"10",
		"11",
		"12"
	];

	monthNames = [
		'فروردین',
		'اردیبهشت',
		'خرداد',
		'تیر',
		'مرداد',
		'شهریور',
		'مهر',
		'آبان',
		'آذر',
		'دی',
		'بهمن',
		'اسفند'
	];

	strWeekDay = null;
	strMonth = null;
	day = null;
	month = null;
	year = null;
	ld = null;
	farsiDate = null;

	today = new Date();

	gregorianYear = null;
	gregorianMonth = null;
	gregorianDate = null;
	WeekDay = null;
	buf1 = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
	buf2 = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];


	_provideDate( gregorianDate )
	{
		this.today = new Date( gregorianDate );
		this.gregorianYear = this.today.getFullYear();
		this.gregorianMonth = this.today.getMonth() + 1;
		this.gregorianDate = this.today.getDate();
		this.WeekDay = this.today.getDay();
		this.toPersian(gregorianDate);
	}

	PersianCalendar( gregorianDate )
	{
		this._provideDate( gregorianDate );
		return this.year+"/"+this.strMonth+"/"+this.day;
	}

	persianDayName( gregorianDate, short = false )
	{
		this._provideDate( gregorianDate );
		return this[ short ? 'shortWeekDayNames' : 'weekDayNames' ][ (this.WeekDay + 1) % 7 ];
	}

	persianMonthName( gregorianDate )
	{
		this._provideDate( gregorianDate );
		return this.monthNames[ Math.floor( this.month ) - 1 ];
	}

	getDays()
	{
		return this.weekDayNames;
	}

	getMonthNames()
	{
		return this.monthIndex;
	}

	toPersian(gregorianDate) 
	{
		if ((this.gregorianYear % 4) != 0)
		{
			this.farsiDate = this.func1();
		}
		else
		{
			this.farsiDate = this.func2();
		}
		this.strMonth = this.monthIndex[ Math.floor(this.month - 1) ];
		this.strWeekDay = this.weekDayNames[ (this.WeekDay + 1) % 7 ];
	}


	func1()
	{
		this.day = this.buf1[this.gregorianMonth - 1] + this.gregorianDate;
		if (this.day > 79)
		{
			this.day = this.day - 79;
			if (this.day <= 186)
			{
				var day2 = this.day;
				this.month = (day2 / 31) + 1;
				this.day = (day2 % 31);
				if (day2 % 31 == 0)
				{
					this.month--;
					this.day = 31;
				}
				this.year = this.gregorianYear - 621;
			}
			else
			{
				var day2 = this.day - 186;
				this.month = (day2 / 30) + 7;
				this.day = (day2 % 30);
				if (day2 % 30 == 0)
				{
					this.month = (day2 / 30) + 6;
					this.day = 30;
				}
				this.year = this.gregorianYear - 621;
			}
		}
		else 
		{
			this.ld = this.gregorianYear > 1996 && this.gregorianYear % 4 == 1 ? 11 : 10;
			var day2 = this.day + this.ld;
			this.month = (day2 / 30) + 10;
			this.day = (day2 % 30);
			if (day2 % 30 == 0)
			{
				this.month--;
				this.day = 30;
			}
			this.year = this.gregorianYear - 622;
		}
		var fullDate = this.day + "/" + Math.floor(this.month) + "/" + this.year;
		return fullDate
	}


	func2()
	{
		//console.log("entered func2");
		this.day = this.buf2[this.gregorianMonth - 1] + this.gregorianDate;
		this.ld = this.gregorianYear >= 1996 ? 79 : 80;
		if (this.day > this.ld)
		{
			this.day = this.day - this.ld;
			if (this.day <= 186)
			{
				var day2 = this.day;
				this.month = (day2 / 31) + 1;
				this.day = (day2 % 31);
				if (day2 % 31 == 0)
				{
					this.month--;
					this.day = 31;
				}
				this.year = this.gregorianYear - 621;
			} 
			else
			{
				var day2 = this.day - 186;
				this.month = (day2 / 30) + 7;
				this.day = (day2 % 30);
				if (day2 % 30 == 0)
				{
					this.month--;
					this.day = 30;
				}
				this.year = this.gregorianYear - 621;
			}
			var fullDate = this.day + "/" + Math.floor(this.month) + "/" + this.year;
			return fullDate
		}
		else
		{
			var day2 = this.day + 10;
			this.month = (day2 / 30) + 10;
			this.day = (day2 % 30);
			if (day2 % 30 == 0)
			{
				this.month--;
				this.day = 30;
			}
			this.year = this.gregorianYear - 622;
		}
	}

	getTime( pDate )
	{
		let date = new Date( pDate );
		let hour = ( '0'+date.getHours() ).toString().substr( -2 );
		let minutes = ( '0' + date.getMinutes() ).toString().substr( -2 );
		return hour + ':' + minutes
	}

}

export const persianDate = new PersianDate();