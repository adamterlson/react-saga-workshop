import { expectSaga } from 'redux-saga-test-plan'
import { delay } from 'redux-saga'
import { race, take, call, put } from 'redux-saga/effects'

const fetch = jest.fn()

function* connectivityCheck() {
    try {
        const res = yield call(fetch, '/api/ping')
        if (res && res.ok) {
            yield put({ type: 'ONLINE' })
        }
    } catch (e) {}
}

export default function* connectivity() {
    while (true) {
        yield take('OFFLINE')
        yield race([call(connectivityCheck), take('ONLINE'), call(delay, 5000)])
    }
}

describe('OFFLINE', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })
    it('pings to the server', () => {
        return expectSaga(connectivity)
            .dispatch({ type: 'OFFLINE' })
            .call(fetch, '/api/ping')
            .silentRun()
    })
    it('dispatches online if server responds ok', () => {
        fetch.mockReturnValueOnce({ ok: true })
        return expectSaga(connectivity)
            .dispatch({ type: 'OFFLINE' })
            .put({ type: 'ONLINE' })
            .silentRun()
    })
    it('times out after 5 seconds', () => {
        fetch.mockReturnValueOnce(() => new Promise())
        return expectSaga(connectivity)
            .dispatch({ type: 'OFFLINE' })
            .provide([[call(delay, 5000), true]])
            .silentRun()
            .then(() => {
                expect(fetch).toHaveBeenCalledTimes(1)
            })
    })
})
