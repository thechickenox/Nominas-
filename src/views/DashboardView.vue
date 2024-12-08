<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
const router = useRouter()

function redirectTo(query: string) {
  router.push(query)
  /* window.location.reload(); */
}
onMounted(async () => {
})
</script>
<template>
  <div class="container">
    <h1>
        ¡Bienvenido!
    </h1>
    <div class="cards-list">
      <div class="card" @click="redirectTo('/employees')">
        <div class="card-info">
          <div class="card-icon">
            <img src="../assets/icons/dashboard-1.png" alt="" />
          </div>
          <div class="card-title">
            Gestiona todos los aspectos relacionados con los empleados en un solo lugar.
          </div>
        </div>
      </div>
      <div class="card" @click="redirectTo('/permits')">
        <div class="card-info">
          <div class="card-icon">
            <img src="../assets/icons/dashboard-2.png" alt="" />
          </div>
          <div class="card-title">
            Facilita la solicitud de permisos para cada empleado
          </div>
        </div>
      </div>
      <div class="card" @click="redirectTo('/payroll')">
        <div class="card-info">
          <div class="card-icon">
            <img src="../assets/icons/dashboard-3.png" alt="" />
          </div>
          <div class="card-title">
            Gestiona los pagos y la generación de nóminas de manera eficiente y sin complicaciones.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
    h1{
        font-size: 2.1rem;
        font-weight: 400;
        text-align: center;
    }
  .cards-list {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 2.5rem;
    .card {
      background-color: #fff;
      border-radius: 1rem;
      cursor: pointer;
      animation: cubic-bezier(1, 0, 0, 1);
      transition: all 400ms ease-in-out;
      box-shadow:
        rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
      &:hover {
        transition: all 400ms ease-in-out;
        transform: scale(1.04);
      }
      .card-banner {
        height: 100px;
        img {
          border-radius: 1rem 1rem 0 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .card-info {
        padding: 1rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 4rem;
        .card-icon{
            background-color: var(--primary-color);
            padding: 1rem;
            border-radius: 1rem;
            img{
                width:60px;
                height:60px;
            }
        }
        .action {
          color: #000 !important;
          &:hover {
            color: #ff735c;
          }
        }
      }
    }
  }
}
</style>
