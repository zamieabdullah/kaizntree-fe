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
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        async handleLogin(){
            try {
                const response = await axios.post('/api/login/', { email_address: this.email, password: this.password });
                console.log(response); // Handle successful login response
            } catch (error) {
                console.error('Login failed'); // Handle login error
            }
        },
        async handleSignup(){
            try {
                const response = await axios.post('/api/signup/', { email_address: this.email, password: this.password });
                console.log(response); // Handle successful login response
            } catch (error) {
                console.error(); // Handle login error
            }
        }
    }
}
</script>