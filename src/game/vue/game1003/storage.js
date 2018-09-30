let data = {
    playId: '461e462c-fb8a-4f9f-bdfe-ba44275c54f3'
}

export default {
    setValue: (key, value) => {
        data[key] = value
    },

    getValue: (key) => {
        return data[key]
    },

    clear: () => {
        data = {}
    },

    reset: () => {
        data = {
        }
    }
}
