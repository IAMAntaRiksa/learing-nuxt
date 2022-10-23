export const state = () => ({

    // state data invoices
    invoices: [],

    // state page
    page: 1,

    // state invoice
    invoice: {}
})


export const mutations = {
    SET_INVOICES_DATA(state, payload) {
        state.invoices = payload
    },
    SET_PAGE(state, payload) {
        state.page = payload
    },

    SET_INVOICE_DATA(state, payload) {
        state.invoice = payload
    },

}

export const actions = {
    getInvoicesData({ commit, state }, payload) {
        let search = payload ? payload : ''

        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/customer/invoices?q=${search}&page=${payload}`)
                .then((response) => {
                    commit('SET_INVOICES_DATA', response.data.data)
                    resolve()
                }).catch((err) => {
                    reject(err)
                });
        });
    },

    getDetailInvoice({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/customer/invoices/${payload}`)
                .then(response => {
                    //commit to mutation "SET_INVOICE_DATA"
                    commit('SET_INVOICE_DATA', response.data.data)
                    //resolve promise
                    resolve()
                })
        })

    },
}