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
                    <h4>Total Categories: {{ num_categores }}</h4>
                </div>
                <div class="row">
                    <h4>Total Items: 0</h4>
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
                        <button type="button" class="btn btn-primary" @click="addCategories" data-bs-dismiss="modal">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '../components/Header.vue';
import axios from 'axios';

export default {
    components: {
        Header
    },
    data() {
        return {
            new_category: "",
            categories: [],
            items: []
        }
    },
    computed: {
        num_categores() {
            return this.categories ? this.categories.length : 0
        },
        num_items() {
            return this.items ? this.items.length : 0
        }
    },
    methods: {
        getCookie() {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; access_token=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
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
                    console.error(error);
                }
            } else {
                console.error("Need a category name")
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
                console.error(error);
            }
        }
    },
    mounted() {
        this.getCatgories();
    }
}
</script>
