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
        <tr v-for="(item, index) in filtered_items">
            <td>{{ item.sku }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.category_name }}</td>
            <td>
                <div class="row">
                    <div class="col-2 align-self-center">
                        <div :class="{red_circle: (item.in_stock <= item.minimum_stock), 
                            green_circle: (item.in_stock > item.minimum_stock)}">
                        </div>
                    </div>
                    {{ item.in_stock }}
                </div>
            </td>
            <td>
                <div class="row">
                    <div class="col-2 align-self-center">
                        <div :class="{red_circle: (item.available_stock <= item.minimum_stock),
                            green_circle: (item.available_stock > item.minimum_stock)}">
                        </div>
                    </div>
                    {{ item.available_stock }}
                </div>
            </td>
        </tr>
    </tbody>
</table>
</template>

<script>
export default {
    props: {
        items: Array,
        search: String,
        sort_tag: String,
        sort_type: String,
    },
    data() {
        return {
            filtered_data: [],
        }
    },
    methods: {
        filterItem(item) {
            const query = this.search.toLowerCase();
            for (const key in item) {
                if (Object.prototype.hasOwnProperty.call(item, key)) {
                    const value = String(item[key]).toLowerCase();
                    if (value.includes(query)) {
                    return true;
                    }
                }
            }
            return false;
        },
    },
    computed: {
        filtered_items() {
            this.filtered_data = this.items ? this.items : []
            if (this.sort_tag !== "" && this.sort_type !== "") {
                if (this.sort_type === "ascending") {
                    this.filtered_data.sort((a, b) => {
                        if (a[this.sort_tag] < b[this.sort_tag]) {
                            return -1; // a should come before b
                        } else if (a[this.sort_tag] > b[this.sort_tag]) {
                            return 1; // a should come after b
                        } else {
                            return 0; // names are equal
                        }
                    })
                } else if (this.sort_type === "descending") {
                    this.filtered_data.sort((a, b) => {
                        if (a[this.sort_tag] > b[this.sort_tag]) {
                            return -1; // a should come before b
                        } else if (a[this.sort_tag] < b[this.sort_tag]) {
                            return 1; // a should come after b
                        } else {
                            return 0; // names are equal
                        }
                    })
                }
            }

            if (this.search === "") {
                return this.filtered_data
            }

            this.filtered_data = this.filtered_data.filter(item => this.filterItem(item))
            return this.filtered_data
        }
    },
}
</script>

<style>
.green_circle {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: green;
}

.red_circle {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: red;
}
</style>