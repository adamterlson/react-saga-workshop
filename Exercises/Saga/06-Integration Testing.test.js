import URL from 'url-parse'
import { put, takeEvery, take } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'

const linkEventChannel = {
    take() {},
    flush() {},
    close() {},
}
const makeLinkChannel = jest.fn(() => linkEventChannel)

const itemListUrl = /items+$/
const itemDetailUrl = /items\/([0-9]+|)$/

function* doLinkChannel(url) {
    const { pathname } = new URL(url)
    if (pathname.match(itemListUrl)) {
        yield put({ type: 'PUSH', payload: { screen: 'ItemList' } })
    }

    if (pathname.match(itemDetailUrl)) {
        const [, id] = pathname.match(itemDetailUrl)
        yield put({
            type: 'PUSH',
            payload: {
                screen: 'ItemDetail',
                passProps: { id: parseInt(id, 10) },
            },
        })
    }
}

function* watchLinkChannel() {
    const linkChannel = makeLinkChannel()
    const url = yield takeEvery(linkChannel, doLinkChannel)
}

describe('Deeplinks', () => {
    let makeSagaWithLink = link =>
        expectSaga(watchLinkChannel).provide([
            {
                take({ channel }, next) {
                    if (channel === linkEventChannel) {
                        return link
                    }

                    return next()
                },
            },
        ])

    beforeEach(() => {
        makeLinkChannel.mockReturnValue(linkEventChannel)
    })

    it('navigates to ItemList on /items', () => {
        return expectSaga(watchLinkChannel)
            .provide([[take(linkEventChannel), '/items']])
            .put({ type: 'PUSH', payload: { screen: 'ItemList' } })
            .silentRun()
    })

    it('navigates to ItemDetail', () => {
        return expectSaga(watchLinkChannel)
            .provide([[take(linkEventChannel), '/items']])
            .put({ type: 'PUSH', payload: { screen: 'ItemList' } })
            .silentRun()
    })
})
