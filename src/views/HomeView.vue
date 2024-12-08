<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import { getAllPermits } from '@/services/FirestoreFunctions'

getAllPermits()

</script>

<template>
  <div class="container">
    <TheWelcome />
    <h1>jkdasdk</h1>
  </div>
</template>
<style lang="scss">
    
</style>