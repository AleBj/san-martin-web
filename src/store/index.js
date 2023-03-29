export const state = () => ({
    selected_json: null
})
export const mutations = {
    setSelectedJson(state, selectedJson) {
        state.selected_json = selectedJson
    }
}
export const getters = {
    getSelectedJson(state) {
        return state.selected_json
    }
}