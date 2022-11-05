<template>
    <main class="c-main">
        <div class="container-fluid">
            <div class="fade-in">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card border-0 rounded shadow-sm border-top-orange">
                            <div class="card-header">
                                <span class="font-weight-bold"><i class="fa fa-layer-group"></i> PRODUCTS</span>
                            </div>
                            <div class="card-body">

                                <div class="form-group">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <nuxt-link :to="{ name: 'admin-products-create' }"
                                                class="btn btn-warning btn-sm" style="padding-top: 10px;">
                                                <i class="fa fa-plus-circle"></i> ADD NEW
                                            </nuxt-link>
                                        </div>
                                        <input @keypress.enter="searchData" v-model="search" type="text"
                                            class="form-control" placeholder="cari berdasarkan nama product">
                                        <div class="input-group-append">
                                            <button @click="searchData" class="btn btn-warning"><i
                                                    class="fa fa-search"></i>
                                                SEARCH
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <b-table striped bordered :items="products.data" :fields="fields" hover show-empty>
                                    <template v-slot:cell(actions)="row">
                                        <b-button :to="{ name: 'admin-products-edit-id', params: { id: row.item.id } }"
                                            variant="info" size="sm">
                                            EDIT
                                        </b-button>
                                        <b-button variant="danger" @click="destroyProduct(row.item.id)" size="sm">
                                            DELETE</b-button>
                                    </template>
                                </b-table>
                                <!-- pagination -->
                                <b-pagination align="left" :value="products.meta.current_page"
                                    :total-rows="products.meta.total" :per-page="products.meta.per_page"
                                    @change="changePage" aria-controls="my-table">
                                </b-pagination>
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
            title: 'Admin - Products'
        }
    },
    data() {
        return {
            //table header
            fields: [{
                label: 'Product Name',
                key: 'title',
            },
            {
                label: 'Category Name',
                key: 'category.name'
            },
            {
                label: 'Stock',
                key: 'stock',
                tdClass: 'text-center'
            },
            {
                label: 'Actions',
                key: 'actions',
                tdClass: 'text-center'
            }
            ],

            search: '',
        }
    },

    async asyncData({ store }) {
        await store.dispatch('admin/product/getProductsData')
    },

    computed: {
        products() {
            return this.$store.state.admin.product.products
        }
    },

    methods: {
        searchData() {
            this.$store.commit('admin/product/SET_PAGE', 1)
            this.$store.dispatch('admin/product/getProductsData', this.search)
        },

        changePage(page) {
            this.$store.commit('admin/product/SET_PAGE', page)
            this.$store.dispatch('admin/product/getProductsData', this.search)
        },

        destroyProduct(id) {
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
                    this.$store.dispatch('admin/product/destroyProduct', id)
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