import { testSaga } from 'redux-saga-test-plan'
import { call, put, all, take } from 'redux-saga/effects'

function* fetchResource(resource) {
    const { ok, data } = yield call(fetch, resource)
    if (ok) {
        yield put({ type: 'RECEIVE', payload: data })
    } else {
        yield put({ type: 'ERROR' })
    }
    return ok
}

function* watcher() {
    while (true) {
        yield take('BUTTON_PRESS')
        const [users, comments] = yield all([call(fetchResource, 'users'), call(fetchResource, 'comments')])
        if (users && comments) {
            yield call(alert, 'Success!')
        }
    }
}

describe('watcher', () => {
    let saga = testSaga(watcher)
    it('fetches users', () => {})
    it('fetches comments', () => {})
    it('alerts success', () => {})
})

describe('fetchResource', () => {
    let saga = testSaga(fetchResource)
    it('fetches a resource', () => {})
    it('receives the response', () => {})
    it('reports errors', () => {})
})
