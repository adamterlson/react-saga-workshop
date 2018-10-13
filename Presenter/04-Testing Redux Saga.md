# Testing Redux Saga

## Testing options

### With Native saga

```javascript
test('getProducts Saga test', function(t) {
    const generator = getAllProducts()

    let next = generator.next({ type: 'GET_ALL_PRODUCTS' })
    t.deepEqual(next.value, call(api.getProducts), 'must yield api.getProducts')

    next = generator.next(products)
    t.deepEqual(next.value, put(actions.receiveProducts(products)), 'must yield actions.receiveProducts(products)')

    t.end()
})
```

### With Redux Saga Test Plan

```javascript
testSaga(performMath, 40, 2)
    .next()
    .take('HELLO')
    .next(action)
    .put({ type: 'ADD', payload: 42 })
    .next()
    .isDone()
```

## Exercise 01-Unit Testing

http://redux-saga-test-plan.jeremyfairbank.com/unit-testing/

## Unit testing

Problems with unit testing: You'll find that any time the order of your code changes, the test has to be updated

It basically says that your function is your function

## Integration testing

Focuses on the ins and outs of the saga "module"

A module is separated by actions

```javascript
expectSaga(performMath, 40, 2)
    .dispatch(action)
    .put({ type: 'ADD', payload: 42 })
    .run();
```

## Setting up for success

- Avoid selecting from state unless really really necessary, pass it in on the action
- Functions should do one thing well, including being a user flow "Saga"