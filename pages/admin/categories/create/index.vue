<template>
    <main class="c-main">
        <div class="container-fluid">

            <div class="fade-in">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card border-0 rounded shadow-sm border-top-orange">
                            <div class="card-header">
                                <span class="font-weight-bold"><i class="fa fa-folder"></i> ADD NEW CATEGORY</span>
                            </div>
                            <div class="card-body">
                                <form v-on:submit.prevent="storeCategory">

                                    <div class="form-group">
                                        <label>GAMBAR</label>
                                        <input @change="handleFileChange" type="file" class="form-control">
                                        <div v-if="validation.image" class="mt-2">
                                            <b-alert show variant="danger">{{ validation.image[0] }}</b-alert>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label>NAMA CATEGORY</label>
                                        <input v-model="category.name" type="text" placeholder="Masukkan Nama Category"
                                            class="form-control">
                                        <div v-if="validation.name" class="mt-2">
                                            <b-alert show variant="danger">{{ validation.name[0] }}</b-alert>
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
            title: 'Add New Category - Administrator',
        }
    },

    data() {
        return {
            category: {
                image: '',
                name: ''
            },

            validation: []
        }
    },


    methods: {
        handleFileChange(e) {

            let image = this.category.image = e.target.files[0]

            if (!image.type.match('image,*')) {

                e.target.value = ''

                this.category.image = null,

                    this.$swal.fire({
                        title: 'OOPSS!',
                        text: 'Format File Tidak Didukung!',
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 3000
                    })
            }
        },

        async storeCategory() {

            const formData = new FormData();

            formData.append('image', this.category.image)
            formData.append('name', this.category.name)

            await this.$store.dispatch('admin/category/storeCategory', formData)
                .then(() => {
                    this.$swal.fire({
                        title: 'BERHASIL!',
                        text: 'DATA BERHASIL DISIMPAN!',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    })

                    this.$router.push({
                        name: 'admin-categories'
                    })
                }).catch((erorr) => {
                    this.validation = erorr.response.data
                });
        }
    }


}
</script>

<style>

</style>