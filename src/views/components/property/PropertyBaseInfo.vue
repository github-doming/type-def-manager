<template>
	<div>
		<a-space style="margin-bottom: 8px">
			<a-button>
				编辑
			</a-button>
			<a-input
				v-model:value="searchValue" placeholder="input search text"
				style="width: 250px" @change="searchProperty">
				<template #addonAfter>
					<a-select
						v-model:value="searchContext" :options="searchSelectOptions"
						style="width: 100px" @change="searchContextChange"
					/>
				</template>
			</a-input>
		</a-space>
		<a-table
			:row-selection="{columnWidth: '50px',onChange: onSelectionChange}" :columns="propertyInfoColumns"
			:data-source="propertyInfoSource"
			:pagination="false" :scroll="{ y: 500 }">
			<template #bodyCell="{ column, text,record}">
				<template v-if="showFromParent(column,record,type?.key)">
					<a-popover>
						<template #content>
							<p>{{ showContext(column, record, dataSet) }}</p>
						</template>
						<ToTopOutlined/>
						{{ text }}
					</a-popover>
				</template>
			</template>
		</a-table>
	
	</div>
</template>

<script lang="ts" setup>
import {computed, defineProps} from 'vue';
import {Type, TypeDataSet} from "@/views/js/type";
import {ToTopOutlined} from '@ant-design/icons-vue';
import {TableColumnType} from "ant-design-vue";
import {
	analysisPropertyBaseInfo,
	analysisPropertyColumns,
	PropertyInfoItem,
	selectionOptions, searchOptions, showOptions,
} from "@/views/js/property/base-info-helper";

const props = defineProps({
	type: Type,
	dataSet: TypeDataSet,
})
const propertyInfoSource = computed<PropertyInfoItem[]>(() => {
	return analysisPropertyBaseInfo(props?.type);
})


const propertyInfoColumns = computed<TableColumnType[]>(() => {
	const filtered = filteredInfo.value || {};
	return analysisPropertyColumns(filtered);
})

const {propertyRowKeys, onSelectionChange} = selectionOptions();
const {
	filteredInfo,
	searchValue,
	searchContext,
	searchSelectOptions,
	searchProperty,
	searchContextChange
} = searchOptions();

const {showFromParent, showContext} = showOptions();






</script>


<style scoped>

</style>
