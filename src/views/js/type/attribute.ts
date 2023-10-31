import {Type} from "@/views/js/type";
import {PropertiesHolder, PropertyDataSet} from "@/views/js/type/property";

export class Attribute implements PropertiesHolder {
	private readonly _key: string;
	private readonly _context: Type;
	private readonly _properties: PropertyDataSet;
	private readonly _value: string;
	
	constructor(context: Type, key: string, value: any) {
		this._key = key;
		this._context = context;
		this._properties = new PropertyDataSet();
		this._value = value;
	}
	
	get key(): string {
		return this._key;
	}
	
	get context(): Type {
		return this._context;
	}
	
	get properties(): PropertyDataSet {
		return this._properties;
	}
	
	get value(): string {
		return this._value;
	}
	
	
	toJson(): string {
		return this.value;
	}
}
