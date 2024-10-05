<template>
	<div class="reaction" ref="reaction">
		<button class="reaction_menu">
			<svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click="isMenu = !isMenu"><path d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1z" fill="#0D0D0D" /></svg>
			<ul :class="{ reaction_menu_emoji_list: true, reaction_menu_emoji_list_show: isMenu }">
				<li v-for="(item, index) in emojiList" :key="index" class="reaction_menu_emoji_list_item" @click="clickEmoji(item)">
					<img :src="`${emojiRequest}${item}.png`" :alt="item" />
				</li>
			</ul>
		</button>
		<ul class="reaction_list">
			<li :class="{ reaction_list_item: true, userClick: judgeUserClick(item.emoji) }" v-for="(item, index) in reactionList" :key="index" @click="clickEmoji(item)">
				<img :src="`${emojiRequest}${item.emoji}.png`" :alt="item" />
				<span>{{ item.emoji_count }}</span>
			</li>
		</ul>
	</div>
</template>

<script>
import axios from "axios";

export default {
	props: ["emojiListPath", "emojiRequest", "id", "request"],
	data() {
		return {
			// 所有emoji
			emojiList: [],
			// 哪些emoji被激活了
			reactionList: [],
			// 用户激活的emoji
			userClick: null,

			// 显示所有的emoji
			isMenu: false,
		};
	},
	methods: {
		// 获取所有的emoji
		async getEmojiList() {
			try {
				const res = await axios.get(this.emojiListPath);
				this.emojiList = res.data;
			} catch (error) {
				console.error("获取Emoji列表出错" + error);
			}
		},
		// 获取被激活的emoji
		async getReaction() {
			try {
				const res = await axios.get(`${this.request}/reaction/getReaction`, {
					params: {
						id: this.id,
					},
				});
				this.reactionList = res.data.reaction;
				if (res.data.userClick.length != 0) {
					this.userClick = res.data.userClick[0].user_click;
				}
			} catch (error) {
				console.error("获取文章emoji列表出错:" + error);
			}
		},
		// 判断当前emoji是否为用户选择的
		judgeUserClick(emoji) {
			return this.userClick === emoji ? true : false;
		},
		// 关闭emoji菜单
		closeEmojiMenu(event) {
			// 检查点击的元素是否在弹窗内
			if (this.$refs.reaction && !this.$refs.reaction.contains(event.target) && this.isMenu) {
				this.isMenu = false;
			}
		},
		// 点击emoji
		async clickEmoji(emoji) {
			let userClickEmoji;
			if (typeof emoji === "object") {
				// 如果是对象, 说明点击的是reaction列表的, 需要提取emoji
				userClickEmoji = emoji.emoji;
			} else {
				// 如果不是对象, 说明点击的是emoji菜单的;
				userClickEmoji = emoji;
			}

			let type;
			if (userClickEmoji === this.userClick) {
				type = "del";
			} else {
				type = "add";
			}

			try {
				const res = await axios.post(`${this.request}/reaction/userClickEmoji`, {
					id: this.id,
					emoji: userClickEmoji,
					type: type,
				});
				this.userClick = this.userClickEmoji;
				this.getReaction();
			} catch (error) {
				console.error(error);
			}
		},
	},
	mounted() {
		this.getEmojiList();
		this.getReaction();
		window.addEventListener("click", this.closeEmojiMenu);
	},
	beforeDestroy() {
		window.removeEventListener("click", this.closeEmojiMenu);
	},
};
</script>

<style lang="scss" scoped>
@import url("@/assets/reaction.scss");
</style>
