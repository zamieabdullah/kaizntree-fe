<template>
<table class="table">
    <thead>
        <tr>
            <th scope="col">SKU</th>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">In Stock</th>
            <th scope="col">Available Stock</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(item, index) in items">
            <td>{{ item.sku }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.category_name }}</td>
            <td>{{ item.in_stock }}</td>
            <td>{{ item.available_stock }}</td>
        </tr>
    </tbody>
</table>
</template>

<script>
export default {
    props: {
        items: Array,
    },
    data() {
        return {

        }
    },
    methods: {

    },
    computed: {

    },

}
</script>