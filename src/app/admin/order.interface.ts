export interface Order {
	id: string;
	date: Date | string | number;
	phone: string;
	name: string;
	address: string;
	orders: [];
	payment: string;
	price: string;
}