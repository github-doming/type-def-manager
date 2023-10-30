<template>
	<div>
		<h1>
			基本信息 - {{ props.typeDef?.name }}
		</h1>
		<a-table bordered :data-source="propertySource" :columns="propertyColumns">
			<template #bodyCell="{ column, text, record }">
				<template v-if="canEditCell(column,record)">
					<div>
						<a-input
								v-if="isInputCell(column,record)"
								v-model:value="editableData[record.key][column.dataIndex]"
								style="margin: -5px 0"
						/>
						<a-radio-group v-else-if="isBooleanCell(column,record)" v-model:value="editableData[record.key][column.dataIndex]">
							<a-radio :value="true">true</a-radio>
							<a-radio :value="false">false</a-radio>
						</a-radio-group>
						<template v-else>
							{{ text }}
						</template>
					</div>
				</template>
				<template v-else-if="column.dataIndex === 'operation'">
					<div class="editable-row-operations">
          <span v-if="editableData[record.key]">
            <a-typography-link @click="save(record.key)">Save</a-typography-link>
            <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.key)">
              <a>Cancel</a>
            </a-popconfirm>
          </span>
						<span v-else>
            <a @click="edit(record.key)">Edit</a>
          </span>
					</div>
				</template>
			</template>
		</a-table>
	</div>
</template>

<script lang="ts" setup>
import {computed, defineProps, reactive, UnwrapRef} from 'vue';
import {propertyColumns, analysisTypeProperty, PropertyItem, ColumnItem} from "@/views/js/TypeBaseHelper";
import {Type, Property, LocalValue} from "@/views/js/type";

const props = defineProps({
	typeDef: Type,
})


const propertySource = computed<PropertyItem[]>({
	get: () => {
		return analysisTypeProperty(props?.typeDef);
	},
	set: (keys) => {
		console.log(1222354, keys);
		debugger
	}
})


const editableData: UnwrapRef<Record<string, PropertyItem>> = reactive({});
const edit = (key: string) => {
	editableData[key] = Object.assign({}, propertySource.value.filter(item => key === item.key)[0]);
};
const save = (key: string) => {
	Object.assign(propertySource.value.filter(item => key === item.key)[0], editableData[key]);
	if (!props.typeDef || !props.typeDef.properties) {
		delete editableData[key];
		return;
	}
	for (const property of props.typeDef?.properties) {
		if (property.definition.type === key) {
			property.value = editableData[key].value + '';
			if (editableData[key].en_GB || editableData[key].en_US || editableData[key].zh_CN) {
				if (!property.localValue) {
					property.localValue = new LocalValue(undefined);
				}
				property.localValue.en_GB = editableData[key].en_GB;
				property.localValue.en_US = editableData[key].en_US;
				property.localValue.zh_CN = editableData[key].zh_CN;
			}
		}
	}
	delete editableData[key];
};
const cancel = (key: string) => {
	delete editableData[key];
};

const canEditCell = (column: ColumnItem, record: PropertyItem): boolean => {
	let index = column.dataIndex;
	if (['context', 'key', 'operation'].includes(index)) {
		return false
	}
	if (['value'].includes(index)) {
		return true
	}
	return ['displayName', 'description', 'tooltip'].includes(record.key);
}


const isInputCell = (column: ColumnItem, record: PropertyItem): boolean => {
	let datum: PropertyItem = editableData[record.key];
	if (!datum) {
		return false;
	}
	return typeof (datum[column.dataIndex]) != "boolean";
}
const isBooleanCell = (column: ColumnItem, record: PropertyItem): boolean => {
	let datum: PropertyItem = editableData[record.key];
	if (!datum) {
		return false;
	}
	return typeof (datum[column.dataIndex]) == "boolean";
}
</script>


<style scoped>
.editable-row-operations a {
	margin-right: 8px;
}
</style>
