<script setup lang="ts">
import { Header } from '@/widgets/Header'
import { useCurrencyStore } from '@/app/providers/store'
import { onMounted } from 'vue'
const store = useCurrencyStore()

onMounted(() => {
  store.fetchRates()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Header />
    <router-view />
  </div>
</template>
