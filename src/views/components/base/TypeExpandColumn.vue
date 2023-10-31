<script setup lang="ts">
import { defineProps } from 'vue';
import { Type } from "../../js/type";
const props  = defineProps({
	type:Type,
})
</script>

<template>
	<h1>
		模型扩列 - {{ props.type?.displayName }}
	</h1>

</template>

<style scoped>

</style>