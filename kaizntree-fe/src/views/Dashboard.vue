<template>
    <Header/>
    <div class="container-fluid" style="padding-top: 80px;">
        <div class="row align-items-start">
            <div class="col">
                <h1>Item Dashboard</h1>
                <h4>All Items</h4>
            </div>
            <div class="col">
                <div class="row mb-3">
                    <h4>Total Categories: 0</h4>
                </div>
                <div class="row">
                    <h4>Total Items: 0</h4>
                </div>
            </div>
        </div>
        <div class="mt-4">
            <button class="btn btn-success">New Item Category</button>
        </div>
    </div>
</template>

<script setup>
import Header from '../components/Header.vue';
</script>
