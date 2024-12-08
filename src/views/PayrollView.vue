<script lang="ts" setup>
import { ref, onMounted } from 'vue'
let search = ref('')
import { useRouter } from 'vue-router'
import PayrollForm from './forms/PayrollForm.vue'
import { getAllPayrolls, deletePayrollById } from '@/services/FirestoreFunctions'
import Swal from 'sweetalert2'
//Importacion de datos

const router = useRouter()
let isLoading = ref(false)
const headers = [
  { title: 'No. Nómina', key: 'uid' },
  { title: 'No. Empleado', key: 'rfcEmpleado' },
  {
    title: 'Por Hora',
    key: 'hourlyWage',
    value: (item: any) => {
      let numero = Math.floor(item.hourlyWage)
      return `$${numero}`
    }
  },
  {
    title: 'IMSS',
    key: 'imss',
    value: (item: any) => {
      let numero = Math.floor(item.imss)
      return `$${numero}`
    }
  },
  {
    title: 'Salario Neto',
    key: 'salarioNeto',
    value: (item: any) => {
      let numero = Math.floor(item.salarioNeto)
      return `$${numero}`
    }
  },
  {
    title: 'Salario Bruto',
    key: 'salarioBruto',
    value: (item: any) => {
      let numero = Math.floor(item.salarioBruto)
      return `$${numero}`
    }
  },
  { title: 'Faltas', key: 'faltas' },
  { title: 'Acciones', key: 'actions', sortable: false }
]

const payrolls = ref([
  {
    rfcEmpleado: '12',
    uid: '5',
    imss: '01/mar./2024 al 15/mar./2024',
    'salario neto': '15.25',
    faltas: '0'
  }
])
let dialog = ref(false)
const Toast = Swal.mixin({
  customClass: {
    popup: 'colored-toast'
  },
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer
    toast.onmouseleave = Swal.resumeTimer
  }
})

function getColor(range: any) {
  if (range == 'Ingeniero') return 'red'
  else if (range == 'Programador') return 'orange'
  else return 'green'
}
function editItem(item: any) {
  return item
}
async function deleteItem(item: any) {
  await deletePayrollById(item.uid)
  Toast.fire({
    icon: 'success',
    title: 'Eliminado correctamente'
  })
  await onGetAllPayroll()
  return item
}

function closeDialog() {
  dialog.value = false
}
async function reloadData(event: any) {
  if (event) {
    await onGetAllPayroll()
    return
  } else {
    return
  }
}
async function onGetAllPayroll() {
  let response = await getAllPayrolls()
  payrolls.value = response
}
function redirectTo(query: string) {
  router.push(query)
}
onMounted(async () => {
  isLoading.value = true
  await onGetAllPayroll()
  isLoading.value = false
})
</script>

<template>
  <div class="main">
    <div class="container">
      <div class="header">
        <div class="search-container">
          <ion-icon name="search-outline"></ion-icon>
          <input type="text" v-model="search" placeholder="Search" />
        </div>
        <div class="add-btn">
          <v-dialog v-model="dialog" max-width="80%" max-height="80vh" scrollable>
            <template v-slot:activator="{ props: activatorProps }">
              <button v-bind="activatorProps">
                <ion-icon name="add-outline"></ion-icon>
                <p>Generar Nomina</p>
              </button>
            </template>
            <PayrollForm @closeDialog="closeDialog()" @submit="reloadData($event)"> </PayrollForm>
          </v-dialog>
        </div>
      </div>
      <div class="table-container">
        <v-data-table
          class="table"
          :headers="headers"
          :search="search"
          :items="payrolls"
          loading-text="Loading... Please wait"
          :loading="isLoading"
        >
          <template v-slot:item.actions="{ item }">
            <div class="actions">
              <button class="btn-delete" @click="redirectTo(`/payroll/${item.uid}`)">
                <ion-icon name="document-text-outline"></ion-icon>
              </button>
              <button class="btn-delete" @click="deleteItem(item)">
                <ion-icon name="trash-outline"></ion-icon>
              </button>
            </div>
          </template>
        </v-data-table>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
