import {Ref, ShallowRef,reactive} from 'vue';
import type {ItemType} from 'ant-design-vue';
import TypeBaseInfo from "../components/base/TypeBaseInfo.vue";
import TypeInitRule from "../components/base/TypeInitRule.vue";
import TypeExpandColumn from "@/views/components/base/TypeExpandColumn.vue";
import PropertyBaseInfo from "@/views/components/property/PropertyBaseInfo.vue";

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

export const operationItems: ItemType[] = reactive([
	getMenuItem('基础', 'Base', [
		getMenuItem('基本信息', 'BaseInfo'),
		getMenuItem('初始化规则', 'InitRule'),
		getMenuItem('模型扩列', 'ExpandColumn'),
	]),
	
	getMenuItem('属性', 'Property', [
		getMenuItem('属性信息', 'PropertyInfo'),
		getMenuItem('约束', 'Constraints'),
		getMenuItem('默认值', 'DefaultValue'),
		getMenuItem('密级', 'SecretLevel'),
	]),
	getMenuItem('布局', 'Layout'),
]);


export interface ColumnItem {
	title: string;
	dataIndex: string;
	width?: string;
}


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