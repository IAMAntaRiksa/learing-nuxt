<template>
    <main class="c-main">
        <div class="container-fluid">
            <div class="fade-in">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card border-0 rounded shadow-sm border-top-orange">
                            <div class="card-header">
                                <span class="font-weight-bold"><i class="fa fa-shopping-cart"></i> INVOICE</span>
                            </div>
                            <div class="card-body">
                                <div class="form-group">
                                    <div class="input-group mb-3">
                                        <input @keypress.enter="searchData" v-model="search" type="text"
                                            class="form-control" placeholder="cari berdasarkan no. invoice">
                                        <div class="input-group-append">
                                            <button @click="searchData" class="btn btn-warning"><i
                                                    class="fa fa-search"></i>
                                                SEARCH
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <b-table striped bordered hover :items="invoices.data" :fields="fields" show-empty>
                                    <template v-slot:cell(grand_total)="row">
                                        Rp. {{ formatPrice(row.item.grand_total) }}
                                    </template>
                                    <template v-slot:cell(status)="row">
                                        <button v-if="row.item.status == 'pending'" class="btn btn-sm btn-primary"><i
                                                class="fa fa-circle-notch fa-spin"></i> {{ row.item.status }}</button>
                                        <button v-if="row.item.status == 'success'" class="btn btn-sm btn-success"><i
                                                class="fa fa-check-circle"></i> {{ row.item.status }}</button>
                                        <button v-if="row.item.status == 'expired'" class="btn btn-sm btn-warning-2"><i
                                                class="fa fa-exclamation-triangle"></i> {{ row.item.status }}</button>
                                        <button v-if="row.item.status == 'failed'" class="btn btn-sm btn-danger"><i
                                                class="fa fa-times-circle"></i> {{ row.item.status }}</button>
                                    </template>
                                    <template v-slot:cell(actions)="row">
                                        <b-button :to="{name: 'admin-invoices-show-id', params: {id: row.item.id}}"
                                            variant="info" size="sm">
                                            DETAIL
                                        </b-button>
                                    </template>
                                </b-table>
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
            title: 'admin - Invoices'
        }
    },

    data() {
        return {
            fields: [
                {
                    label: 'No. Invoice',
                    key: 'invoice'
                },
                {
                    label: 'Customer',
                    key: 'customer.name'
                },
                {
                    label: 'Grand Total',
                    key: 'grand_total'
                },
                {
                    label: 'Status Payment',
                    key: 'status',
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
        await store.dispatch('admin/invoice/getInvoicesData')
    },

    computed: {
        invoices() {
            return this.$store.state.admin.invoice.invoices
        }
    },

    methods: {
        searchData() {
            this.$store.commit('admin/invoice/SET_PAGE', 1)
            this.$store.dispatch('admin/invoice/getInvoicesData', this.search)
        }
    }
}
</script>

<style>

</style>