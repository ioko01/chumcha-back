import { IsDate } from "./interface_date";

export interface IMenu extends IsDate {
    name?: string;
    topping?: String[];
    price?: number;
    detail?: string;
    category?: string;
    image?: string;
}
