<template>
    <main class="c-main">
        <div class="container-fluid">
            <div class="fade-in">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card border-0 rounded shadow-sm border-top-orange">
                            <div class="card-header">
                                <span class="font-weight-bold"><i class="fa fa-users"></i> ADD NEW USER</span>
                            </div>
                            <div class="card-body">

                                <form @submit.prevent="storeUser">

                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>FULL NAME</label>
                                                <input type="text" v-model="name" placeholder="Masukkan Nama User"
                                                    class="form-control">
                                                <div v-if="validation.name" class="mt-2">
                                                    <b-alert show variant="danger">{{ validation.name[0] }}</b-alert>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>EMAIL ADDRESS</label>
                                                <input type="email" v-model="email" placeholder="Masukkan Email Address"
                                                    class="form-control">
                                                <div v-if="validation.email" class="mt-2">
                                                    <b-alert show variant="danger">{{ validation.email[0] }}</b-alert>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>PASSWORD</label>
                                                <input type="password" v-model="password"
                                                    placeholder="Masukkan Password" class="form-control">
                                                <div v-if="validation.password" class="mt-2">
                                                    <b-alert show variant="danger">{{ validation.password[0] }}
                                                    </b-alert>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>PASSWORD CONFIRMATION</label>
                                                <input v-model="password_confirmation" type="password"
                                                    placeholder="Masukkan Konfirmasi Password" class="form-control">
                                            </div>
                                        </div>
                                    </div>

                                    <button class="btn btn-info mr-1 btn-submit" type="submit"><i
                                            class="fa fa-paper-plane"></i>
                                        SAVE</button>
                                    <button class="btn btn-warning btn-reset" type="reset"><i class="fa fa-redo"></i>
                                        RESET</button>

                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    layout: 'admin',

    head() {
        return {
            title: 'admin - New Users'
        }
    },
    data() {
        return {

            name: '',
            email: '',
            password: '',
            password_confirmation: '',

            validation: []
        }
    },


    methods: {
        async storeUser() {
            const formData = new FormData()

            formData.append('name', this.name)
            formData.append('email', this.email)
            formData.append('password', this.password)
            formData.append('password_confirmation', this.password_confirmation)

            await this.$store.dispatch('admin/user/storeUser', formData)
                .then(() => {
                    this.$swal.fire({
                        title: 'BERHASIL!',
                        text: 'DATA BERHASIL DISIMPAN!',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 3000
                    })

                    this.$router.push({
                        name: 'admin-users'
                    })
                }).catch((err) => {
                    this.validation = err.response.data
                });
        }
    }
}
</script>

<style>

</style>