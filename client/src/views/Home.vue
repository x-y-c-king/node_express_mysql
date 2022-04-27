
<script lang="ts" setup>
import { xdJsbridge } from 'wnl-xdsdk'
function jumpVip() {
	xdJsbridge.invokeAction({
		command: 'jumpPage',
		args: {
			scheme: 'ylcloser://vipPurchase',
		},
	})
}
</script>

<template>
	<el-button type="primary" @click="jumpVip">Primary</el-button>
</template>

<style lang="scss" scoped>
</style>