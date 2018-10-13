# Building with Saga

## Side Effects

-   UI
-   API
-   Inputs and modals
-   State changes (app closing, etc)
-   Device
-   Others?

## Business Logic

## What is a "Saga"

- A long running function designed to completely respond to a single side-effect
- 100% business logic

## Why yield?
Yield returns an effect-descriptor object which instructs the saga runner which actions to perform.

Generators can run forever

## `Put`

```javascript
yield put({ type: 'API_RESPONSE' })
```

Notice the actions are not anything special, they are the side-effect description

## `Call/Fork`
- Execute a function
- Technically optional
- Primarily for testing
- fn() vs yield fn() vs yield call(fn) vs yield* fn()

## `Race`
- Continue when at least one is finished
- Cancel the loser

## `Select`
- Avoid it if you can

## `Take`—Watcher Pattern
Saved the best for last

Respond to a side-effect modeled as an action
For me, the definition of a "Saga"

No need to prematurely use takeEvery and split our function

```javascript
while (true) {
    const action = yield take('API_REQUEST')
    yield put('API_RESPONSE')
    // ...
}
```

Or, in business logic form

```javascript
while (true) {
    const action = yield take('MY_BUTTON_PRESS')
    yield put({ type: 'API_REQUEST' /* path, body, etc */ })
    yield take('API_RESPONSE')
    yield call(Alert.alert)
}
```

Disadvantage having the same name for every request,

Now you can easily write logic which responds to side effect and handles that side effect completely, for your entire application.  

## Channels and Buffers

If we need to keep our own personal store of actions while continuing work, create a channel

Pairs with a watcher

```javascript
const chan = yield actionChannel('REQUEST')

while (true) {
    const action = yield take('API_REQUEST')
    yield put('API_RESPONSE')
}
```

## Error handling

Handle your error as close to the side effect source as possible.  Everything else must propagate

```javascript
while (true) {
    yield take('API_REQUEST')
    try {
        yield call(somethingDangerous)
    } catch (ex) {
        // Do something
    }
}
```


Consider using transactions

```javascript
while (true) {
    yield take('API_REQUEST')
    const { error, payload } = yield call(somethingDangerous)
}
```

Can "auto-restart" your saga

```javascript
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
```

# Exercises

-   Custom API buffer?

# Discussion Questions

-   What are your use-cases for saga currently?
-   What other use-cases might be considered?
-   What is the most difficult/challenging workflow in the app?
-   Where does "business logic" exist currently?
