import {TableColumnType} from "ant-design-vue";
import {Type} from "@/views/js/type";
import {getAttribute, getAttributeProperty} from "@/views/js/type/type-factory-helper";
import {Attribute} from "@/views/js/type/attribute";
import {Property} from "@/views/js/type/property";
import {ref, Ref} from "vue";


export interface PropertyInfoItem {
	[key: string]: string | boolean | undefined;
	
	key: string;
	context: string;
	datatype: string;
	displayName: string;
	displayNameContextKey: string | undefined;
	description: string;
	descriptionContextKey: string | undefined;
}

export function analysisPropertyColumns(filtered: any): TableColumnType[] {
	return [
		{
			title: '内部名称',
			dataIndex: 'key',
			filteredValue: filtered.key || null,
			onFilter: (value: string | number | boolean, record: PropertyInfoItem) => record.key.toLocaleLowerCase().includes(value + ''),
		},
		{
			title: '主体',
			dataIndex: 'context',
			filteredValue: filtered.context || null,
			onFilter: (value: string | number | boolean, record: PropertyInfoItem) => record.context.toLocaleLowerCase().includes(value + ''),
		}, {
			title: '数据类型',
			dataIndex: 'datatype',
			width: '30%',
			filteredValue: filtered.datatype || null,
			onFilter: (value: string | number | boolean, record: PropertyInfoItem) => record.datatype.toLocaleLowerCase().includes(value + ''),
		},
		{
			title: '显示名称',
			dataIndex: 'displayName',
			filteredValue: filtered.displayName || null,
			onFilter: (value: string | number | boolean, record: PropertyInfoItem) => record.displayName.toLocaleLowerCase().includes(value + ''),
		},
		{
			title: '描述',
			dataIndex: 'description',
			filteredValue: filtered.description || null,
			onFilter: (value: string | number | boolean, record: PropertyInfoItem) => record.description.toLocaleLowerCase().includes(value + ''),
		},
	];
}

export const analysisPropertyBaseInfo = (type: Type | undefined): PropertyInfoItem[] => {
	const dataSource: PropertyInfoItem[] = [];
	if (!type) {
		return dataSource;
	}
	for (const key of type.allAttributeKeys()) {
		const attribute = getAttribute(key, type);
		const displayNameProperty = getAttributeProperty('displayName', key, type);
		const descriptionProperty = getAttributeProperty('description', key, type);
		dataSource.push({
			key: attribute.key,
			context: attribute.context.displayName,
			datatype: attribute.datatypeKey,
			displayName: propertyShow(attribute, displayNameProperty),
			displayNameContextKey: displayNameProperty?.context.key,
			description: propertyShow(attribute, descriptionProperty),
			descriptionContextKey: descriptionProperty?.context.key,
		});
	}
	return dataSource;
}


export const propertySelectionMethod = (): {
	propertyRowKeys: Ref<string[]>,
	onSelectionChange: (changeRowKeys: string[]) => void
} => {
	const propertyRowKeys = ref<PropertyInfoItem['key'][]>([]);
	const onSelectionChange = (changeRowKeys: string[]) => {
		console.log('selectedRowKeys changed: ', changeRowKeys);
		propertyRowKeys.value = changeRowKeys;
	}
	return {
		propertyRowKeys, onSelectionChange
	}
};


const propertyShow = (attribute: Attribute, property: Property | undefined): string => {
	if (!property) {
		return attribute.key;
	}
	const show = property.localValue?.zh_CN;
	if (show) {
		return show;
	}
	return attribute.key;
}

