export const state = () => ({
    users: [],

    page: 1,

    user: {}
})

export const mutations = {

    SET_USERS_DATA(state, payload) {
        state.users = payload
    },

    SET_PAGE(state, payload) {
        state.page = payload
    },
    SET_USER_DATA(state, payload) {
        state.user = payload
    }
}

export const actions = {
    getUsersData({ commit, state }, payload) {
        let search = payload ? payload : ''
        return new Promise((resolve, reject) => {
            this.$axios.get(`api/admin/users?q=${search}&page=${state.page}`)
                .then((response) => {
                    commit('SET_USERS_DATA', response.data.data)
                    resolve()
                }).catch((err) => {
                    reject(err)
                });
        });
    },
    storeUser({ dispatch }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.post(`api/admin/users`, payload)
                .then(() => {
                    dispatch('getUsersData')
                    resolve()
                }).catch((err) => {
                    reject(err)
                });
        });
    },
    getDetailUser({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`api/admin/users/${payload}`)
                .then((response) => {
                    commit('SET_USER_DATA', response.data.data)
                    resolve()
                }).catch((err) => {
                    reject(err)
                });
        });
    },

    updateUser({ dispatch }, { userId, payload }) {
        return new Promise((resolve, reject) => {
            this.$axios.post(`api/admin/users/${userId}`, payload)
                .then(() => {
                    dispatch('getUsersData')
                    resolve()
                }).catch((err) => {
                    reject(err)
                });
        });
    },
    destroyUser({ dispatch }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.delete(`api/admin/users/${payload}`)
                .then(() => {
                    dispatch('getUsersData')
                    resolve()
                }).catch((err) => {
                    reject(err)
                });
        });
    }
}