<template>
  <div class="page-container">
    <div class="page-header">
      <van-nav-bar title="智能旅游助手" />
    </div>
    <div class="page-content">
      <van-notice-bar
        left-icon="info-o"
        text="基于 AI 的智能旅游助手系统，帮助用户规划旅游路线，提供旅游建议。"
        style="margin-bottom: 16px"
      />
      <div class="card search-card">
        <div class="section-title">规划你的旅游路线</div>
        <van-field
          v-model="formData.city"
          label="目的地"
          is-link
          @click="showPopup = true;"
          readonly
          placeholder="请选择城市"
          style="background: #f7f8fa; border-radius: 8px; margin-bottom: 12px"
        />
         <van-field
          v-model="formData.budget"
          label="预算（元）"
          type="number"
          placeholder="请输入预算金额"
          style="background: #f7f8fa; border-radius: 8px; margin-bottom: 12px"
        />
        <van-field
          v-model="formData.days"
          label="天数"
          type="digit"
          placeholder="请输入天数"
          style="background: #f7f8fa; border-radius: 8px; margin-bottom: 12px"
        />
        <van-button type="primary" size="large" round :loading="isLoading" @click="handleSubmit">开始规划</van-button>
      </div>
      <div class="card"></div>
      <div class="card"></div>
    </div>

    <van-popup v-model:show="showPopup" round position="bottom">
      <van-picker
        title="请选择目的地"
        :columns="cityColumns"
        @confirm="onCityConfirm"
        @cancel="showPopup = false;"
      />
    </van-popup>
  </div>
</template>

<script setup>
import { ref } from "vue";

const showPopup = ref(false);
const formData = ref({
  city: "", // 目的地
  budget: null, // 预算（元）
  days: null, // 天数
});
const allCities = [
  "北京",
  "上海",
  "广州",
  "深圳",
  "成都",
  "杭州",
  "西安",
  "重庆",
  "南京",
  "武汉",
  "苏州",
  "长沙",
  "天津",
  "郑州",
  "济南",
  "青岛",
  "大连",
  "沈阳",
  "哈尔滨",
  "长春",
  "福州",
  "厦门",
  "南昌",
  "合肥",
  "昆明",
  "贵阳",
  "南宁",
  "桂林",
  "海口",
  "三亚",
  "丽江",
  "大理",
  "西安",
  "兰州",
  "乌鲁木齐",
  "拉萨",
  "呼和浩特",
  "太原",
  "石家庄",
];
const isLoading = ref(false);

const cityColumns = allCities.map((city) => ({
  text: city,
  value: city,
}));

const onCityConfirm = ({selectedOptions}) => {
    formData.value.city = selectedOptions[0].value;
    showPopup.value = false;
};
const handleSubmit = () => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 3000);
}
</script>

<style scoped>
.search-card {
  margin-bottom: 16px;
}
</style>
