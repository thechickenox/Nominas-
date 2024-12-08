<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { getAllPayrolls } from '@/services/FirestoreFunctions'
import { useRoute } from 'vue-router'
import { getEmployeeByRfc } from '@/services/FirestoreFunctions'
import html2pdf from "html2pdf.js";

const route = useRoute()
let payroll = ref()
let payrolls = ref()
let employeeData = ref()
//Importacion de datos
let allData: any = ref({
  data: 'Employee',
  name: 'Random'
});
const headers = [
  { title: 'Descripción', key: 'description' },
  { title: 'Total', key: 'total' },
]
let pagos = ref();
function deleteData(arrayDatos: any, descripciones: any) {
  return arrayDatos.filter((dato: any) => dato.description !== descripciones);
}
function sortData(datos: any) {
  const arrayDatos = [];

  for (const [key, value] of Object.entries(datos)) {
    arrayDatos.push({ description: key, total: value });
  }
  let finalArray = deleteData(arrayDatos, 'rfcEmpleado');
  finalArray = deleteData(arrayDatos, 'hourlyWage');
  finalArray = deleteData(arrayDatos, 'uid');
  return finalArray;
}
async function onGetEmployeeData(rfc: any) {
  let response = await getEmployeeByRfc(rfc)
  return response
}
function getRouteId(fullRoute: any) {
  // Verifica si la ruta contiene el patrón "/payroll/" seguido por una cadena
  const patron = /\/payroll\/([^/]+)/
  const coincidencia = fullRoute.match(patron)

  // Si hay una coincidencia y se captura la parte después de "/payroll/", devuélvela
  if (coincidencia && coincidencia[1]) {
    return coincidencia[1]
  } else {
    // Si no hay una coincidencia, devuelve null o realiza alguna otra acción según sea necesario
    return null
  }
}
async function onGetPayroll(path: any) {
  let response = await getAllPayrolls()
  let nomina: any
  response!.forEach((item: any) => {
    if (item.uid == path) {
      nomina = item
    }
  })
  console.log(nomina)
  payroll.value = nomina
  pagos.value = sortData(nomina);
  employeeData.value = await onGetEmployeeData(nomina.rfcEmpleado)
  return nomina
}

/* async function onGetAllPayroll() {
  let response = await getAllPayrolls()
  payrolls.value = response
} */
onMounted(async () => {
  const path = computed(() => route.path)
  let stringPath = path.value.toString()
  let pathValue = ref(getRouteId(stringPath))
  console.log('id:', pathValue.value)
  await onGetPayroll(pathValue.value)
  allData.value = {
    ...employeeData.value, 
    ...payroll.value, 
    imssValue: payroll.value.imss, 
    imss: employeeData.value.imss,
    totalHours: employeeData.value.totalHours,
  }
  console.log('allData:', allData.value);
})
function exportToPDF() {
  html2pdf(document.getElementById("nomina"), {
				margin: 1,
  			filename: "i-was-html.pdf",
			});
}
</script>

<template>
  <div class="main">
    <div class="container">
      <button class='download-btn' @click="exportToPDF()">
        Descargar en PDF
      </button>
      <div class="pdf-container" id='nomina'>
        <div class="main-title">
          <h2>HOJA DE NOMINA - {{ allData.uid }}</h2>
        </div>
        <div class="top">
          <div class="left">
            <div class="info-container">
              <span> Nombre </span>
              <p>
                {{ allData.name }}
              </p>
            </div>
            <div class="info-container">
              <span> IMSS </span>
              <p>
                {{ allData.imss }}
              </p>
            </div>
            <div class="info-container">
              <span> RFC </span>
              <p>
                {{ allData.rfcEmpleado }}
              </p>
            </div>
            <div class="info-container">
              <span> Sueldo/hora </span>
              <p>
                {{ allData.hourlyWage }}
              </p>
            </div>
          </div>
          <div class="right">
            <div class="info-container">
              <span> Departamento </span>
              <p>
                {{ allData.department }}
              </p>
            </div>
            <div class="info-container">
              <span> Puesto </span>
              <p>
                {{ allData.range }}
              </p>
            </div>
            <div class="info-container">
              <span> Email </span>
              <p>
                {{ allData.mail }}
              </p>
            </div>
          </div>
        </div>
        <br>
        <h3>Tabla de relación de nomina</h3>
        <v-data-table class="table"
          :headers="headers"
          :items="pagos"
        >
        </v-data-table>
        <div class="total-nomina">
          Total de la nomina: ${{ allData.totalNomina }}
        </div>
      </div>
      
    </div>
  </div>
</template>

<style scoped lang="scss">
.pdf-container {
  border: 1px solid #000;
}
.download-btn{
  border: 1px solid var(--primary-color);
  background-color: var(--primary-color);
  color: #fff;
  transition: all 400ms ease-in-out;
  padding: .5rem 1rem;
  border-radius: 1rem;
  margin-bottom: 2rem;
  &:hover{
    background-color: #fff;
    color: var(--primary-color);
  }
}
.total-nomina{
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding-inline: 1rem;
}
h2{
  font-size: 2.1rem;
  margin-top: 1rem;
  padding-inline: 1rem;
  margin-bottom: 2rem;
}
h3{
  padding-inline: 3rem;
  font-size: 1.5rem;
  margin-top: 1.3rem;
}
.table{
  padding-inline: 3rem;
  background: transparent;
}
.top{
  padding-inline: 3rem;
  padding-right: 20rem;
  padding-top: 1.3rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  .info-container{
    span{
      font-size: .7rem;
      opacity: .7;
    }
    p{
      font-size: 1rem;
    }
  }
}
</style>
