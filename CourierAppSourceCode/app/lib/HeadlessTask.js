import { orderService }		from './OrderService';

module.exports = async () =>
{
	return orderService.startBackground();
}