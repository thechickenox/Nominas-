<script lang="ts" setup>
/* import { ref, onMounted } from 'vue'
 */
/* let employeeData = ref();
async function onGetEmployeeById(){
  await getEmployeeById()
}
onMounted(async () => {
  await onGetEmployeeById()
}) */
</script>
<template>
  <div class="container">
    <div class="profile-container">
      <div class="profile">
        <img src="../assets/icons/profile-icon.png" alt="">
        <div class="info-container">
            <p></p>
        </div>
      </div>
      <div class="info">
        <div class="first">
          <h2>Datos del Usuario</h2>
        </div>
        <div class="second">
          <div class="info-container">
            <span>Departamento</span>
            <p></p>
          </div>
          <div class="info-container">
            <span>Puesto</span>
            <p></p>
          </div>
          <div class="info-container">
            <span>Pago por Hora</span>
            <p></p>
          </div>
          <div class="info-container">
            <span>Dias a trabajar</span>
            <p></p>
          </div>
          
        </div>
        <div class="third">
          <div class="info-container">
            <span>CURP</span>
            <p></p>
          </div>
          <div class="info-container">
            <span>RFC</span>
            <p></p>
          </div>
          <div class="info-container">
            <span>IMSS</span>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.profile-container{
  display: flex;
  align-items: center;
  gap: 2rem;
  .profile{
    padding-inline: 4rem;
    img{
      width: 280px;
      height: 280px;
    }
  }
  .info{
    width: 100%;

  }
}
</style>
