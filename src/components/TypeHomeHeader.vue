<template>
	<a-tabs type="card" :style="{ minHeight: '55.6px' }" v-model:activeKey="activeType">
		<a-tab-pane v-for="item in typeItems" :key="item?.key" :tab="item.label"></a-tab-pane>
	</a-tabs>
</template>

<script lang="ts" setup>
import {computed, defineProps, defineEmits} from 'vue';
import {TypeDataSet} from "@/views/js/type";

interface TabItem {
	key: string;
	label: string | undefined;
}


const props = defineProps<{
	selectType: string
	dataSet?: TypeDataSet
}>();

const updateEmit = defineEmits<{
	'update:selectType': [type: string]
}>()

const typeItems = computed<TabItem[]>(() => {
	let items: TabItem[] = [];
	if (!props.dataSet) {
		return items;
	}
	for (const item of props.dataSet.values()) {
		items.push({key: item.key, label: item.name});
	}
	return items;
});

const activeType = computed({
	get: () => props.selectType,
	set: (type) => {
		updateEmit('update:selectType', type);
	}
})


</script>

<style></style>
  