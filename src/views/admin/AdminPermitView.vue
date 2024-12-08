<script lang="ts" setup>
import NavbarComponent from '@/components/assets/NavbarComponent.vue'
import { ref } from 'vue'
let search = ref('')
const headers = [
  { title: 'Nombre Completo', key: 'fullname' },
  { title: 'Puesto', key: 'range' },
  { title: 'Departamento', key: 'department' },
  { title: 'Correo', key: 'email' },
  { title: 'Actions', key: 'actions', sortable: false }
]
const employees = [
  {
    fullname: 'Spinach',
    range: 'Ingeniero',
    department: 'Contruccion',
    email: 'spinach@nomimas.com',
    actions: 'Acciones'
  },
  {
    fullname: 'Spinach',
    range: 'Ingeniero',
    department: 'Contruccion',
    email: 'spinach@nomimas.com',
    actions: 'Acciones'
  },
  {
    fullname: 'Spinach',
    range: 'Programador',
    department: 'Contruccion',
    email: 'spinach@nomimas.com',
    actions: 'Acciones'
  }
]
function getColor(range: any) {
  if (range == 'Ingeniero') return 'red'
  else if (range == 'Programador') return 'orange'
  else return 'green'
}
function editItem(item: any) {
  return item
}
function deleteItem(item: any) {
  return item
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
          <button>
            <ion-icon name="add-outline"></ion-icon>
          </button>
        </div>
      </div>
      <div class="table-container">
        <v-data-table class="table" :headers="headers" :search="search" :items="employees">
          <template v-slot:item.range="{ value }">
            <v-chip :color="getColor(value)">
              {{ value }}
            </v-chip>
          </template>
          <template v-slot:item.actions="{ item }">
            <div class="actions">
              <button class="btn-edit" click="editItem(item)">
                <ion-icon name="pencil-outline"></ion-icon>
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
