import {Type} from "@/views/js/type";

export class Property {
	private readonly _context: Type;
	private readonly _definition: Definition;
	private readonly _holder: string;
	private readonly _isDefault: boolean;
	private _value: string;
	private _localValue: LocalValue | undefined;
	
	constructor(context: Type, property: any) {
		this._context = context;
		this._definition = new Definition(property['definitionKey'])
		this._holder = property['holderKey'];
		this._isDefault = property['isDefault'];
		this._value = property['value'];
		if (property['localValue']) {
			this._localValue = new LocalValue(property['localValue']);
		}
	}
	
	
	get context(): Type {
		return this._context;
	}
	
	get definition(): Definition {
		return this._definition;
	}
	
	get holder(): string {
		return this._holder;
	}
	
	
	get isDefault(): boolean {
		return this._isDefault;
	}
	
	get value(): string {
		return this._value;
	}
	
	
	set value(value: string) {
		this._value = value;
	}
	
	get localValue(): LocalValue | undefined {
		return this._localValue;
	}
	
	set localValue(value: LocalValue | undefined) {
		this._localValue = value;
	}
	
	toJson() {
		const jsonResult: any = {};
		jsonResult['contextKey'] = this.context.key;
		jsonResult['definitionKey'] = this.definition.toJson();
		jsonResult['holderKey'] = this.holder;
		jsonResult['isDefault'] = this.isDefault;
		jsonResult['value'] = this.value;
		if (this.localValue) {
			jsonResult['localValue'] = this.localValue.toJson();
		}
		return jsonResult;
	}
}


class Definition {
	private readonly _classname: string;
	private readonly _type: string;
	
	constructor(holder: string) {
		const keys = holder.split("~");
		this._classname = keys[0];
		this._type = keys[1];
	}
	
	get classname(): string {
		return this._classname;
	}
	
	get type(): string {
		return this._type;
	}
	
	
	toJson(): string {
		return this.classname + "~" + this.type;
	}
}

export class LocalValue {
	private _en_GB: string | undefined;
	private _en_US: string | undefined;
	private _zh_CN: string | undefined;
	
	constructor(localValue: any | undefined) {
		if (!localValue) {
			return;
		}
		this._en_GB = localValue['en_GB'];
		this._en_US = localValue['en_US'];
		this._zh_CN = localValue['zh_CN'];
	}
	
	
	get en_GB(): string | undefined {
		return this._en_GB;
	}
	
	
	set en_GB(value: string | undefined) {
		this._en_GB = value;
	}
	
	get en_US(): string | undefined {
		return this._en_US;
	}
	
	set en_US(value: string | undefined) {
		this._en_US = value;
	}
	
	get zh_CN(): string | undefined {
		return this._zh_CN;
	}
	
	
	set zh_CN(value: string | undefined) {
		this._zh_CN = value;
	}
	
	toJson() {
		return {
			'en_GB': this.en_GB,
			'en_US': this.en_US,
			'zh_CN': this.zh_CN
		}
	}
}

