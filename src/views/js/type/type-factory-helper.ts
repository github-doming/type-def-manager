import {UnwrapRef} from "vue";
import {Definition, LocalValue, PropertiesContext, PropertiesHolder, Property} from "@/views/js/type/property";
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
		type.attributes.push(new Attribute(type, key, dataSet['attributes'][key]))
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
	const definition = new Definition(dataSet['definitionKey'])
	const isDefault = dataSet['isDefault'];
	
	const property = new Property(context, holder, definition, isDefault);
	holder.properties.setProperty(property);
	
	property.value = dataSet['value'];
	if (dataSet['localValue']) {
		property.localValue = new LocalValue(property['localValue']);
	}
}