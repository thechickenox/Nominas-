<script lang="ts" setup>
import useDrawer from '@/stores/Logic'
import { useRouter } from 'vue-router'
const router = useRouter()
//Logica para el funcionamiento del Sidebar
const { drawer, rail, toggleRail } = useDrawer()

const sidebarData = [
  {
    title: 'Dashboard',
    icon: new URL('../../assets/icons/home.png', import.meta.url),
    link: '/dashboard'
  },
  {
    title: 'Empleados',
    icon: new URL('../../assets/icons/employees.png', import.meta.url),
    link: '/Employees'
  },
  {
    title: 'Nomina',
    icon: new URL('../../assets/icons/payroll.png', import.meta.url),
    link: '/payroll'
  },
  {
    title: 'Permisos',
    icon: new URL('../../assets/icons/permits.png', import.meta.url),
    link: '/permits'
  },
  {
    title: 'Ajustes',
    icon: new URL('../../assets/icons/settings.png', import.meta.url),
    link: '/settings'
  }
]
function redirectTo(query: string) {
  router.push(query)
}
</script>
<template>
  <div class="side" :class="rail ? 'open':'closed'" @mouseenter="toggleRail(true)" @mouseleave="toggleRail(false)">
    <div class="title">
      <img src="../../assets/icons/logo.png" alt="">
      <span>Planner Pay</span>
    </div>
    <div class="menu">
      <div
        class="list-item"
        v-for="item in sidebarData"
        :key="item.title"
        @click="redirectTo(item.link)"
      >
        <div class="list-icon">
          <img :src="item.icon" alt="" />
        </div>
        <div class="list-title">
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.side{

  z-index: 9999;
    width: 190px;
    height: 100vh;
    padding: 1rem;
    background: var(--primary-low-color);
    padding-top: 1rem;
    transition: all 1s ease;
    &.closed{
      transition: all 1s ease;
      width: fit-content;
      .list-item{
        justify-content: center;
        width: fit-content !important;
      }
      .title{
        img{
          width: 50px;
        }
        span{
          display: none;
        }
      }
      .menu{
        justify-content: center;
        align-items: center;
        .list-title{
          display: none;
          
        }
      }
    }
    .layout{
      transition: all 0.3s ease;
      width: 100%;
      height: 100vh;
    }
    .title{
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      color: #fff;
      margin-bottom: 2rem;
    }
    .menu{
      transition: all .4s ease;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
      .list-item{
        transition: all .4s ease;
        display: flex;
        align-items: center;
        gap: .8rem;
        width: 100%;
        padding: .3rem;
        padding-left: .4rem;
        border-radius: .3rem;
        cursor: pointer;
        &:hover{
          background: var(--primary-color);
        }
        .list-icon{
          width: 1rem;
          height: 1rem;
          img{
            width: 1rem;
            height: 1rem;
          }
        }
        .list-title{
          font-size: .8rem;
          color: #fff;
        }
      }
    }
  }
</style>
