<template>
    <main class="c-main">
        <div class="container-fluid">
            <div class="fade-in">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card border-0 rounded shadow-sm border-top-orange">
                            <div class="card-header">
                                <span class="font-weight-bold"><i class="fa fa-users"></i> USERS</span>
                            </div>
                            <div class="card-body">

                                <div class="form-group">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <nuxt-link :to="{name : 'admin-users-create'}"
                                                class="btn btn-warning btn-sm" style="padding-top: 10px;">
                                                <i class="fa fa-plus-circle"></i> ADD NEW
                                            </nuxt-link>
                                        </div>
                                        <input v-model="search" @keypress.enter="searchData" type="text"
                                            class="form-control" placeholder="cari berdasarkan nama user">
                                        <div class="input-group-append">
                                            <button @click="searchData" class="btn btn-warning"><i
                                                    class="fa fa-search"></i>
                                                SEARCH
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <b-table striped bordered hover :items="users.data" :fields="fields" show-empty>
                                    <template v-slot:cell(image)="datas">
                                        <img class="img-fluid" width="50" :src="datas.item.image" />
                                    </template>
                                    <template v-slot:cell(actionse)="row">
                                        <b-button :to="{name: 'admin-users-edit-id', params: {id: row.item.id}}"
                                            variant="info" size="sm">
                                            EDIT
                                        </b-button>
                                        <b-button variant="danger" size="sm" @click="destroyUser(row.item.id)">
                                            DELETE</b-button>
                                    </template>
                                </b-table>
                                <b-pagination align="left" :value="users.current_page" :total-rows="users.total"
                                    :per-page="users.per_page" @change="changePage" aria-controls="my-table">
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
            title: 'Admin - Users'
        }
    },

    data() {
        return {
            fields: [
                {
                    label: 'User Nama',
                    key: 'name'
                },
                {
                    lebel: 'Email Addres',
                    key: 'email'
                },

                {
                    label: 'Actions',
                    key: 'actionse',
                    tdClass: 'text-center'

                }
            ],
            search: ''
        }
    },


    async asyncData({ store }) {
        await store.dispatch('admin/user/getUsersData')
    },

    computed: {
        users() {
            return this.$store.state.admin.user.users
        }
    },

    methods: {
        searchData() {
            this.$store.commit('admin/user/SET_PAGE', 1)
            this.$store.dispatch('admin/user/getUsersData', this.search)
        },
        changePage(page) {
            this.$store.commit('admin/user/SET_PAGE', page)
            this.$store.dispatch('admin/user/getUsersData', this.search)
        },

        destroyUser(id) {
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
                    this.$store.dispatch('admin/user/destroyUser', id)
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