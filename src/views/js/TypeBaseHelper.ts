import {Type} from "@/views/js/type";
import {Property} from "@/views/js/type/property";
import {ColumnItem} from "@/views/js/TypeDefHelper";

export const propertyColumns: ColumnItem[] = [
	{
		title: '主体',
		dataIndex: 'context',
		width: '10%',
	},
	{
		title: '定义',
		dataIndex: 'key',
		width: '10%',
	},
	{
		title: '持有者',
		dataIndex: 'holder',
		width: '10%',
	},
	{
		title: '值',
		dataIndex: 'value',
		width: '17%',
	},
	{
		title: '英语（美国）',
		dataIndex: 'en_GB',
		width: '20%',
	},
	{
		title: '英语（美国）',
		dataIndex: 'en_US',
		width: '20%',
	},
	{
		title: '中文',
		dataIndex: 'zh_CN',
		width: '15%',
	},
	{
		title: '操作',
		dataIndex: 'operation',
	},
];



export interface PropertyItem {
	[key: string]: string | boolean | undefined;
	
	context: string;
	holder: string;
	key: string;
	definition: string;
	value: string;
	en_GB: string | undefined;
	en_US: string | undefined;
	zh_CN: string | undefined;
}

const TYPE_PROPERTY_KEYS: string[] = [
	'displayName', 'description', 'tooltip', 'icon', 'instantiable'
]

export const analysisTypeProperty = (typeDef: Type | undefined): PropertyItem[] => {
	const dataSource: PropertyItem[] = [];
	if (!typeDef) {
		return dataSource;
	}
	for (const key of TYPE_PROPERTY_KEYS) {
		const property = getTypeProperty(typeDef, key);
		if (!property) {
			alert('类型属性' + key + '不存在，请查证数据')
			continue;
		}
		dataSource.push({
			context: property.context.displayName,
			holder: property.holder.displayName,
			key: property.definition.type,
			definition: property.definition.toJson(),
			value: property.value,
			en_GB: property.localValue?.en_GB,
			en_US: property.localValue?.en_US,
			zh_CN: property.localValue?.zh_CN
		});
	}
	return dataSource;
}

function getTypeProperty(typeDef: Type, key: string): Property | undefined {
	const property = typeDef.properties.getProperty(key);
	if (property) {
		return property
	}
	if (typeDef.parent) {
		return getTypeProperty(typeDef.parent, key)
	}
	return undefined;
}