
export const state = () => ({
    categories: [],
})
export const mutations = {

    SET_CATEGORIES_DATA(state, payload) {
        state.categories = payload
    },
}

export const actions = {
    getListAllCategories({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/api/web/categories', payload)
                .then((response) => {
                    commit('SET_CATEGORIES_DATA', response.data.data)
                    resolve()
                }).catch((err) => {
                    reject(err.response.data.errors)
                });
        })
    },
}