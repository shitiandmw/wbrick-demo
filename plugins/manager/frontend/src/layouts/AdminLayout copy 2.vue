<template>
    <div class=" w-full h-full flex">
     <div class="w-80 h-full shadow-md shadow-gray-500 bg-slate-800"></div>
     <div class=" h-full shadow-md flex-1 flex flex-col">
        <div class="h-18 w-full shadow-md shadow-gray-200 relative"></div>
        <div class=" bg-slate-50 flex-1 w-full"> </div>
     </div>
    </div>
   </template>
   <script setup>
   import { ref } from "vue";
   import { UserOutlined, VideoCameraOutlined,UploadOutlined, MenuUnfoldOutlined ,  MenuFoldOutlined , DisconnectOutlined, SettingOutlined } from "@ant-design/icons-vue";
   import HeadUserCard from '@/components/HeadUserCard.vue'
   const selectedKeys = ref(["1"]);
   const collapsed = ref(false);
   </script>