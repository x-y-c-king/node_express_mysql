
<script lang="ts" setup>
import { reactive, ref } from 'vue'
const state = reactive({
	name: '',
	password: '',
})

const form = ref({
	name: '',
	password: '',
})
</script>

<template>
	<div class="login-box">
		<div class="login-continer">
			<el-form label-width="100px" :model="form">
				<el-form-item label="用户名">
					<el-input v-model="form.name" placeholder="请输入内容" style="width: 300px"></el-input>
				</el-form-item>
				<el-form-item label="密码">
					<el-input v-model="form.password" placeholder="请输入内容" show-password style="width: 300px"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" style="width: 100%;">登录</el-button>
				</el-form-item>

			</el-form>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.login-box {
	width: 100%;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #409eff;

	.login-continer {
		padding-top: 30px;
		width: 420px;
		height: 420px;
		background-color: white;
		border-radius: 10px;
	}
}
</style>