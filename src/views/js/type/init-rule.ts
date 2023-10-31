import {Type} from "@/views/js/type";

export class InitRule {
	private readonly _context: string;
	private readonly _value: string;
	
	constructor(context: Type, value: any) {
		this._context = context.displayName;
		this._value = value;
	}
	
	get context(): string {
		return this._context;
	}
	
	get value(): string {
		return this._value;
	}
	
	toJson(): string {
		return this.value;
	}
}
