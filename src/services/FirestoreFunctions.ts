import { collection, doc, setDoc, getDoc, getDocs, query, where, deleteDoc,updateDoc  } from "firebase/firestore"; 
import { getAuth, signInWithEmailAndPassword,signOut} from 'firebase/auth';
import { auth } from '@/services/firebaseInit';
import { ref } from 'vue';
import type { Router } from 'vue-router';

// used for the firestore refs
import { db } from '@/services/firebaseInit'
import type { Employee } from "@/interfaces/employees";
const permitsRef = collection(db, "permits");
const vacationsRef = collection(db, "vacations");
const settingsRef = collection(db, "settings");
const employeesRef = collection(db, "employees");
const payrollRef = collection(db, "payroll");
const error = ref(null);



export async function setEmployeeInfo(formValue: any){
    if(!formValue){
        return
    }
    try {
        await setDoc(doc(employeesRef), formValue);
    } catch (error) {
        console.error(error);
        return
    }
}

export async function getEmployeeById(id: any){
    if(!id || id == null){
        return
    }
    let response: any;
    try {
        const employeeDocRef = doc(db, "employees", id);
        const docSnap = await getDoc(employeeDocRef);
        if (docSnap.exists()) {
            response = docSnap.data();
            console.log("Document data:", docSnap.data());
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
        return response
    } catch (error) {
        console.error(error);
        return
    }
}
export async function updateEmployeeById(id: string, newData: any) {
    if (!id || !newData) {
        console.error('Invalid parameters');
        return false;
    }

    try {
        const employeeDocRef = doc(db, 'employees', id);
        await updateDoc(employeeDocRef, newData);
        console.log('Employee data updated successfully');
        return true;
    } catch (error) {
        console.error('Error updating employee data:', error);
        return false;
    }
}
export async function deleteEmployeeById(id: string) {
    try {
        await deleteDoc(doc(db, 'employees', id));
        console.log('Employee deleted successfully');
        return true;
    } catch (error) {
        console.error('Error deleting employee:', error);
        return false;
    }
}

export async function getAllEmployees(){
    const response: Employee[] | undefined = [];
    try {
        const q = query(collection(db, "employees"));
        
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
            const data = { ...doc.data(), id: doc.id }
            console.log(doc.id, " => ", doc.data());
            response.push(data);
        });
        return response;
    } catch (error) {
        console.error(error)
    }
}
export async function getEmployeeByRfc(rfc: string){
    let response: Employee | undefined = {};
    try {
        console.log('RFC agregado', rfc)
        const q = query(collection(db, "employees"), where("rfc", "==", rfc));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const data = { ...doc.data(), id: doc.id }
            console.log(doc.id, " => ", doc.data());
            response = data;
        });
        return response;
    } catch (error) {
        console.error(error)
    }
}
// --- Vacations Functions 
export async function setRequestVacations(formValue: any){
    if(!formValue){
        return
    }
    try {
        await setDoc(doc(vacationsRef), formValue);
    } catch (error) {
        console.error(error);
        return
    }
}
export async function getAllVacationPermits(){
    const docRef = doc(db, "vacations");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    }
}
export async function getVacationById(id: any){
    if(!id || id == null){
        return
    }
    let response: any;
    try {
        const vacationsDocRef = doc(db, "vacations", id);
        const docSnap = await getDoc(vacationsDocRef);
        if (docSnap.exists()) {
            response = docSnap.data();
            console.log("Document data:", docSnap.data());
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
        return response
    } catch (error) {
        console.error(error);
        return
    }
}

// --- Permits Functions 
export async function setRequestPermits(formValue: any){
    if(!formValue){
        return
    }
    try {
        await setDoc(doc(permitsRef), formValue);
    } catch (error) {
        console.error(error);
        return
    }
}
export async function getAllPermits(){
    let response!: any;
    try {
        const querySnapshot = await getDocs(permitsRef);
        querySnapshot.forEach((doc: any) => {
        // doc.data() is never undefined for query doc snapshots
        response.push(doc.data());
        console.log(doc.id, " => ", doc.data());
        });
    } catch (error) {
        console.error(error)
    }
    console.log(response)
    return response;
}
export async function getPermitById(id: any){
    if(!id || id == null){
        return
    }
    let response: any;
    try {
        const permitDocRef = doc(db, "permits", id);
        const docSnap = await getDoc(permitDocRef);
        if (docSnap.exists()) {
            response = docSnap.data();
            console.log("Document data:", docSnap.data());
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
        return response
    } catch (error) {
        console.error(error);
        return
    }
}

// --- Settings Functions

export async function setSettingsInfo(formValue: any){
    if(!formValue){
        return
    }
    try {
        await setDoc(doc(settingsRef), formValue);
    } catch (error) {
        console.error(error);
        return
    }
}
export async function updateSettingsInfo(formValue: any){
    if(!formValue){
        return
    }
    try {
        await setDoc(doc(settingsRef), formValue, { merge: true });
    } catch (error) {
        console.error(error);
        return
    }
}

export async function getSettingsByUser(id: any){
    if(!id || id == null){
        return
    }
    let response: any;
    try {
        const settingsDocRef = doc(db, "settings", id);
        const docSnap = await getDoc(settingsDocRef);
        if (docSnap.exists()) {
            response = docSnap.data();
            console.log("Document data:", docSnap.data());
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
        return response
    } catch (error) {
        console.error(error);
        return
    }
}

// --- Nominas ---
export async function getAllPayrolls(){
    const response: any[] = [];
    try {
        const q = query(collection(db, "payroll"));
        
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
            const data = { ...doc.data(), uid: doc.id }
            console.log(doc.id, " => ", doc.data());
            response.push(data);
        });
        return response;
    } catch (error) {
        console.error(error)
    }
}
export async function setPayrollInfo(formValue: any){
    if(!formValue){
        return
    }
    console.log('Informacion de nomina', formValue);
    try {
        const response = await setDoc(doc(payrollRef), formValue);
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
        return
    }
}
export async function deletePayrollById(id: any){
    try {
        if(!id){
            console.error('Id de payroll not found');
            return
        }
        const response = await deleteDoc(doc(db, "payroll", id));
        return response;
    } catch (error) {
        console.error(error);
        return
    }
}

// --- Autenticaciones ---

export async function Login(email: string , password: string, router: Router){
    error.value = null;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('Inicio de sesión exitoso:', userCredential.user);
    router.push('/');

  } catch (err) {
    console.error('Error al iniciar sesión:', err);
  }

}

export async function Logout(router: Router){
    error.value = null;
    try {
      await signOut(auth);
      router.push('/login');
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    }
}