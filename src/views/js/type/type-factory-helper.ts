import {UnwrapRef} from "vue";
import {
	Definition,
	LocalValue,
	PropertiesContext,
	PropertiesHolder,
	Property,
} from "@/views/js/type/property";
import {Type, TypeDataSet} from "@/views/js/type";
import {Attribute} from "@/views/js/type/attribute";
import {InitRule} from "@/views/js/type/init-rule";
import {Layout} from "@/views/js/type/layout";

export const analysisTypeInfo = (dataSet: any, typeDataSet: UnwrapRef<TypeDataSet>): void => {
	const parent: Type | undefined = typeDataSet.getType(dataSet['parent']);
	const type = new Type(dataSet['name'], parent);
	typeDataSet.setType(type);
	for (const item of dataSet['properties']) {
		analysisPropertyInfo(item, type, typeDataSet);
	}
	for (const key in dataSet['attributes']) {
		analysisAttributeInfo(dataSet['attributes'][key], type, typeDataSet);
		
		// type.attributes.push(new Attribute(type, key, dataSet['attributes'][key]))
	}
	for (const initRule of dataSet['initRules']) {
		type.initRules.push(new InitRule(type, initRule))
	}
	for (const key in dataSet['layouts']) {
		type.layouts.push(new Layout(type, key, dataSet['layouts'][key]))
	}
}


export const analysisPropertyInfo = (dataSet: any, holder: PropertiesHolder, typeDataSet: UnwrapRef<TypeDataSet>): void => {
	const context: PropertiesContext | undefined = typeDataSet.getType(dataSet['contextKey']);
	if (!context) {
		throw new Error('Context information needs to exist');
	}
	const definition = new Definition(dataSet['definitionKey']);
	const isDefault = dataSet['isDefault'];
	
	const property = new Property(context, holder, definition, isDefault);
	holder.properties.setProperty(property);
	property.value = dataSet['value'];
	if (dataSet['localValue']) {
		property.localValue = new LocalValue(dataSet['localValue']);
	}
}

export const analysisAttributeInfo = (dataSet: any, type: Type, typeDataSet: UnwrapRef<TypeDataSet>): void => {
	const context: Type | undefined = typeDataSet.getType(dataSet['contextKey']);
	if (!context) {
		throw new Error('Context information needs to exist');
	}
	const nonPersisted = dataSet['nonPersisted'];
	const datatypeKey = dataSet['datatypeKey'];
	const name = dataSet['name'];
	
	const attribute = new Attribute(name, context, nonPersisted, datatypeKey);
	type.attributes.setAttribute(attribute)
	for (const item of dataSet['properties']) {
		analysisPropertyInfo(item, attribute, typeDataSet);
	}
	for (const defaultValue of dataSet['defaultValues']) {
		attribute.defaultValues.push(defaultValue)
	}
	
	for (const constraint of dataSet['constraints']) {
		attribute.constraints.push(constraint)
	}
}


export const getPropertyValue = (key: string, propertiesHolder: PropertiesHolder): string => {
	const description = propertiesHolder.properties.getProperty(key)?.localValue?.zh_CN
	if (description) {
		return description;
	}
	return propertiesHolder.key;
}

export const getAttribute = (attributeKey: string, type: Type): Attribute => {
	const attribute = type.attributes.getAttribute(attributeKey);
	if (attribute) {
		return attribute;
	}
	if (type.parent) {
		return getAttribute(attributeKey, type.parent);
	}
	debugger
	throw new Error('The '+attributeKey+' attribute does not exist in the type ' + type.displayName + '.');
}

export const getAttributeProperty = (propertyKey: string, attributeKey: string, type: Type): Property | undefined => {
	const attribute = type.attributes.getAttribute(attributeKey);
	if (attribute) {
		const property = attribute.properties.getProperty(propertyKey);
		if (property) {
			return property;
		}
	}
	if (type.parent) {
		return getAttributeProperty(propertyKey, attributeKey, type.parent);
	}
	return undefined;
}
