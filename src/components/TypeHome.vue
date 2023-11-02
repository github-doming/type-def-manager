<template>
	<a-layout>
		<TypeHomeHeader v-model:select-type="selectType" :dataSet="dataSet"/>
		<TypeHomeContent v-model:selected-operation="typeOperation" v-model:selected-menu="typeMenu">
			<component :is="contentComponent" :type="dataSet.getType(selectType)" :dataSet="dataSet"></component>
		</TypeHomeContent>
		<TypeHomeFooter @upload-types="uploadTypes" @save-types="saveTypes"></TypeHomeFooter>
	</a-layout>
</template>

<script lang="ts" setup>
import {ref, shallowRef, watch} from 'vue';
import {TypeDataSet} from "@/views/js/type";
import {getContentComponent} from "@/views/js/TypeDefHelper";

import TypeHomeHeader from './TypeHomeHeader.vue'
import TypeHomeContent from './TypeHomeContent.vue';
import TypeHomeFooter from './TypeHomeFooter.vue'
import TypeErrorPage from '@/views/components/TypeErrorPage.vue'
import {analysisTypeInfo} from "@/views/js/type/type-factory-helper";


const typeOperation = ref<string>('PropertyInfo');
const typeMenu = ref<string>('Property');
const selectType = ref<string>('');
const dataSet = ref<TypeDataSet>(new TypeDataSet);

const contentComponent = shallowRef<object>(TypeErrorPage);

watch(typeOperation, () => getContentComponent(contentComponent, typeOperation));


const uploadTypes = (jsonData: any) => {
	changeType();
	//循环加载所有类型信息
	for (const key in jsonData) {
		analysisTypeJsonData(key, jsonData);
	}
	//只有在没有赋值type的时候，才会选择第一个
	selectType.value = dataSet.value.topType.key;
}

const saveTypes = () => {
	const jsonResult: any = {};
	for (const type of dataSet.value.values) {
		jsonResult[type.key] = type.toJson();
	}
	let jsonContent = JSON.stringify({'typeInfo': jsonResult});
	console.log("typeDefJson", jsonContent);

	let fileName = 'type_manager_export.json';

	const element = document.createElement('a')
	element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(jsonContent))
	element.setAttribute('download', fileName)
	element.style.display = 'none'
	element.click()
}

const changeType = () => {
	getContentComponent(contentComponent, typeOperation)
	dataSet.value.clear();
	selectType.value = '';
}

const analysisTypeJsonData = (key: string, jsonData: any) => {
	//已经加载则跳出
	if (dataSet.value.hasType(key)) {
		return;
	}
	let parent = jsonData[key]['parent'];
	//递归获取父级
	if (parent) {
		analysisTypeJsonData(parent, jsonData);
	}
	analysisTypeInfo(jsonData[key],dataSet.value);
}


</script>

<style scoped></style>