<template>
    <a-layout-footer>
        <a-col :span="8" :offset="16">
            <a-space>
                <a-button>加载</a-button>
                <a-upload accept=".json" :max-count="1" :show-upload-list="false" :before-upload="uploadType">
                    <a-button type="dashed" shape="round">
                        <upload-outlined />
                        打开
                    </a-button>
                </a-upload>
                <a-button danger shape="round" :icon="h(DownloadOutlined)" @click="saveType">保存</a-button>
                <a-button type="primary">确认</a-button>
            </a-space>
        </a-col>
    </a-layout-footer>
</template>
  
<script lang="ts" setup>

import { defineEmits, h, } from 'vue';
import type { UploadProps } from 'ant-design-vue';
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons-vue';


const optionEmit = defineEmits<{
    'uploadTypes': [typeInfo: any]
    'saveTypes': []
}>()

const uploadType: UploadProps['beforeUpload'] = file => {
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
        let json = JSON.parse(reader.result as string);
        optionEmit('uploadTypes', json['typeInfo']);
    }
    return false;
};
const saveType = () => {
		optionEmit('saveTypes');
}

</script>
  
<style></style>
  