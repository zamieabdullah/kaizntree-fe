<template>
    <div class="container-fluid text-center">
        <form>
            <h1 class="mb-5">Kaizntree</h1>
            <div class="mb-4">
                <input type="email" 
                    class="form-control-lg" 
                    id="exampleInputEmail1" 
                    placeholder="Email Address" 
                    aria-describedby="emailHelp"
                    v-model="email"
                    required
                >
            </div>
            <div class="mb-4">
                <input 
                    type="password" 
                    class="form-control-lg" 
                    placeholder="Password"
                    id="exampleInputPassword1"
                    v-model="password"
                    required
                >
            </div>
            <button type="submit" class="btn btn-primary" @click.prevent="handleSignup" :style="{marginRight: '3px'}">Create Account</button>
            <button type="submit" class="btn btn-primary" @click.prevent="handleLogin" :style="{marginLeft: '3px'}">Log In</button>
        </form>
    </div>
    <div aria-live="polite" aria-atomic="true" class="position-fixed top-0 end-0 p-3">
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
import { Toast } from 'bootstrap';
import axios from 'axios';

export default {
    data() {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        showToast(message) {
            const toast = new Toast(document.querySelector('.toast'));
            const toastBody = document.querySelector('.toast-body');
            toastBody.textContent = message;
            toast.show();
        },
        async handleLogin(){
            try {
                const response = await axios.post('/api/login/', { email_address: this.email, password: this.password });
                this.$router.push('/dashboard');
            } catch (error) {
                this.showToast(error.response.data.error)
            }
        },
        async handleSignup(){
            try {
                const response = await axios.post('/api/signup/', { email_address: this.email, password: this.password });
                this.$router.push('/dashboard');
            } catch (error) {
                this.showToast(error.response.data.error)
            }
        }
    }
}
</script>