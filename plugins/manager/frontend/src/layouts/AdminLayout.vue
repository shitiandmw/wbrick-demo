<template>
  <a-layout class="w-full h-full">
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      class="group shadow-lg shadow-gray-300 relative"
      collapsible
      width="300px"
      breakpoint="sm"
    >
      <div
        class="logo bg-bmprimary h-16 text-white flex items-center justify-center text-xl space-x-2 overflow-hidden"
      >
        <img src="@/assets/vue.svg" class="w-8" /><span
          class="truncate group-[.ant-layout-sider-collapsed]:hidden"
          >商城</span
        >
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-sub-menu key="sub1">
            <template #title>
              <span>
                <user-outlined />
                subnav 1
              </span>
            </template>
            <a-menu-item key="1">option1</a-menu-item>
            <a-menu-item key="2">option2</a-menu-item>
            <a-menu-item key="3">option3</a-menu-item>
            <a-menu-item key="4">option4</a-menu-item>
          </a-sub-menu>
        <a-menu-item key="2">
         <div class="flex items-center">  <video-camera-outlined />
          <span>nav 2</span></div>
        </a-menu-item>
        <a-menu-item key="3">
          <div class="flex items-center"> <upload-outlined />
          <span>nav 3</span></div>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <div class="flex flex-1 flex-col">
      <div
        class="h-18 bg-white w-full px-4 pl-6 flex items-center shadow-lg shadow-gray-200 relative justify-between"
      >
        <div class="flex -translate-y-1">
          <menu-unfold-outlined
            v-if="collapsed"
            class="text-xl hover:text-primary"
            @click="() => (collapsed = !collapsed)"
          />
          <menu-fold-outlined
            v-else
            class="text-xl hover:text-primary"
            @click="() => (collapsed = !collapsed)"
          />
        </div>
        <div class="flex items-center">
          <HeadUserCard></HeadUserCard>
        </div>
      </div>
      <slot></slot>
    </div>
  </a-layout>
</template>
<script setup>
import { ref } from "vue";
import { UserOutlined, VideoCameraOutlined,UploadOutlined, MenuUnfoldOutlined ,  MenuFoldOutlined , DisconnectOutlined, SettingOutlined } from "@ant-design/icons-vue";
import HeadUserCard from '@/components/HeadUserCard.vue'
const selectedKeys = ref(["1"]);
const collapsed = ref(false);
</script>
<style scoped>
.ant-menu-item {
  width: 100% !important; margin: 0 !important; border-radius: 0 !important;
}
</style>