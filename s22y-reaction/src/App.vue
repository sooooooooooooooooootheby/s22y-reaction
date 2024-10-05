<template>
	<div class="main">
		<img src="/sotheby.jpg" alt="head" class="head" />
		<a href="https://github.com/sooooooooooooooooootheby/sooo-reaction?tab=readme-ov-file" target="_blank">Github view</a>
		<reaction :emojiListPath="'/emoji.json'" :emojiRequest="'https://cos.sooooooooooooooooootheby.top/emoji/'" :id="0" :request="'http://192.168.31.111:4000'" />
	</div>
</template>

<script setup>
import reaction from "./components/reaction.vue";
</script>

<style scoped>
.main {
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

img {
	width: 200px;
}

a {
	margin: 24px 0;
	padding: 10px 12px;
	border: 1px solid #dcdfe6;
	border-radius: 999px;
	transition: 0.2s;
	text-decoration: none;
	color: #3c3c43;
}
</style>
