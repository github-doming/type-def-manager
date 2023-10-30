<template>
    <a-layout>
        <a-layout-sider width="200">
            <a-menu id="type_operation" mode="inline" :items="operationItems" v-model:selectedKeys="selectedKeys"
                v-model:openKeys="openKeys" :style="{ height: '101%', borderRight: 0 }"></a-menu>
        </a-layout-sider>
        <a-layout style="padding: 0 24px 24px">
            <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '450px' }">
                <slot></slot>

            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
  
<script lang="ts" setup>

import { computed, defineProps, defineEmits, reactive, ref } from 'vue';
import type { ItemType } from 'ant-design-vue';
import { getMenuItem } from "../views/js/TypeDefHelper";

const props = defineProps<{
    selectedOperation: string,
    selectedMenu: string,
}>();


const updateEmit = defineEmits<{
    'update:selectedOperation': [keys: string],
    'update:selectedMenu': [keys: string]
}>()


const selectedKeys = computed<string[]>({
    get: () => [props.selectedOperation],
    set: (keys) => {
        updateEmit('update:selectedOperation', keys[0]);
    }
})
const openKeys = computed<string[]>({
    get: () => [props.selectedMenu],
    set: (keys) => {
        updateEmit('update:selectedMenu', keys[0]);
    }
})




const operationItems: ItemType[] = reactive([
    getMenuItem('基础', '基础', [
        getMenuItem('基本信息', '基本信息'),
        getMenuItem('初始化规则', '初始化规则'),
        getMenuItem('模型扩列', '模型扩列'),
    ]),

    getMenuItem('属性', '属性', [
        getMenuItem('属性信息', '属性信息'),
        getMenuItem('约束', '约束'),
        getMenuItem('默认值', '默认值'),
        getMenuItem('密级', '密级'),
    ]),
    getMenuItem('布局', '布局'),
]);

</script>
  
<style></style>
  