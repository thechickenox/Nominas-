<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter()

function redirectTo(query: string){
  router.push(query)
}
</script>
<template>
  <div class="container">
    <div class="cards-list">
      <div class="card" @click="redirectTo('/permits/vacations')">
        <div class="card-banner">
          <img src="../assets/images/vacations.webp" alt="">
        </div>
        <div class="card-info">
          <div class="card-title">
            Solicitud de Vacaciones
          </div>
          <div class="action">
            <router-link to="/permits/vacations">
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </router-link>
          </div>
        </div>
      </div>
      <!-- <div class="card" @click="redirectTo('/permits/urgent-request')">
        <div class="card-banner">
          <img src="../assets/images/urgent.webp" alt="">
        </div>
        <div class="card-info">
          <div class="card-title">
            Solicitud de Permiso urgente
          </div>
          <div class="action">
            <router-link to="/permits/urgent-request">
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </router-link>
          </div>
        </div>
      </div> -->
      <div class="card" @click="redirectTo('/permits/permit-request')">
        <div class="card-banner">
          <img src="../assets/images/permits.webp" alt="">
        </div>
        <div class="card-info">
          <div class="card-title">
            Solicitud de Permiso
          </div>
          <div class="action">
            <router-link to="/permits/permit-request">
                <ion-icon name="chevron-forward-outline"></ion-icon>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container{
  .cards-list{
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 2.5rem;
    .card{
      background-color: #fff;
      border-radius: 1rem;
      cursor: pointer;
      animation:cubic-bezier(1, 0, 0, 1);
      transition: all 400ms ease-in-out;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
      &:hover{
        transition: all 400ms ease-in-out;
        transform: scale(1.04);
      }
      .card-banner{
        height: 100px;
        img{
          border-radius: 1rem 1rem 0 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .card-info{
        padding: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .action{
          color: #000 !important;
          &:hover{
            color: #FF735C;
          }
        }
      }
    }
  }
}
</style>
