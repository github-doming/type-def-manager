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

import TypeBaseInfo from "../components/base/TypeBaseInfo.vue";
import TypeInitRule from "../components/base/TypeInitRule.vue";
import {Ref, ShallowRef} from 'vue';
import TypeExpandColumn from "@/views/components/base/TypeExpandColumn.vue";

export function getContentComponent(contentComponent: ShallowRef<object | undefined>, typeOperation: Ref<string>) {
	let component: object = TypeBaseInfo;
	if (typeOperation.value === '基本信息') {
		component = TypeBaseInfo;
	} else if (typeOperation.value === '初始化规则') {
		component = TypeInitRule;
	} else if (typeOperation.value === '模型扩列') {
		component = TypeExpandColumn;
	}
	return contentComponent.value = component;
}