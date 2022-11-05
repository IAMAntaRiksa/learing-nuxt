<template>
    <main class="c-main">
        <div class="container-fluid">
            <div class="fade-in">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card border-0 rounded shadow-sm border-top-orange">
                            <div class="card-header">
                                <span class="font-weight-bold"><i class="fa fa-folder"></i> CATEGORIES</span>
                            </div>
                            <div class="card-body">
                                <div class="form-group">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <nuxt-link :to="{ name: 'admin-categories-create' }"
                                                class="btn btn-warning btn-sm" style="padding-top: 10px;">
                                                <i class="fa fa-plus-circle"></i> ADD NEW
                                            </nuxt-link>
                                        </div>
                                        <input type="text" @keypress.enter="searchData" v-model="search"
                                            class="form-control" placeholder="cari berdasarkan nama category">
                                        <div class="input-group-append">
                                            <button @click="searchData" class="btn btn-warning"><i
                                                    class="fa fa-search"></i>SEARCH</button>
                                        </div>
                                    </div>
                                </div>

                                <!-- table -->
                                <b-table striped bordered hover :items="categories.data" :fields="fields" show-empty>
                                    <!-- image -->
                                    <template v-slot:cell(image)="data">
                                        <img class="img-fluid" width="50" :src="data.item.image" />
                                    </template>
                                    <!-- end image -->

                                    <!-- action -->
                                    <template v-slot:cell(actions)="data">
                                        <b-button
                                            :to="{ name: 'admin-categories-edit-id', params: { id: data.item.id } }"
                                            variant="info" size="sm">
                                            EDIT
                                        </b-button>

                                        <b-button variant="danger" size="sm" @click="destroyCategory(data.item.id)">
                                            DELETE</b-button>
                                    </template>
                                    <!-- endaction -->
                                </b-table>
                                <!-- endtable -->


                                <!-- pagination -->
                                <b-pagination align="right" :value="categories.meta.current_page"
                                    :total-rows="categories.meta.total" :per-page="categories.meta.per_page"
                                    @change="changePage" aria-controls="my-table">
                                </b-pagination>
                                <!-- endpagination -->
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
    //layout
    layout: 'admin',

    //meta
    head() {
        return {
            title: 'Admin - Categories',
        }
    },

    data() {
        return {
            fields: [
                {
                    label: 'Image',
                    key: 'image',
                    tdClass: 'text-center'
                },
                {
                    label: 'Category Name',
                    key: 'name'
                },
                {
                    label: 'Actions',
                    key: 'actions',
                    tdClass: 'text-center'
                },
                {
                    label: 'Actions',
                    key: 'actions',
                    tdClass: 'text-center'
                }
            ],

            search: ''
        }
    },

    async asyncData({ store }) {
        await store.dispatch('admin/category/getCategoriesData')
    },

    computed: {
        //categories
        categories() {
            return this.$store.state.admin.category.categories
        },

    },

    methods: {
        searchData() {
            this.$store.commit('admin/category/SET_PAGE', 1)
            //dispatch on action "getCategoriesData"
            this.$store.dispatch('admin/category/getCategoriesData', this.search)
        },

        changePage(page) {
            this.$store.commit('admin/category/SET_PAGE', page)
            //dispatch on action "getCategoriesData"
            this.$store.dispatch('admin/category/getCategoriesData', this.search)
        },

        destroyCategory(id) {
            this.$swal.fire({
                title: 'APAKAH ANDA YAKIN ?',
                text: "INGIN MENGHAPUS DATA INI !",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'YA, HAPUS!',
                cancelButtonText: 'TIDAK',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$store.dispatch('admin/category/destroyCategory', id)
                        .then(() => {
                            //feresh data
                            this.$nuxt.refresh()
                            // alert
                            this.$swal.fire({
                                title: 'BERHASIL!',
                                text: "Data Berhasil Dihapus!",
                                icon: 'success',
                                showConfirmButton: false,
                                timer: 2000
                            })
                        })
                }
            })
        }
    }
}
</script>

<style>

</style>