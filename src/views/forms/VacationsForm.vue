<script lang="ts" setup>
import { ref, type Ref, onMounted } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'
//Importacion de datos
import type { Permit } from '@/interfaces/permits'
import { setRequestVacations, getAllEmployees } from '@/services/FirestoreFunctions'

const router = useRouter()
const errorMessage: Ref<string | undefined> = ref()
const dateSelect: Ref<string | undefined> = ref()
const employeeId: Ref<string | undefined> = ref()
const motive: Ref<string | undefined> = ref()
let employeesData = ref()
let form: Ref<Permit> = ref({
  employeeId: employeeId.value!,
  type: 'Vacations',
  motive: motive.value!,
  date: dateSelect.value!
})

async function submit() {
  console.log('Form values')
  let validForm = checkForm()
  if (!validForm) {
    errorMessage.value = 'Faltan datos en el formulario'
    console.error('Invalid Form')
    return
  }
  form.value = {
    employeeId: employeeId.value!,
    type: 'Vacations',
    motive: motive.value!,
    date: dateSelect.value!
  }
  try {
    let formValue = form.value
    let response = await setRequestVacations(formValue)
    router.push('/permits')
    Swal.fire({
      title: 'Exito!',
      text: 'Tu solicitud de guardo correctamente',
      icon: 'success',
      confirmButtonText: 'Ok'
    })
    return response
  } catch (e) {
    Swal.fire({
      title: 'Error!',
      text: 'Algo salio mal en el registro',
      icon: 'error',
      confirmButtonText: 'Ok'
    })
    console.error(e)
    return
  }
}
function goBack() {
  // Usa el método go(-1) del router para volver a la página anterior
  router.go(-1)
}
function checkForm() {
  const employeeIdValue = employeeId.value
  const motiveValue = motive.value
  const dateValue = dateSelect.value

  if (!employeeIdValue || employeeIdValue.trim() === '') {
    console.log('Por favor, ingrese un ID de empleado válido.')
    return false
  }

  if (!motiveValue || motiveValue.trim() === '') {
    console.log('Por favor, ingrese un motivo válido.')
    return false
  }

  if (!dateValue) {
    console.log('Por favor, seleccione una fecha válida.')
    return false
  }
  return true
}
async function onGetAllEmployees() {
  let response = await getAllEmployees()
  employeesData.value = response
  console.log('Datos de todos', response)
}
onMounted(async () => {
  await onGetAllEmployees()
})
</script>
<template>
  <div class="container">
    <div class="form-container">
      <form @submit.prevent="submit">
        <div class="main-title">
          <h2>
            <button type="button" @click="goBack()">
              <ion-icon name="arrow-back-outline"></ion-icon>
            </button>
            Solicitud de Vacaciones
          </h2>
        </div>
        <div class="input-container">
          <div class="title">Empleado</div>
          <v-select
            :items="employeesData"
            v-model="employeeId"
            item-title="rfc"
            label="RFC"
            variant="outlined"
          >
            <template v-slot:item="{ props, item }">
              <v-list-item v-bind="props" :subtitle="item.raw.name"></v-list-item>
            </template>
          </v-select>
        </div>
        <div class="input-container">
          <div class="title">Motivo</div>
          <v-textarea item-titles="Motivo" v-model="motive" variant="outlined"></v-textarea>
        </div>
        <div class="input-container">
          <div class="title">Fechas a elegir</div>
          <VueDatePicker
            v-model="dateSelect"
            :range="{ minRange: 1 }"
            :enable-time-picker="false"
          ></VueDatePicker>
        </div>
        <div class="error-message">
                    {{ errorMessage }}
                </div>
        <div class="btn-wrapper">
          <v-btn class="me-4 px-8 text-white submit-pill" type="submit" rounded="pill">
            Enviar Solicitud
          </v-btn>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.error-message{
    color: #ea2222;
    font-size: .8rem;
}
.form-container {
  background: #fff;
  border-radius: 1rem;
  padding: 1.3rem;
  .main-title {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    h2 {
      ion-icon {
        font-size: 1.3rem;
      }
      button {
        height: fit-content;
      }
      display: flex;
      align-items: center;
      font-size: 1.6rem;
      margin-bottom: 1rem;
      font-weight: 500;
      color: #ff735c;
    }
  }
}
.employee-data {
  display: flex;
  gap: 0.8rem;
}
.btn-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .submit-pill {
    margin-top: 1.5rem;
  }
}
</style>
