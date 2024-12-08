<script lang="ts" setup>
import { ref, onMounted , type Ref } from 'vue'
import '@vuepic/vue-datepicker/dist/main.css'
import Swal from 'sweetalert2'
import { getEmployeeByRfc, setPayrollInfo, getAllEmployees } from '@/services/FirestoreFunctions'
//Importacion de datos

let errorMessage: Ref<string | undefined> = ref();
let employeeRfc: Ref<string | undefined> = ref();
let employeesData = ref();
let faltas: Ref<string | undefined> = ref();
const emits = defineEmits(['closeDialog', 'submit'])
const closeDialog = () => {
  // Emitir el evento al padre con los datos
    emits('closeDialog', false);
};
async function onGetAllEmployees() {
  let response = await getAllEmployees()
  employeesData.value = response
  console.log('Datos de todos', response)
}
function calcularNomina(empleado: any) {
    let totalNomina = 0;
    console.log(empleado);
    
    empleado = {
        ...empleado,
        totalHours: empleado.totalHours - faltas.value!
    }
    const salarioBruto = calcularSalarioBruto(empleado);
    const imss = calcularDeduccionesIMSS(empleado)
    const salarioNeto = calcularSalarioNeto(salarioBruto, imss);
    totalNomina += salarioNeto.neto;
    
    console.log('Salario Total: ',totalNomina)
    let nomina = {
        totalNomina: totalNomina,
        salarioNeto: salarioNeto.neto,
        salarioBruto: salarioBruto,
        isr: salarioNeto.isr,
        imss: imss,
        faltas: faltas.value,
        totalHours: empleado.totalHours - faltas.value!,
        hourlyWage: empleado.hourlyWage,
        rfcEmpleado: empleado.rfc
    };
    console.log('Total: ',nomina)
    return nomina
}
function calcularSalarioNeto(salarioBruto: number, deduccionesIMSS: number) {
    const salarioGravable = salarioBruto - deduccionesIMSS;
    const isr = calcularISR(salarioGravable);
    const salarioNeto = salarioBruto - isr - deduccionesIMSS;
    console.log('Salario Neto: ',salarioNeto)
    return {
        neto: salarioNeto,
        isr: isr
    };
}
function calcularISR(salarioGravable: number) {
    let isr = 0;
    if (salarioGravable <= 10000) {
        isr = salarioGravable * 0.1;
    } else if (salarioGravable <= 20000) {
        isr = 1000 + (salarioGravable - 10000) * 0.15;
    } else {
        isr = 2500 + (salarioGravable - 20000) * 0.20;
    }
    console.log('ISR: ', isr);
    return isr;
}

function calcularSalarioBruto(empleado: any): number {
    const salarioBruto = (empleado.hourlyWage * 8) * empleado.totalHours;
    console.log('Bruto', salarioBruto)
    return salarioBruto;
}
function calcularDeduccionesIMSS(empleado: any): number {
    // Porcentaje de cuotas obrero-patronales para 2022
    const porcentajeCuotasObreroPatronales = 0.0735; 
    // Calcular las cuotas obrero-patronales
    const cuotasObreroPatronales = calcularSalarioBruto(empleado) * porcentajeCuotasObreroPatronales
    // Calcular el total de deducciones del IMSS
    const totalDeduccionesIMSS = cuotasObreroPatronales;
    console.log('IMSS: ', totalDeduccionesIMSS);
    return totalDeduccionesIMSS;
}
async function submit(){
    try {
        let nomina: any;
        let validForm = await checkForm();
        if(!validForm){
            errorMessage.value = 'Faltan datos en el formulario'
            console.error('Invalid Form')
            return
        }
        let response: any = await getEmployeeByRfc(employeeRfc.value!);
        console.log('Usuario obtenido', response);
        if(Object.keys(response).length === 0){
            closeDialog();
            Swal.fire({
                title: 'Error!',
                text: 'No existe el RFC en la base de datos',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
            return
        }
        response.totalHours = response.totalHours - faltas.value;
        let values = await calcularNomina(response);
        
        nomina = {
            ...values, 
        }
        console.log(nomina);
        await setPayrollInfo(nomina);

        emits('submit', true);
        closeDialog();
        Swal.fire({
            title: 'Exito!',
            icon: 'success',
            confirmButtonText: 'Cool'
        })
        return nomina;
    } catch (error) {
        console.log(error);
        emits('submit', true);
        closeDialog();
        Swal.fire({
            title: 'Error!',
            text: 'Do you want to continue',
            icon: 'error',
            confirmButtonText: 'Cool'
        })
    }
}
function checkForm() {
  const faltasValue = faltas.value;
  const rfcEmpleadoValue = employeeRfc.value;

  if (!faltasValue || faltasValue.trim() === '') {
    console.log('Por favor, ingrese un número válido de faltas.');
    return;
  }

  if (!rfcEmpleadoValue || rfcEmpleadoValue.trim() === '') {
    console.log('Por favor, ingrese un RFC de empleado válido.');
    return;
  }

  const nomina = {
    faltas: faltasValue,
    rfcEmpleado: rfcEmpleadoValue
  };
  return nomina;
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
                        Nominas
                    </h2>
                    <div class="btn-exit">
                        <button type="button" @click="closeDialog()">
                            <ion-icon name="close-outline"></ion-icon>
                        </button>
                    </div>
                </div>
                <div class="employees-data">
                    <div class="input-container">
                        <div class="title">
                            RFC de Empleado
                        </div>
                        <v-select 
                            :items="employeesData" 
                            v-model="employeeRfc" 
                            item-title="rfc" 
                            label="RFC"
                            variant="outlined">
                            <template v-slot:item="{ props, item }">
                                <v-list-item v-bind="props" :subtitle="item.raw.name"></v-list-item>
                            </template>
                        </v-select>
                    </div>
                    <div class="input-container">
                        <div class="title">
                            Cant. Faltas
                        </div>
                        <v-text-field
                            v-model="faltas"
                            item-title="Faltas"
                            label="rfc"
                            return-object
                            single-line
                            variant="outlined"
                            type="number"
                        ></v-text-field>
                    </div>

                </div>
                <div class="error-message">
                    {{ errorMessage }}
                </div>
                <div class="btn-wrapper">
                    <v-btn class="me-4 px-8 text-white submit-pill" type="submit" rounded="pill">
                        Generar Nomina
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
.form-container{
    background: #fff;
    border-radius: 1rem;
    padding: 1.3rem;
    .main-title{
        h2{
            font-size: 1.6rem;
            margin-bottom: 1rem;
            font-weight: 500;
            color: #FF735C;
        }
    }
}
.employee-data{
    display: flex;
    gap: .8rem;
}
.btn-wrapper{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .submit-pill{
        margin-top: 1.5rem;
    }
}
.main-title{
        display: flex;
        align-items: center;
        justify-content: space-between;
        h2{
            font-size: 1rem;
            margin-bottom: 1rem;
            font-weight: 500;
            color: #FF735C;
        }
        .btn-exit{
            button{
                display: flex;
                align-items: center;
                justify-content: center;
                padding: .2rem;
                border-radius: 50%;
                border: 2px solid var(--primary-color);
                color: var(--primary-color);
                font-weight: bold;
                &:hover{
                    border: 2px solid #ea2222;
                    color: #fff;
                    background-color: #ea2222;
                }
            }
        }
    }
</style>
