import {ColumnItem} from "@/views/js/TypeDefHelper";
import {Type} from "@/views/js/type";
import {PropertyItem} from "@/views/js/TypeBaseHelper";

export const propertyInfoColumns: ColumnItem[] = [
	{
		title: '内部名称',
		dataIndex: 'name',
	},
	{
		title: '主体',
		dataIndex: 'context',
	},	{
		title: '数据类型',
		dataIndex: 'datatype',
		width: '30%',
	},
	{
		title: '显示名称',
		dataIndex: 'displayName',
		width: '20%',
	},
	{
		title: '描述',
		dataIndex: 'description',
		width: '20%',
	}
];

export interface PropertyInfoItem {
	[key: string]: string | boolean | undefined;
	
	name : string;
	context: string;
	datatype: string;
	displayName: string;
	description: string;
}



export const analysisPropertyBaseInfo = (type: Type | undefined): PropertyInfoItem[] => {
	const dataSource: PropertyInfoItem[] = [];
	if (!type) {
		return dataSource;
	}
	for (const attribute of type.attributes.values()) {
		dataSource.push({
			name: attribute.name,
			context: attribute.context.displayName,
			datatype: attribute.datatypeKey,
			displayName: attribute.displayName,
			description: attribute.description,
		});
	}
	
	
	// type.attributes

	return dataSource;
}