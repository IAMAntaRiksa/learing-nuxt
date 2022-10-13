export const state = () => ({
    products: [],

    page: 1,

    product: {}
})

export const mutations = {
    SET_PRODUCTS_DATA(state, payload) {
        state.products = payload
    },
    SET_PAGE(state, payload) {
        state.page = payload
    },
    SET_PRODUCT_DATA(state, payload) {
        state.product = payload
    }
}

export const actions = {
    getProductsData({ state, commit }, payload) {
        let search = payload ? payload : ''
        return new Promise((resolve, reject) => {
            this.$axios.get(`api/admin/products?q=${search}&page=${state.page}`)
                .then((response) => {
                    commit('SET_PRODUCTS_DATA', response.data.data)
                    resolve()
                }).catch((err) => {
                    reject(err)
                });
        });
    },
    storeProduct({ dispatch }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.post(`/api/admin/products`, payload)
                .then(() => {
                    dispatch('getProductsData')
                    resolve()
                }).catch((err) => {
                    reject(err)
                });
        });
    },

    getDetailProduct({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/admin/products/${payload}`)
                .then((response) => {
                    commit('SET_PRODUCT_DATA', response.data.data)
                    resolve()
                }).catch((err) => {
                    reject(err)
                });
        });
    },

    updateProduct({ dispatch }, { productId, payload }) {
        return new Promise((resolve, reject) => {
            this.$axios.post(`/api/admin/products/${productId}`, payload)
                .then(() => {
                    dispatch('getProductsData')
                    resolve()
                }).catch((err) => {
                    reject(err)
                });
        });
    },
    destroyProduct({ dispatch }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.delete(`api/admin/products/${payload}`)
                .then(() => {
                    dispatch('getProductsData')
                    resolve()
                }).catch((err) => {
                    reject(err)
                });
        });
    }
}   