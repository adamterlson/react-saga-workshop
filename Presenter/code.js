/**
02-Constructing UI
**/

const Presentational = (props) => <View><Text /></View>




export const Button ({ onPress, title, awesome }) => <RNButton onPress={onPress} /* ... */ />
export const ButtonReact = (props) => <Button awesome />
export const ButtonAngular = (props) => <Button awesome={false} />





const Button = ({ onPress, title, awesome }) => <RNButton onPress={onPress} /* ... */ />
Button.React = (props) => <Button awesome />
Button.Angular = (props) => <Button awesome={false} />
export default Button





const Layout = data({
    onLoad: () => ({ type: 'REQUEST' })
})(Presentational)





const Layout = compose(
    data({
        onLoad: () => ({ type: 'REQUEST' })
    })
    pagination({
        onLoad: () => ({ type: 'REQUEST' }),
    }),
    pullToRefresh({
        onPull: () => ({ type: 'REQUEST' })
    }),
    searchable,
)(() => <Presentational><Presentational /></Presentational>)



/**
03-Building with Saga
**/

yield put({ type: 'API_RESPONSE' })




while (true) {
    const action = yield take('API_REQUEST')
    yield put('API_RESPONSE')
    // ...
}




while (true) {
    const action = yield take('MY_BUTTON_PRESS')
    yield put({ type: 'API_REQUEST' /* path, body, etc */ })
    yield take('API_RESPONSE')
    yield call(Alert.alert, /*...*/)
}






const chan = yield actionChannel('REQUEST')
while (true) {
    const action = yield take('API_REQUEST')
    yield put('API_RESPONSE')
}



while (true) {
    yield take('API_REQUEST')
    try {
        yield call(somethingDangerous)
    } catch (ex) {
        // Do something
    }
}



while (true) {
    yield take('API_REQUEST')
    const { error, payload } = yield call(somethingDangerous)
}


while (true) {
    try {
        yield all([
            call(one),
            call(two),
        ])
    } catch (ex) {
        console.error(ex)
    }
}

/**
04-Saga testing
**/

test('getProducts Saga test', function(t) {
    const generator = getAllProducts()

    let next = generator.next({ type: 'GET_ALL_PRODUCTS' })
    t.deepEqual(next.value, call(api.getProducts), 'must yield api.getProducts')

    next = generator.next(products)
    t.deepEqual(next.value, put(actions.receiveProducts(products)), 'must yield actions.receiveProducts(products)')

    t.end()
})



testSaga(performMath, 40, 2)
    .next()
    .take('HELLO')
    .next(action)
    .put({ type: 'ADD', payload: 42 })
    .next()
    .isDone()





expectSaga(performMath, 40, 2)
    .dispatch(action)
    .put({ type: 'ADD', payload: 42 })
    .run();