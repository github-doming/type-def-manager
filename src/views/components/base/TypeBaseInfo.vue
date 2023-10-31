<template>
	<div>
		<h1>
			基本信息 - {{ props.type?.displayName }}
		</h1>
		<a-table bordered :data-source="propertySource" :columns="propertyColumns" :pagination="false">
			<template #bodyCell="{ column, text, record }">
				<template v-if="canEditCell(column,record)">
					<div>
						<a-input
							v-if="isInputCell(column,record)"
							v-model:value="editableData[record.key][column.dataIndex]"
							style="margin: -5px 0"
						/>
						<a-radio-group
							v-else-if="isBooleanCell(column,record)"
							v-model:value="editableData[record.key][column.dataIndex]">
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
import {propertyColumns, analysisTypeProperty, PropertyItem} from "@/views/js/TypeBaseHelper";
import {Type} from "@/views/js/type";
import {Definition, LocalValue, Property} from "@/views/js/type/property";
import {ColumnItem} from "@/views/js/TypeDefHelper";

const props = defineProps({
	type: Type,
})


const propertySource = computed<PropertyItem[]>(() => {
	return analysisTypeProperty(props?.type);
});


const editableData: UnwrapRef<Record<string, PropertyItem>> = reactive({});
const edit = (key: string) => {
	const source = propertySource.value.filter(item => key === item.key)[0];
	editableData[key] = Object.assign({}, source);
	if (props.type) {
		editableData[key].context = props.type?.displayName;
		editableData[key].holder = props.type?.displayName;
	}
};
const save = (key: string) => {
	Object.assign(propertySource.value.filter(item => key === item.key)[0], editableData[key]);
	if (!props.type) {
		delete editableData[key];
		return;
	}
	let property = props.type.properties.getProperty(key);
	if (!property) {
		const definition = new Definition(editableData[key].definition);
		property = new Property(props.type, props.type, definition, "true");
		props.type.properties.setProperty(property);
	}
	property.value = editableData[key].value + '';
	if (editableData[key].en_GB || editableData[key].en_US || editableData[key].zh_CN) {
		if (!property.localValue) {
			property.localValue = new LocalValue(undefined);
		}
		property.localValue.en_GB = editableData[key].en_GB;
		property.localValue.en_US = editableData[key].en_US;
		property.localValue.zh_CN = editableData[key].zh_CN;
	}
	delete editableData[key];
};
const cancel = (key: string) => {
	delete editableData[key];
};

const canEditCell = (column: ColumnItem, record: PropertyItem): boolean => {
	let index = column.dataIndex;
	if (['context', 'key', 'holder', 'operation'].includes(index)) {
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
