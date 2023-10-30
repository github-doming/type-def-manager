import {Type} from "@/views/js/type";

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

export interface ColumnItem {
	title: string;
	dataIndex: string;
	width?: string;
}


export interface PropertyItem {
	[key: string]: string | boolean | undefined;
	
	context: string;
	key: string;
	value: string;
	en_GB: string | undefined;
	en_US: string | undefined;
	zh_CN: string | undefined;
}

export const analysisTypeProperty = (typeDef: Type | undefined): PropertyItem[] => {
	const dataSource: PropertyItem[] = [];
	if (!typeDef) {
		return dataSource;
	}
	const properties = typeDef.properties;
	if (!properties) {
		return dataSource;
	}
	for (const property of properties) {
		dataSource.push({
			context: property.context.name,
			key: property.definition.type,
			value: property.value,
			en_GB: property.localValue?.en_GB,
			en_US: property.localValue?.en_US,
			zh_CN: property.localValue?.zh_CN
		});
	}
	
	return dataSource;
}