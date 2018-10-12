import { testSaga } from 'redux-saga-test-plan'
import { race, put, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'

function* fetchPostsWithTimeout() {
    const { posts, timeout } = yield race({
        posts: call(fetch, '/posts'),
        timeout: call(delay, 1000),
    })

    if (posts) {
        yield put({ type: 'POSTS_RECEIVED', posts })
    } else {
        yield put({ type: 'TIMEOUT_ERROR' })
    }
}

describe('fetchPostsWithTimeout', () => {
    let saga
    beforeEach(() => testSaga(fetchPostsWithTimeout))
    it('receives posts', () => {})
    it('times out', () => {})
    it('reports errors', () => {})
})
