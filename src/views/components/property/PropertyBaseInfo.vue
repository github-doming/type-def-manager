<template>
	<div>
		<h1>
			属性基本信息 - {{ props.type?.displayName }}
		</h1>
		<a-table  :row-selection="rowSelection" :columns="propertyInfoColumns" :data-source="propertyInfoSource" :pagination="false"  :scroll="{ y: 500 }">
		</a-table>

	</div>
</template>

<script lang="ts" setup>
import { defineProps} from 'vue';
import {Type} from "@/views/js/type";
import { computed, ref, unref } from 'vue';
import {analysisPropertyBaseInfo, propertyInfoColumns, PropertyInfoItem} from "@/views/js/TypePropertyHelper";

const props = defineProps({
	type: Type,
})

const propertyInfoSource = computed<PropertyInfoItem[]>(() => {
	return analysisPropertyBaseInfo(props?.type);
})


const selectedRowKeys = ref<PropertyInfoItem['name'][]>([]); // Check here to configure the default column

const onSelectChange = (changeRowKeys: string[]) => {
	console.log('selectedRowKeys changed: ', changeRowKeys);
	selectedRowKeys.value = changeRowKeys;
};

const rowSelection = computed(() => {
	return {
		columnWidth:'50px',
		selectedRowKeys: unref(selectedRowKeys),
		onChange: onSelectChange,
		hideDefaultSelections: true,
	};
});

</script>


<style scoped>

</style>
