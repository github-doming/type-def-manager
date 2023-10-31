export interface PropertiesContext {
	get key(): string;
	
	get name(): string;
}

export interface PropertiesHolder {
	get key(): string;
	
	get properties(): PropertyDataSet;
}

export class PropertyDataSet {
	public nodes: Map<string, Property>;
	
	constructor() {
		this.nodes = new Map();
	}
	
	setProperty(property: Property): PropertyDataSet {
		this.nodes.set(property.definition.type, property);
		return this;
	}
	
	getProperty(key: string): Property | undefined {
		return this.nodes.get(key);
	}
	
	values(): IterableIterator<Property> {
		return this.nodes.values();
	}
	
	toJson(): Map<string, any>[] {
		const jsonResult: Map<string, any>[] = [];
		for (const property of this.nodes.values()) {
			jsonResult.push(property.toJson());
		}
		return jsonResult;
	}
}


export class Property {
	private readonly _context: PropertiesContext;
	private readonly _definition: Definition;
	private readonly _holder: PropertiesHolder;
	private readonly _isDefault: string;
	private _value: string;
	private _localValue: LocalValue | undefined;
	
	constructor(context: PropertiesContext, holder: PropertiesHolder, definition: Definition, isDefault: string) {
		this._context = context;
		this._definition = definition;
		this._holder = holder;
		this._isDefault = isDefault;
		this._value = '';
	}
	
	
	get context(): PropertiesContext {
		return this._context;
	}
	
	get definition(): Definition {
		return this._definition;
	}
	
	get holder(): PropertiesHolder {
		return this._holder;
	}
	
	
	get isDefault(): string {
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
	
	toJson(): Map<string, any> {
		const jsonResult: Map<string, any> = new Map<string, object>();
		jsonResult.set('contextKey', this.context.key);
		jsonResult.set('definitionKey', this.definition.toJson());
		jsonResult.set('holderKey', this.holder.key);
		jsonResult.set('isDefault', this.isDefault);
		jsonResult.set('value', this.value);
		if (this.localValue) {
			jsonResult.set('localValue', this.localValue.toJson());
		}
		return jsonResult;
	}
}


export class Definition {
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

