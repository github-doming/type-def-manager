import type {ItemType} from 'ant-design-vue';

export function getMenuItem(
	label: string,
	key: string,
	children?: ItemType[],
	type?: 'group',
): ItemType {
	return {
		key,
		children,
		label,
		type,
	} as ItemType;
}


export interface ColumnItem {
	title: string;
	dataIndex: string;
	width?: string;
	fixed?: string;
	children?: ColumnItem[]
}

import {Ref, ShallowRef} from 'vue';
import TypeBaseInfo from "../components/base/TypeBaseInfo.vue";
import TypeInitRule from "../components/base/TypeInitRule.vue";
import TypeExpandColumn from "@/views/components/base/TypeExpandColumn.vue";
import PropertyBaseInfo from "@/views/components/property/PropertyBaseInfo.vue";

export function getContentComponent(contentComponent: ShallowRef<object | undefined>, typeOperation: Ref<string>) {
	let component: object = TypeBaseInfo;
	if (typeOperation.value === 'BaseInfo') {
		component = TypeBaseInfo;
	} else if (typeOperation.value === 'InitRule') {
		component = TypeInitRule;
	} else if (typeOperation.value === 'ExpandColumn') {
		component = TypeExpandColumn;
	} else if (typeOperation.value === 'PropertyInfo') {
		component = PropertyBaseInfo;
	}
	return contentComponent.value = component;
}