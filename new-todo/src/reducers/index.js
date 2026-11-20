export function todoReducer(state, action) {
    switch (action.type) {
        case "ADD": {
            return [action.payload, ...state];
        }
        case "DELETE": {
            return state.filter((value) => value.id !== action.id);
        }
        default: {
            return state;
        }
    }
}
