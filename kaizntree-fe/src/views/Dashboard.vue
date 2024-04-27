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
                    <h4>Total Categories: {{ num_categories }}</h4>
                </div>
                <div class="row">
                    <h4>Total Items: {{ num_items }}</h4>
                </div>
            </div>
        </div>
        <div class="mt-4">
            <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#categoryModal">New Item Category</button>
        </div>
        <div class="modal fade" id="categoryModal" tabindex="-1" aria-labelledby="categoryModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="categoryModalLabel">Add Item Category</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <input type="text"
                                class="form-control"
                                v-model="new_category"
                                placeholder="New category"
                            >
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="addCategories" data-bs-dismiss="modal">Save Category</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid mt-3">
            <div class="row table_header align-items-center">
                <div class="col">
                    <p class="m-0 p-3">{{ num_categories }} Subcategories</p>
                </div>
            </div>
            <div class="row table_body mt-1 pt-3 pb-3">
                <div class="row">
                    <div class="col">
                        <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#itemModal">New Item</button>
                    </div>
                    <div class="modal fade" id="itemModal" tabindex="-1" aria-labelledby="itemModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="itemModalLabel">Add New Item</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form>
                                        <input type="text"
                                            class="form-control mb-3"
                                            v-model="sku"
                                            placeholder="SKU Number"
                                        >
                                        <input type="text"
                                            class="form-control mb-3"
                                            v-model="name"
                                            placeholder="Item Name"
                                        >
                                        <div class="dropdown">
                                            <button class="btn btn-secondary dropdown-toggle mb-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {{ item_category === "" ? "Choose Category" : "Item Category: " + item_category }}
                                            </button>
                                            <ul class="dropdown-menu">
                                                <li v-for="category in categories">
                                                    <a class="dropdown-item" href="#" @click.prevent="handleDropdown(category.name)">
                                                        {{ category.name }}
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <input type="number" step="0.01"
                                            class="form-control mb-3"
                                            v-model="cost"
                                            placeholder="Cost"
                                        >
                                        <input type="text"
                                            class="form-control mb-3"
                                            v-model="units"
                                            placeholder="Units"
                                        >
                                        <input type="number" step="0.01"
                                            class="form-control mb-3"
                                            v-model="in_stock"
                                            placeholder="In Stock"
                                        >
                                        <input type="number" step="0.01"
                                            class="form-control mb-3"
                                            v-model="available_stock"
                                            placeholder="Available Stock"
                                        >
                                        <input type="number" step="0.01"
                                            class="form-control mb-3"
                                            v-model="minimum_stock"
                                            placeholder="Minimum Stock"
                                        >
                                        <input type="number" step="0.01"
                                            class="form-control mb-3"
                                            v-model="desired_stock"
                                            placeholder="Desired Stock"
                                        >
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" @click="addItems" data-bs-dismiss="modal">Add Item</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-group">
                            <input 
                                class="form-control" 
                                type="text"
                                v-model="search"
                            >
                            <button class="btn btn-secondary" type="button" disabled>Search</button>
                            <button class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#sortModal">Sort</button>
                            <div class="modal fade" id="sortModal" tabindex="-1" aria-labelledby="sortModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="sortModalLabel">Which tab would you like to sort from</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <form>
                                                <div class="dropdown">
                                                    <button class="btn btn-secondary dropdown-toggle mb-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        {{ sort_tag_display === "" ? "Choose Tab" : "Tab Chosen: " + sort_tag_display }}
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                        <li>
                                                            <a class="dropdown-item" href="#" @click.prevent="set_sort_tag('sku', 'SKU')">
                                                                SKU
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a class="dropdown-item" href="#" @click.prevent="set_sort_tag('name', 'Name')">
                                                                Name
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a class="dropdown-item" href="#" @click.prevent="set_sort_tag('category_name', 'Category')">
                                                                Category
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a class="dropdown-item" href="#" @click.prevent="set_sort_tag('in_stock', 'In Stock')">
                                                                In Stock
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a class="dropdown-item" href="#" @click.prevent="set_sort_tag('available_stock', 'Available Stock')">
                                                                Available Stock
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="dropdown">
                                                    <button class="btn btn-secondary dropdown-toggle mb-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        {{ sort_type_display === "" ? "Sorting Direction" : "Direction: " + sort_type_display }}
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                        <li>
                                                            <a class="dropdown-item" href="#" @click.prevent="set_sort_type('ascending', 'Ascending')">
                                                                Ascending
                                                            </a>
                                                            <li>
                                                            <a class="dropdown-item" href="#" @click.prevent="set_sort_type('descending', 'Decsending')">
                                                                Descending
                                                            </a>
                                                        </li>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </form>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" class="btn btn-primary" @click.prevent="" data-bs-dismiss="modal">Sort</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button class="btn btn-info" type="button" @click.prevent="reset()">Reset</button>
                        </div>
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col">
                        <DashboardTable :items="items" :search="search" :sort_tag="sort_tag" :sort_type="sort_type"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div aria-live="polite" aria-atomic="true" class="position-absolute top-0 end-0 p-3 set_toast">
        <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="5000">
            <div class="toast-header">
                <strong class="me-auto">Error</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                <!-- Error message will be displayed here -->
            </div>
        </div>
    </div>
</template>

<script>
import Header from '../components/Header.vue';
import DashboardTable from '@/components/DashboardTable.vue';
import axios from 'axios';
import { Toast } from 'bootstrap';

export default {
    components: {
    Header,
    DashboardTable,
},
    data() {
        return {
            new_category: "",
            sku: "",
            name: "",
            item_category: "",
            cost: null,
            units: "",
            in_stock: null,
            available_stock: null,
            minimum_stock: null,
            desired_stock: null,
            categories: [],
            items: [],
            search: "",
            sort_tag: "",
            sort_type: "",
            sort_tag_display: "",
            sort_type_display: "",
        }
    },
    computed: {
        num_categories() {
            return this.categories ? this.categories.length : 0
        },
        num_items() {
            return this.items ? this.items.length : 0
        }
    },
    methods: {
        reset() {
            this.search = ""
            this.set_sort_tag("", "")
            this.set_sort_type("", "")
            this.getItems()
        },
        set_sort_tag(tag, display) {
            this.sort_tag = tag
            this.sort_tag_display = display
        },
        set_sort_type(tag, display) {
            this.sort_type = tag
            this.sort_type_display = display
        },
        handleDropdown(name) {
            this.item_category = name;
        },
        getCookie() {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; access_token=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        },
        showToast(message) {
            const toast = new Toast(document.querySelector('.toast'));
            const toastBody = document.querySelector('.toast-body');
            toastBody.textContent = message;
            toast.show();
        },
        async addCategories() {
            if (this.new_category !== "" && this.new_category !== null) {
                try {
                    await axios.post('/api/category/', {
                        name: this.new_category
                    }, {
                        headers: {
                            'CSRFToken': `Bearer ${this.getCookie()}`
                        }
                    }).then((data => {
                        this.getCatgories();
                    }));
                } catch (error) {
                    this.showToast(error.response.data.error);
                }
            } else {
                this.showToast("Add a category");
            }
        },
        async getCatgories() {
            try {
                await axios.get('/api/category/', {
                    headers: {
                        'CSRFToken': `Bearer ${this.getCookie()}`
                    }
                }).then((data => {
                    this.categories = data.data
                }));
            } catch (error) {
                this.showToast(error.response.data.error);
            }
        },
        async addItems() {
            try {
                await axios.post('/api/item/', {
                    sku: this.sku,
                    name: this.name,
                    category: this.item_category,
                    in_stock: this.in_stock,
                    available_stock: this.available_stock,
                    units: this.units, 
                    minimum_stock: this.minimum_stock,
                    desired_stock: this.desired_stock,
                    cost: this.cost,
                }, {
                    headers: {
                        'CSRFToken': `Bearer ${this.getCookie()}`
                    }
                }).then((data => {
                    this.getItems();
                }));
            } catch (error) {
                this.showToast(error.response.data.error);
            }
        },
        async getItems() {
            try {
                await axios.get('/api/item/', {
                    headers: {
                        'CSRFToken': `Bearer ${this.getCookie()}`
                    }
                }).then((data => {
                    this.items = data.data
                }));
            } catch (error) {
                this.showToast(error.response.data.error);
            }
        },
    },
    mounted() {
        this.getCatgories();
        this.getItems();
    }
}
</script>

<style>
body {
    @media screen and (max-width: 450px){
        width: 450px;
    }
}

.table_header {
    background-color: rgb(214, 208, 208);
    border-radius: 5px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.7); /* Add box shadow */
}

.table_body {
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.7); /* Add box shadow */
}

.set_toast {
    z-index: 9999;
}
</style>