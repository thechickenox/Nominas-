<script setup lang="ts">
import { Logout } from '@/services/FirestoreFunctions'; 
import type { Ref } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter();
const logout = async () => {
  await Logout(router);
  
  }
</script>

<template>
    <nav>
        <div class="title">
            <slot name="title"></slot>
        </div>
        <div class="logout-btn">
            <button @click="logout">Log Out</button>
        </div>
        
    </nav>
</template>

<style lang="scss">
nav{
    width: 100%;
    max-height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background-color: #FCFAFA;
    z-index: 3;
    .title{
        width: 100%;
        h1{
            padding-left: 1.2rem;
            text-align: start;
            color: #000;
            padding-top: .2rem;
            padding-bottom: .2rem;
            font-size: 1.2rem;
        }
    }
}
.logout-btn{
    position: absolute;
    right: 20px;
    width: fit-content;
    top: 11px;
    button{
        border:1px solid #FF735C;
        border-radius: 1rem;
        padding: .2rem 1rem;
        color: #fff;
        background-color: #FF735C;
        font-size: .8rem;
        &:hover{
            color: #FF735C;
            background-color: #fff;
            font-weight: 600;
        }
    }
}

</style>
