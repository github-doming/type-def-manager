import {Type} from "@/views/js/type";

export class Layout {
	private readonly _key: string;
	private readonly _context: Type;
	private readonly _value: string;
	
	constructor(context: Type,key:string, value: any) {
		this._key = key;
		this._context = context;
		this._value = value;
	}
	get key(): string {
		return this._key;
	}
	
	get context(): Type {
		return this._context;
	}
	
	get value(): string {
		return this._value;
	}
	
	toJson(): string {
		return this.value;
	}
}
