import {Attribute} from "@/views/js/type/attribute";
import {InitRule} from "@/views/js/type/init-rule";
import {Layout} from "@/views/js/type/layout";
import {Property} from "@/views/js/type/property";

export class Type {
	
	private readonly _key: string;
	private readonly _parent: string;
	private readonly _properties: Property[];
	private readonly _attributes: Attribute[];
	private readonly _initRules: InitRule[];
	private readonly _layouts: Layout[];
	
	constructor(key: string, dataSet: any) {
		this._key = key;
		this._parent = dataSet['parent']
		this._properties = [];
		for (const property of dataSet['properties']) {
			this._properties.push(new Property(this, property))
		}
		
		this._attributes = [];
		for (const key in dataSet['attributes']) {
			this._attributes.push(new Attribute(this,key, dataSet['attributes'][key]))
		}
		
		this._initRules = [];
		for (const initRule of dataSet['initRules']) {
			this._initRules.push(new InitRule(this, initRule))
		}
		
		this._layouts = [];
		for (const key in dataSet['layouts']) {
			this._layouts.push(new Layout(this,key, dataSet['layouts'][key]))
		}
		
	}
	
	
	get name(): string {
		let displayName;
		for (const property of this._properties) {
			if (property.definition.type == 'displayName') {
				displayName = property.localValue?.zh_CN;
			}
		}
		if (displayName) {
			return displayName;
		}
		return this.key;
	}
	
	
	get key(): string {
		return this._key;
	}
	
	
	get parent(): string {
		return this._parent;
	}

	
	get properties(): Property[] {
		return this._properties;
	}
	
	get attributes(): Attribute[] {
		return this._attributes;
	}
	
	get initRules(): InitRule[] {
		return this._initRules;
	}
	
	get layouts(): Layout[] {
		return this._layouts;
	}
	
	public toJson(): string {
		
		const jsonResult: any = {};
		jsonResult['name'] = this.key;
		jsonResult['parent'] = this.parent;
		
		if (this.attributes) {
			jsonResult['attributes'] = {};
			for (const attribute of this.attributes) {
				jsonResult['attributes'][attribute.key] = attribute.toJson();
			}
		}
		if (this.initRules) {
			jsonResult['initRules'] = [];
			for (const initRule of this.initRules) {
				jsonResult['initRules'].push(initRule.toJson());
			}
		}
		if (this.layouts) {
			jsonResult['layouts'] = {};
			for (const layout of this.layouts) {
				jsonResult['layouts'][layout.key] = layout.toJson();
			}
		}
		if (this.properties) {
			jsonResult['properties'] = [];
			for (const property of this.properties) {
				jsonResult['properties'].push(property.toJson());
			}
		}
		
		
		return jsonResult;
	}
	
}







