<script setup lang="ts">
import { Header } from '@/widgets/Header'
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Header />
    <router-view />
  </div>
</template>