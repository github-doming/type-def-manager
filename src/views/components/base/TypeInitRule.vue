<template>
	<h1>
		初始化规则 - {{ props.type?.displayName }}
	</h1>


</template>

<script lang="ts" setup>
import {defineProps} from 'vue';
import {Type} from "@/views/js/type";

const props = defineProps({
	type: Type,
})

</script>

<style></style>
  