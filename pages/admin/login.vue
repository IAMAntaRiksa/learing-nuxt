<template>
    <section class="vh-100">
        <div class="container-fluid h-custom">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-md-9 col-lg-6 col-xl-5">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                        class="img-fluid" alt="Sample image">
                </div>


                <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                    <div v-if="validation.message" class="mt-2">
                        <b-alert show variant="danger">{{ validation.message }}</b-alert>
                    </div>
                    <form @submit.prevent="userLogin">
                        <div class="divider d-flex align-items-center my-4"></div>

                        <!-- Email input -->
                        <div class="form-outline mb-4">
                            <label class="form-label" for="form3Example3">Email address</label>
                            <input v-model="user.email" :class="{ 'is-invalid': validation.email }" type="email"
                                id="form3Example3" class="form-control form-control-lg"
                                placeholder="Enter a valid email address" />
                        </div>
                        <div v-if="validation.email" class="mt-2">
                            <b-alert show variant="danger">{{ validation.email[0] }}</b-alert>
                        </div>
                        <!-- Password input -->
                        <div class="form-outline mb-3">
                            <label class="form-label" for="form3Example4">Password</label>
                            <input v-model="user.password" :class="{ 'is-invalid': validation.password }"
                                type="password" id="form3Example4" class="form-control form-control-lg"
                                placeholder="Enter password" />
                        </div>
                        <div v-if="validation.password  " class="mt-2">
                            <b-alert show variant="danger">{{ validation.password [0] }}</b-alert>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <!-- Checkbox -->
                            <div class="form-check mb-0">
                                <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                <label class="form-check-label" for="form2Example3">
                                    Remember me
                                </label>
                            </div>
                            <a href="#!" class="text-body">Forgot password?</a>
                        </div>

                        <div class="text-center text-lg-start mt-4 pt-2">
                            <button type="submit" class="btn btn-primary btn-lg"
                                style="padding-left: 2.5rem; padding-right: 2.5rem;">Login</button>
                            <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="#"
                                    class="link-danger">Register</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    //middleware
    middleware: 'authenticated',

    //layout
    layout: 'auth',

    //meta
    head() {
        return {
            title: 'Login - Administrator',
        }
    },
    data() {
        return {
            user: {
                email: '',
                password: ''
            },
            validation: []
        }
    },

    methods: {
        async userLogin() {
            try {
                await this.$auth.loginWith('admin', { data: this.user })
                    .then(() => {
                        this.$router.push({
                            name: 'admin-dashboard'
                        })
                    })
            } catch (err) {
                this.validation = err.response.data
            }
        }
    }
}
</script>

<style>

</style>