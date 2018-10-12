import URL from 'url-parse'
import { put, takeEvery } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import { makeLinkChannel } from './channels'
jest.mock('./channels')

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

// Have to split due to bug in RSTP?
function* watchLinkChannel() {
    const linkChannel = makeLinkChannel()
    const url = yield takeEvery(linkChannel, doLinkChannel)
}

describe('Deeplinks', () => {
    const fakeChannel = {
        take() {},
        flush() {},
        close() {},
    }

    let makeSagaWithLink = link =>
        expectSaga(watchLinkChannel).provide([
            {
                take({ channel }, next) {
                    if (channel === fakeChannel) {
                        return link
                    }

                    return next()
                },
            },
        ])

    beforeEach(() => {
        makeLinkChannel.mockReturnValue(fakeChannel)
    })

    it('navigates to ItemList', () =>
        makeSagaWithLink('/items')
            .put({ type: 'PUSH', payload: { screen: 'ItemList' } })
            .run())

    it('navigates to ItemDetail', () =>
        makeSagaWithLink('/items/10')
            .put({
                type: 'PUSH',
                payload: { screen: 'ItemDetail', passProps: { id: 10 } },
            })
            .run())
})
