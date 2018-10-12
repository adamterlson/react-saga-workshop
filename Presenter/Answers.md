# Exercise 01:

```javascript
function* gameplaySaga() {
    let alive = yield select(state => state.alive)
    while (alive) {
        const { safe } = yield take('MOVE')
        if (safe) continue
        const diceRoll = yield call(Math.random)
        if (diceRoll >= 0.5) continue
        yield call(fightMonster)
    }
}
```

# Exercise 02:

```javascript
function* monsterAttack() {
    while (true) {
        const roll = yield call(Math.random)
        if (roll <= 0.2) {
            yield put({ type: 'HERO_DAMAGE' })
        }
        yield call(delay, 2)
    }
}

function* heroAttack() {
    while (true) {
        const { cast } = yield race({
            cast: call(delay, 5),
            interrupted: take('HERO_DAMAGE'),
        })
        if (cast) {
            yield put({ type: 'MONSTER_DAMAGE' })
        }
    }
}

function* heal() {
    const bandage = channel()
    for (let i = 0; i < 5; i++) {
        bandage.put('bandage')
    }

    while (true) {
        yield take(bandage)
        yield call(delay, 10)
        yield put({ type: 'HEAL' })
    }
}

function* fightMonster() {
    yield fork(heal)
    yield fork(heroAttack)
    yield fork(monsterAttack)
}
```