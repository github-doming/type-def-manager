import {Type} from "@/views/js/type";
import {PropertiesHolder, PropertyDataSet} from "@/views/js/type/property";
import {getPropertyValue} from "@/views/js/type/type-factory-helper";


export class AttributeDataSet {
	private nodes: Map<string, Attribute>;
	
	constructor() {
		this.nodes = new Map();
	}
	
	setAttribute(attribute: Attribute): AttributeDataSet {
		this.nodes.set(attribute.key, attribute);
		return this;
	}
	
	getAttribute(key: string): Attribute | undefined {
		return this.nodes.get(key);
	}
	
	values(): IterableIterator<Attribute> {
		return this.nodes.values();
	}
	
	keys(): IterableIterator<string> {
		return this.nodes.keys();
	}
	
	toJson() {
		const jsonResult: any = {};
		this.nodes.forEach((value: Attribute, key: string) => {
			jsonResult[key] = value.toJson();
		})
		return jsonResult;
	}
}

export class Attribute implements PropertiesHolder {
	private readonly _name: string;
	private readonly _context: Type;
	private readonly _nonPersisted: string;
	private readonly _datatypeKey: string;
	private readonly _properties: PropertyDataSet;
	private readonly _defaultValues: [];
	private readonly _constraints: [];
	
	
	constructor(name: string, context: Type, nonPersisted: string, datatypeKey: string) {
		this._name = name;
		this._context = context;
		this._nonPersisted = nonPersisted;
		this._datatypeKey = datatypeKey;
		this._properties = new PropertyDataSet();
		this._defaultValues = [];
		this._constraints = [];
		
	}
	
	get key(): string {
		return this.name;
	}
	
	get displayName(): string {
		return getPropertyValue('displayName', this);
	}
	
	get name(): string {
		return this._name;
	}
	
	get context(): Type {
		return this._context;
	}
	
	get properties(): PropertyDataSet {
		return this._properties;
	}
	
	
	get nonPersisted(): string {
		return this._nonPersisted;
	}
	
	get datatypeKey(): string {
		return this._datatypeKey;
	}
	
	
	get defaultValues(): any[] {
		return this._defaultValues;
	}
	
	get constraints(): any[] {
		return this._constraints;
	}
	
	toJson(): string {
		const jsonResult: any = {};
		jsonResult['contextKey'] = this.context.key;
		jsonResult['nonPersisted'] = this.nonPersisted;
		jsonResult['name'] = this.name;
		jsonResult['datatypeKey'] = this.datatypeKey;
		if (this.properties) {
			jsonResult['properties'] = this.properties.toJson();
		}
		
		jsonResult['defaultValues'] = [];
		if (this.defaultValues) {
			for (const defaultValue of this.defaultValues) {
				jsonResult['defaultValues'].push(defaultValue)
			}
		}
		jsonResult['constraints'] = [];
		if (this.constraints) {
			for (const constraint of this.constraints) {
				jsonResult['constraints'].push(constraint)
			}
		}
		
		return jsonResult;
	}
}
