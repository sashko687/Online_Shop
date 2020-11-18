import { Product } from '../shared/interfaces';

export interface Order {
	id?: string;
	date?: Date | string | number;
	phone?: string;
	name?: string;
	address?: string;
	orders?: Product [];
	payment?: string;
	price?: string | number;
}
