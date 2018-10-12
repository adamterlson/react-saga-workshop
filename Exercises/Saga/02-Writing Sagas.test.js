/*
The fight is on, and it's a battle to the death.

The monster has more life and attacks faster than you, but attacks with a frenzy and so tends to miss.

You are a calm and methodical mage.  And you make up for your lack of HP by having a stash of potions.
*/

import { delay, channel } from 'redux-saga'
import { expectSaga, testSaga } from 'redux-saga-test-plan'
import { call, put, all, take, fork, race, takeEvery } from 'redux-saga/effects'

/**
 * STEP: 1
 * The monster is berserk
 * It continually attacks every 2ms
 * It has an 80% chance of missing
 * If it does not miss, hero takes damage ({ type: 'HERO_DAMAGE' })
 */
function* monsterAttack() {}

/**
 * STEP 2:
 * A mage attacks by continually casting spells
 * A spell takes 5ms to complete
 * If damage is taken ({ type: 'HERO_DAMAGE' }) during casting, casting is interrupted
 * If casting completes, monster takes damage ({ type: 'MONSTER_DAMAGE' })
 */
function* heroAttack() {}

/**
 * STEP 3:
 * Create an inventory of 5 potions.
 * A hero continually consumes potions
 * A potion takes 10ms to apply
 * When consumed, heal ({ type: 'HEAL' })
 */
function* heal() {}

/**
 * STEP 4:
 * The battle itself.
 * Start all activities in parallel.
 */
function* fightMonster() {}

/**
 * The following utilities are for the gameplay mechanics.
 * Refer as necessary, but modification is not necessary.
 */
function* logger() {
    while (true) {
        const action = yield take(() => true)
        console.log(action)
    }
}
function* watchHeroHealth(heroHealth) {
    yield takeEvery('HERO_DAMAGE', function*() {
        heroHealth = heroHealth - 1
        console.log('hero damage applied', heroHealth)
        if (heroHealth === 0) {
            console.log('putting defeat')
            yield put({ type: 'DEFEAT' })
        }
    })
    yield takeEvery('HEAL', function*() {
        heroHealth = heroHealth + 1
        console.log('hero heal applied', heroHealth)
    })
}
function* watchMonsterHealth(monsterHealth) {
    while (true) {
        yield take('MONSTER_DAMAGE')
        monsterHealth = monsterHealth - 1
        console.log('monster damage applied', monsterHealth)
        if (monsterHealth === 0) {
            console.log('putting victory')
            yield put({ type: 'VICTORY' })
        }
    }
}
function* gameplaySaga() {
    yield fork(logger)
    yield fork(watchHeroHealth, 2)
    yield fork(watchMonsterHealth, 5)
    const { victory, defeat, fight } = yield race({
        victory: take('VICTORY'),
        defeat: take('DEFEAT'),
        fight: call(fightMonster),
    })
    console.log(victory ? 'VICTORY' : 'DEFEAT')
}

describe('Monster Fight', () => {
    it('runs', () => {
        return expectSaga(gameplaySaga).silentRun()
    })
})
