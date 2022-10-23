export const state = () => ({
    categories: [],
    categoryHeader: [],
    category: {},
})

export const mutations = {
    SET_CATEGORIES_DATA(state, payload) {
        state.categories = payload
    },
    SET_CATEGORYHEADER_DATA(state, payload) {
        state.categoryHeader = payload
    },
    SET_CATEGORY_DATA(state, payload) {
        state.category = payload
    }
}


export const actions = {
    getCategoriesData({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/web/categories`, payload)
                .then((response) => {
                    commit('SET_CATEGORIES_DATA', response.data.data)
                    resolve()
                }).catch((error) => {
                    reject(error)
                });
        });
    },
    getCategoryHeader({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/web/categoryHeader`, payload)
                .then((response) => {
                    commit('SET_CATEGORYHEADER_DATA', response.data.data)
                    resolve()
                }).catch((error) => {
                    reject(error)
                });
        });
    },
    getDetailCategory({ commit }, payload) {
        return new Promise((resolve, reject) => {
            //get to Rest API "/api/web/categories/:slug" with method "GET"
            this.$axios.get(`/api/web/categories/${payload}`)
                .then((response) => {
                    commit('SET_CATEGORY_DATA', response.data.data)
                    resolve()
                }).catch((err) => {
                    reject(err)
                });
        })
    },

}