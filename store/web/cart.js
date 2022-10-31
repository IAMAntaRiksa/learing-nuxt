export const state = () => ({
    carts: [],
    //cartPrice
    cartPrice: 0,
    //cartWeight
    cartWeight: 0
})

export const mutations = {

    SET_CARTS_DATA(state, payload) {
        state.carts = payload
    },

    SET_CART_PRICE(state, payload) {
        state.cartPrice = payload
    },
    SET_CART_WEIGHT(state, payload) {
        state.cartWeight = payload
    }
}

export const actions = {
    getCartsData({ dispatch, commit }) {
        //set promise
        return new Promise((resolve, reject) => {
            //fetching Rest API "/api/web/carts" with method "GET"
            this.$axios.get('/api/web/carts')
                //success
                .then((response) => {
                    //commit ti mutation "SET_CARTS_DATA"
                    commit('SET_CARTS_DATA', response.data.data)
                    //dispatch "getCartPrice"
                    dispatch('getCartPrice')
                    //dispatch "getCartWeight"
                    dispatch('getCartWeight')
                    //resolve promise
                    resolve()
                })

        })

    },

    getCartPrice({ commit }) {
        //set promise
        return new Promise((resolve, reject) => {
            //fetching Rest API "/api/web/carts/total_price" with method "GET"
            this.$axios.get('/api/web/carts/total_price')
                .then((response) => {
                    commit('SET_CART_PRICE', response.data.data)
                    //resolve promise
                    resolve()
                })
        })
    },
    getCartWeight({ commit }) {
        //set promise
        return new Promise((resolve, reject) => {
            //fetching Rest API "/api/web/carts/total_price" with method "GET"
            this.$axios.get('/api/web/carts/total_weight')
                .then((response) => {
                    commit('SET_CART_WEIGHT', response.data.data)
                    //resolve promise
                    resolve()
                })
        })
    },

    storeCart({ dispatch }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.post(`/api/web/carts`, payload)
                .then((response) => {
                    dispatch('getCartsData');
                    resolve()
                }).catch((err) => {
                    reject(err)
                });
        });
    },
    removeCart({ dispatch }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.post(`/api/web/carts/remove`, payload)
                .then((response) => {
                    dispatch('getCartsData');
                    resolve()
                }).catch((err) => {
                    reject(err)
                });
        });
    }
}