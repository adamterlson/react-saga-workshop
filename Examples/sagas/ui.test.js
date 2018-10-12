import { expectSaga } from 'redux-saga-test-plan'
import { put, take, call, fork } from 'redux-saga/effects'
import { userConfirm } from './helpers'
jest.mock('./helpers')

const saveToApi = jest.fn()

function* watchSendMessage() {
    while (true) {
        const { payload: message } = yield take('SEND_MESSAGE')
        const confirmed = yield call(userConfirm)
        if (confirmed) {
            yield put({ type: 'OPTIMISTIC', payload: message })
            yield call(saveToApi, message)
            const { payload: res } = yield take('API_RESPONSE')
            yield put({ type: 'UPDATE_STATE', payload: res })
        }
    }
}

describe('SEND_MESSAGE', () => {
    let saga
    let message = { text: 'Hello!' }
    let res = { ok: true }

    beforeEach(() => {
        userConfirm.mockReturnValue(true)
        saga = expectSaga(watchSendMessage).dispatch({
            type: 'SEND_MESSAGE',
            payload: message,
        })
    })
    it('makes optimistic update', () => saga.put({ type: 'OPTIMISTIC', payload: message }).silentRun())
    it('confirms with user', () => saga.call(userConfirm).silentRun())
    it('updates server', () =>
        saga
            .dispatch({ type: 'API_RESPONSE', payload: res })
            .call.like({ fn: saveToApi })
            .silentRun())
    it('updates state with response', () =>
        saga
            .dispatch({ type: 'API_RESPONSE', payload: res })
            .put({ type: 'UPDATE_STATE', payload: res })
            .silentRun())
})
