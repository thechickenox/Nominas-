<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import EmployeesForm from './forms/EmployeesForm.vue'
import { getAllEmployees } from '@/services/FirestoreFunctions'
import { deleteEmployeeById } from '@/services/FirestoreFunctions';
import Swal from 'sweetalert2'

function deleteEmployee(id: string) {
  const confirmation = confirm();
  if (confirmation) {
    deleteEmployeeById(id)
      .then((success) => {
        if (success) {
          Swal.fire({
            title: 'Eliminado',
            text: 'Se elimino el empleado correctamente!',
            icon: 'success',
            confirmButtonText: 'Ok'
            
        })
        reloadData(true)
        } else {
          console.error('Error al eliminar empleado');
        }
      })
      .catch((error) => {
        console.error('Error al eliminar empleado:', error);
      });
  }
}


let search = ref('')
let selectedEmployeeId = ref('');

const headers = [
  { title: 'Nombre Completo', key: 'name' },
  { title: 'Puesto', key: 'range' },
  { title: 'Departamento', key: 'department' },
  { title: 'RFC', key: 'rfc' },
  { title: 'Correo', key: 'mail' },
  { title: 'Actions', key: 'actions', sortable: false }
]
let employees = ref([])
let isLoading = ref(false)

async function onGetAllEmployees() {
  let response = await getAllEmployees()
  employees.value = response
  console.log('Datos de todos', response)
}
function editItem(id: string) {
    selectedEmployeeId.value = id; // Actualiza el valor de selectedEmployeeId con el ID del empleado seleccionado
    dialog.value = true; // Abre el diálogo
}


onMounted(async () => {
  isLoading.value = true
  await onGetAllEmployees()
  isLoading.value = false
})
let dialog = ref(false)
function getColor(range: any) {
  if (range == 'Ingeniero') return 'red'
  else if (range == 'Programador') return 'orange'
  else return 'green'
}



function closeDialog() {
  dialog.value = false
  reloadData(true)
}
async function reloadData(event: any){
  if(event){
    await onGetAllEmployees();
    return
  }else{
    return
  }
}
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
          <v-dialog
            v-model="dialog"
            max-width="80%"
            max-height="80vh"
            scrollable
          >
          
            <template v-slot:activator="{ props: activatorProps }">
              <button type="button" v-bind="activatorProps">
                <ion-icon name="add-outline" ></ion-icon>
                <p>Agregar Empleado</p>
              </button>
            </template>
            <EmployeesForm :data="selectedEmployeeId" @closeDialog="closeDialog"></EmployeesForm>

            

          </v-dialog>
        </div>
      </div>
      <div class="table-container">
        <v-data-table
          class="table"
          :headers="headers"
          :search="search"
          :items="employees"
          loading-text="Loading... Please wait"
          :loading="isLoading"
        >
          <template v-slot:item.actions="{ item }">
            <div class="actions">
              <button class="btn-edit" @click="editItem(item.id)">
                <ion-icon name="pencil-outline"></ion-icon>
              </button>
              <button class="btn-delete" @click="deleteEmployee(item.id)">
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
