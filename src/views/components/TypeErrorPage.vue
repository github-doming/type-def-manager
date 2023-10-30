<template>
    <div>
        <h2>
            {{ messages ? messages : '请选择类型' }}
        </h2>
    </div>
</template>
  
<script lang="ts" setup>
import { defineProps } from 'vue';
defineProps<{
    messages?: string,
}>();
</script>
  
<style></style>
  