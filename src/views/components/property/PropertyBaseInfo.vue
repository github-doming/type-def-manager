<template>
	<div>
		<a-space style="margin-bottom: 8px">
			<a-button>
				编辑
			</a-button>
			<a-input
				v-model:value="searchValue"
				placeholder="input search text"
				style="width: 250px"
				@change="propertySearch">
				<template #addonAfter>
					<a-select v-model:value="searchContext" style="width: 100px">
						<a-select-option value="key">内部名称</a-select-option>
						<a-select-option value="context">主体</a-select-option>
						<a-select-option value="datatype">数据类型</a-select-option>
						<a-select-option value="displayName">显示名称</a-select-option>
						<a-select-option value="description">描述</a-select-option>
					</a-select>
				</template>
			</a-input>
		</a-space>
		<a-table
			:row-selection="{columnWidth: '50px',onChange: onSelectionChange}" :columns="propertyInfoColumns"
			:data-source="propertyInfoSource"
			:pagination="false" :scroll="{ y: 500 }">
			<template #bodyCell="{ column, text,record}">
				<template v-if="showFromParent(column,record)">
					<a-popover>
						<template #content>
							<p>{{ fromContext(column, record) }}</p>
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
import {computed, defineProps, ref} from 'vue';
import {Type, TypeDataSet} from "@/views/js/type";
import {ColumnItem} from "@/views/js/TypeDefHelper";
import {ToTopOutlined} from '@ant-design/icons-vue';
import {TableColumnType} from "ant-design-vue";
import {
	analysisPropertyBaseInfo,
	analysisPropertyColumns,
	PropertyInfoItem,  propertySelectionMethod
} from "@/views/js/type/base-info-helper";

const props = defineProps({
	type: Type,
	dataSet: TypeDataSet,
})

const filteredInfo = ref();
const searchValue = ref<string>();
const searchContext = ref<string>('key');

const propertyInfoSource = computed<PropertyInfoItem[]>(() => {
	return analysisPropertyBaseInfo(props?.type);
})


const propertyInfoColumns = computed<TableColumnType[]>(() => {
	const filtered = filteredInfo.value || {};
	return analysisPropertyColumns(filtered);
})

const {propertyRowKeys, onSelectionChange} = propertySelectionMethod();


const propertySearch = () => {
	filteredInfo.value = {};
	filteredInfo.value[searchContext.value] = [searchValue.value?.toLocaleLowerCase()];
}


const showFromParent = (column: ColumnItem, record: PropertyInfoItem): boolean => {
	if (!['displayName', 'description'].includes(column.dataIndex)) {
		return false
	}
	const contextKey = record[column.dataIndex + 'ContextKey'];
	if (contextKey) {
		return contextKey != props.type?.key;
	}
	return false
}

const fromContext = (column: ColumnItem, record: PropertyInfoItem) => {
	const contextKey = record[column.dataIndex + 'ContextKey'] + '';
	return props.dataSet?.getType(contextKey)?.displayName
}


</script>


<style scoped>

</style>
