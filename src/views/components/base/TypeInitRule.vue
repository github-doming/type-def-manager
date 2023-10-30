<template>
    <h1>
        初始化规则 - {{  props.typeDef?.name }}
    </h1>


</template>
  
<script lang="ts" setup>
import { defineProps } from 'vue';
import { Type } from "../../js/type";
const props  = defineProps({
    typeDef:Type,
})

</script>
  
<style></style>
  