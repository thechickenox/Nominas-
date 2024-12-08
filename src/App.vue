<script setup lang="ts">
import NavbarComponent from '@/components/assets/NavbarComponent.vue';
import { computed, ref, type Ref } from 'vue';
import { RouterView, useRoute } from 'vue-router'
import SidebarComponent from './components/assets/SidebarComponent.vue';
const route = useRoute();

let isLoginPage = ref(false);
let pathFinalValue: any = ref('Dashboard');

function getRoute() {
  const path = computed(() => route.path)
  let stringPath = path.value.toString()
  let pathValue: Ref<any> = ref()
  switch (stringPath) {
    case '/dashboard':
    pathFinalValue.value = 'Dashboard'
      isLoginPage.value = false;
      pathValue.value = [{
        title: 'Dashboard',
        disabled: false,
        href: '/dashboard',
      },]
      break;
    case '/Employees':
    pathFinalValue.value = 'Empleados'
      isLoginPage.value = false;
      pathValue.value = [{
        title: 'Empleados',
        disabled: false,
        href: '/Employees',
      },]
      break;
    case '/login':
    pathFinalValue.value = 'Login'
      isLoginPage.value = true;
      pathValue.value = [{
        title: 'Login',
        disabled: false,
        href: '/Login',
      },]
      break;
    case '/payroll':
    pathFinalValue.value = 'Nominas'
      isLoginPage.value = false;
      pathValue.value = [{
        title: 'Nominas',
        disabled: false,
        href: '/payroll',
      },]
      break;
    case '/settings':
    pathFinalValue.value = 'Ajustes'
      isLoginPage.value = false;
      pathValue.value = [{
        title: 'Ajustes',
        disabled: false,
        href: '/Settings',
      },]
      break;
    case '/permits':
    pathFinalValue.value = 'Permisos'
      isLoginPage.value = false;
      pathValue.value = [{
        title: 'Permisos',
        disabled: false,
        href: '/permits',
      },]
      break;
    case '/permits/vacations':
    pathFinalValue.value = 'Vacaciones'
      isLoginPage.value = false;
      pathValue.value = [{
        title: 'Permisos',
        disabled: false,
        href: '/permits',
      },
      {
        title: 'Solicitud de Vacaciones',
        disabled: false,
        href: '/permits/vacations',
      }]
      break;
    case '/permits/permit-request':
      pathFinalValue.value = 'Permiso'
      isLoginPage.value = false;
      pathValue.value = [{
        title: 'Permisos',
        disabled: false,
        href: '/permits',
      },
      {
        title: 'Solicitud de Permiso',
        disabled: false,
        href: '/permits/permit-request',
      }]
      break;
    case '/permits/urgent-request':
      pathFinalValue.value = 'Urgente'
      isLoginPage.value = false;
      pathValue.value = [{
        title: 'Permisos',
        disabled: false,
        href: '/permits',
      },
      {
        title: 'Solicitud de Permiso urgente',
        disabled: false,
        href: '/permits/urgent-permit',
      }]
      break;
    default:
    pathFinalValue.value = 'dashboard'
      pathValue.value = [{
        title: 'Permisos',
        disabled: false,
        href: '/permits',
      }]
  }
  /* if(pathValue.value.title == 'Login'){
    
  } */
  if(pathFinalValue.value != 'Login'){
    isLoginPage.value = false;
    console.log('No es login')
  }else{
    isLoginPage.value = true;
    console.log('Es login')
  }
  console.log('ValorFinal', pathFinalValue.value);
  return pathValue
}

</script>

<template>
  <main class='ultra-container' >
    <SidebarComponent v-if="!isLoginPage">
    </SidebarComponent>
    <div class="main-container">
      <NavbarComponent v-if="!isLoginPage">
        <template #title>
          <v-breadcrumbs class="breadcrumbs" :items="getRoute().value"></v-breadcrumbs>
        </template>
      </NavbarComponent>
      <RouterView />
    </div>
  </main>
</template>

<style scoped lang="scss">
main {
  background-color: #F2F2F2;
  &.ultra-container{
    display: flex;
  }
  .breadcrumbs {
    color: var(--primary-color)
  }
  .main-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    overflow-x: auto;
    .site-container {
      width: 10%
    }
  }
}
</style>
