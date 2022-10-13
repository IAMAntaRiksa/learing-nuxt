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
                    commit('SET_CATEGORIES_DATA', response.data)
                    //resolve promise
                    resolve()
                }).catch((err) => {
                    reject(err)
                });
        });
    },
    // create data categories
    storeCategory({ dispatch }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.post(`/api/admin/categories`, payload)
                .then(() => {
                    dispatch('getCategoriesData')
                    resolve();
                }).catch((err) => {
                    reject(err);
                });
        });
    },

    // Category berdarkan data id
    getDetailCategory({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/admin/categories/${payload}`)
                .then((response) => {
                    commit('SET_CATEGORY_DATA', response.data.data)
                    resolve()
                }).catch((err) => {
                    reject(err)
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
                    reject(err)
                });
        });
    },

    // delete category
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