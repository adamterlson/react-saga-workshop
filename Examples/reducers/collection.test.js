const idsInsert = (state, objs) => [...state, ...objs.map(obj => obj.id)]
const byIdInsert = (state, objs) => objs.reduce((prev, obj) => ({ ...prev, [obj.id]: obj }), state)
const idsRemove = (state, id) => state.filter(i => i !== id)
const byIdRemove = (state, id) => {
    const { [String(id)]: _, ...newState } = state
    return newState
}

const defaultState = {
    ids: [],
    byId: {},
}

const collectionReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'RECEIVE': {
            return {
                ids: idsInsert(state.ids, action.payload),
                byId: byIdInsert(state.byId, action.payload),
            }
        }
        case 'REMOVE': {
            return {
                ids: idsRemove(state.ids, action.payload),
                byId: byIdRemove(state.byId, action.payload),
            }
        }
        default: {
            return state
        }
    }
}

describe('collectionReducer', () => {
    const initialState = {}
    const receivedState = {
        ids: [1, 2],
        byId: {
            '1': { id: 1 },
            '2': { id: 2 },
        },
    }
    const removedState = {
        ids: [2],
        byId: {
            '2': { id: 2 },
        },
    }
    const receiveAction = { type: 'RECEIVE', payload: [{ id: 1 }, { id: 2 }] }
    const removeAction = { type: 'REMOVE', payload: 1 }

    it('adds on RECEIVE', () => {
        expect(collectionReducer(undefined, receiveAction)).toEqual(receivedState)
    })
    it('removes on REMOVE', () => {
        expect(collectionReducer(receivedState, removeAction)).toEqual(removedState)
    })
})
