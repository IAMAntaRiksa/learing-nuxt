export const state = () => ({
    sliders: []
})
export const mutations = {
    SET_SLIDERS_DATA(state, payload) {
        state.sliders = payload
    }
}
export const actions = {
    getSlidersData({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/web/sliders`, payload)
                .then((response) => {
                    commit('SET_SLIDERS_DATA', response.data.data)
                    resolve()
                }).catch((err) => {
                    reject(err)
                });
        });
    }
}