<template>
	<div class="category-ratio">
		<div class="category-ratio__header">
			<span>銷售額類別佔比</span>
		</div>

		<div class="category-ratio__container">
			<v-chart :option="chartOption" autoresize />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";

const chartOption = reactive({
	tooltip: {
		trigger: "item",
		formatter: "{a} <br/>{b}: {c} ({d}%)"
	},
	legend: {
		bottom: 30,
		left: "center",
		data: ["手機", "相機", "耳機", "音箱", "手錶"]
	},
	color: ["#3AA1FF", "#36CBCB", "#F2637B", "#975FE5", "#FBD437"],
	series: [
		{
			name: "訪問來源",
			type: "pie",
			radius: ["50%", "60%"],
			center: ["50%", "40%"],
			avoidLabelOverlap: false,
			label: {
				show: false,
				position: "center"
			},
			emphasis: {
				label: {
					show: true,
					fontSize: "30",
					fontWeight: "bold"
				}
			},
			labelLine: {
				show: false
			},
			data: [
				{ value: 335, name: "手機" },
				{ value: 310, name: "相機" },
				{ value: 234, name: "耳機" },
				{ value: 135, name: "音箱" },
				{ value: 500, name: "手錶" }
			],
			itemStyle: {
				borderColor: "#fff",
				borderWidth: 4
			},
			roundCap: 1
		}
	]
});
</script>

<style lang="scss" scoped>
.category-ratio {
	&__header {
		display: flex;
		align-items: center;
		height: 50px;
		font-size: 15px;
		font-weight: bold;
		padding: 0 20px;
	}

	&__container {
		height: 395px;
		padding: 0 20px;
		box-sizing: border-box;

		.echarts {
			width: 100%;
		}
	}
}
</style>
