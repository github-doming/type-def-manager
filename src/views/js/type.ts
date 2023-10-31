import {Attribute} from "@/views/js/type/attribute";
import {InitRule} from "@/views/js/type/init-rule";
import {Layout} from "@/views/js/type/layout";
import {PropertiesContext, PropertiesHolder, Property, PropertyDataSet} from "@/views/js/type/property";
import {UnwrapRef} from "vue";
import {analysisPropertyInfo} from "@/views/js/type/type-factory-helper";


export class TypeDataSet {
	public nodes: Map<string, Type>;
	
	constructor() {
		this.nodes = new Map();
	}
	
	
	setType(type: Type): TypeDataSet {
		this.nodes.set(type.key, type);
		return this;
	}
	
	getType(key: string): Type | undefined {
		return this.nodes.get(key);
	}
	
	hasType(key: string): boolean {
		return this.nodes.has(key);
	}
	
	get values(): IterableIterator<Type> {
		return this.nodes.values();
	}
	
	clear(): TypeDataSet {
		this.nodes.clear();
		return this;
	}
	
	get topType(): Type {
		return this.nodes.values().next().value;
	}
}

export class Type implements PropertiesContext, PropertiesHolder {
	private readonly _key: string;
	private readonly _parent: Type | undefined;
	private readonly _properties: PropertyDataSet;
	private readonly _attributes: Attribute[];
	private readonly _initRules: InitRule[];
	private readonly _layouts: Layout[];
	
	constructor(key: string, parent: Type | undefined) {
		this._key = key;
		this._parent = parent;
		this._properties = new PropertyDataSet();
		this._attributes = [];
		this._initRules = [];
		this._layouts = [];
	}
	
	get name(): string {
		const displayName = this.properties.getProperty('displayName')?.localValue?.zh_CN
		if (displayName) {
			return displayName;
		}
		return this.key;
	}
	
	get key(): string {
		return this._key;
	}
	
	get parent(): Type | undefined {
		return this._parent;
	}
	
	get properties(): PropertyDataSet {
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
		jsonResult['parent'] = this.parent?.key;
		
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
			jsonResult['properties'] = this.properties.toJson();
		}
		
		
		return jsonResult;
	}
	
}







