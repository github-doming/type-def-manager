<template>
  <a-layout>
    <TypeHomeHeader v-model:select-type="selectType" :typeDefs="typeDefs" />
    <TypeHomeContent v-model:selected-operation="typeOperation" v-model:selected-menu="typeMenu">
      <component :is="contentComponent" :typeDef="typeDef"></component>
    </TypeHomeContent>
    <TypeHomeFooter @upload-types="uploadTypes" @save-types="saveTypes"></TypeHomeFooter>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref, shallowRef, watch, computed } from 'vue';
import { Type } from "@/views/js/type";
import { getContentComponent } from "@/views/js/TypeDefHelper";

import TypeHomeHeader from './TypeHomeHeader.vue'
import TypeHomeContent from './TypeHomeContent.vue';
import TypeHomeFooter from './TypeHomeFooter.vue'
import TypeErrorPage from '@/views/components/TypeErrorPage.vue'


const typeOperation = ref<string>('基本信息');
const typeMenu = ref<string>('基础');
const selectType = ref<string>('');
const typeDefs = ref<Type[]>([]);

const contentComponent = shallowRef<object>(TypeErrorPage);

const typeDef = computed(() => {
  for (const item of typeDefs.value) {
    if (item.key === selectType.value) {
      return item;
    }
  }
  return null;
});

watch(typeOperation, () => getContentComponent(contentComponent, typeOperation));


const uploadTypes = (typeInfo: any) => {
  changeType();
  for (const key in typeInfo) {
    //只有在没有赋值type的时候，才会选择第一个
    if (!selectType.value) {
      selectType.value = key;
    }
    let typeDef = new Type(key, typeInfo[key]);
    typeDefs.value.push(typeDef);
  }
}

const saveTypes = () => {
	const jsonResult:any = {};
	for (const type of typeDefs.value) {
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
  typeDefs.value.length = 0;
  selectType.value = '';
}

</script>

<style scoped></style>