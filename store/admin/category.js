export const state = () => ({
    categories: [],
    page: 1,
    category: {}
})
export const mutations = {
    SET_CATEGORIES_DATA(state, payload) {
        state.categories = payload
    },
    SET_PAGE(state, payload) {
        state.page = payload
    },
    SET_CATEGORY_DATA(state, payload) {
        state.category = payload
    }
}
export const actions = {
    // ambil data categories 
    getCategoriesData({ commit, state }, payload) {
        let search = payload ? payload : ''
        return new Promise((resolve, reject) => {
            this.$axios.$get(`/api/admin/categories?q=${search}&page=${state.page}`)
                .then((response) => {
                    commit('SET_CATEGORIES_DATA', response)
                    resolve()
                }).catch((err) => {
                    reject(err.response.data.errors);
                });
        });
    },
    storeCategory({ dispatch }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.post(`/api/admin/categories`, payload)
                .then(() => {
                    dispatch('getCategoriesData')
                    resolve();
                }).catch((err) => {
                    reject(err.response.data.errors);
                });
        });
    },
    getDetailCategory({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/admin/categories/${payload}`)
                .then((response) => {
                    console.log(response)
                    commit('SET_CATEGORY_DATA', response.data)
                    resolve()
                }).catch((err) => {
                    reject(err.response.data.errors);
                });
        });
    },
    updateCategory({ dispatch }, { categoryId, payload }) {
        return new Promise((resolve, reject) => {
            this.$axios.post(`/api/admin/categories/${categoryId}`, payload)
                .then(() => {
                    dispatch('getCategoriesData')
                    resolve()
                }).catch((err) => {
                    reject(err.response.data.errors)
                });
        });
    },
    destroyCategory({ dispatch }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.delete(`/api/admin/categories/${payload}`)
                .then(() => {
                    dispatch('getCategoriesData')
                    resolve()
                }).catch((err) => {
                    reject(err.response.data.data)
                });
        });
    }
}
