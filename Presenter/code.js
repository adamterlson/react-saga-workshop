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
    const { error, payload } = yield call(somethingDangerous)
}
