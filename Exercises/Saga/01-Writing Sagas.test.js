/* 
Inspired by:
https://decembersoft.com/posts/redux-hero-part-4-every-hero-needs-a-villain-a-fun-introduction-to-redux-saga-js/ 
*/

/*
Create a saga to represent a typical adventure game:

loop while player is still alive
    wait for player to move
    are we in a safe place?
    if not, randomly decide if there is a monster (50-50)
    fight the monster if there is one
end loop

*/

import { expectSaga, testSaga } from 'redux-saga-test-plan'
import { call, put, all, take, select } from 'redux-saga/effects'

// State of { alive: true } / { alive: false } is available
// Actions: { type: 'MOVE', safe: true / false }
// Call fightMonster (no need to complete its implementation)

function* fightMonster() {
    /* leave me empty until Part 2 */
}

function* gameplaySaga() {}

describe('gameplay', () => {
    it('moves safely', () => {
        return expectSaga(gameplaySaga)
            .withState({ alive: true })
            .take('MOVE')
            .silentRun()
    })
    it('doesnt move when dead', () => {
        return expectSaga(gameplaySaga)
            .withState({ alive: false })
            .not.take('MOVE')
            .silentRun()
    })
    it('doesnt roll when safe', () => {
        return expectSaga(gameplaySaga)
            .withState({ alive: true })
            .dispatch({ type: 'MOVE', safe: true })
            .not.call(fightMonster)
            .silentRun()
    })
    it('rolls when not safe', () => {
        return expectSaga(gameplaySaga)
            .withState({ alive: true })
            .dispatch({ type: 'MOVE', safe: false })
            .call(Math.random)
            .silentRun()
    })
    it('fights monsters on bad roll', () => {
        return expectSaga(gameplaySaga)
            .withState({ alive: true })
            .dispatch({ type: 'MOVE', safe: false })
            .provide([[call(Math.random), 0.1]])
            .call(fightMonster)
            .silentRun()
    })
    it('avoids monsters on good roll', () => {
        return expectSaga(gameplaySaga)
            .withState({ alive: true })
            .dispatch({ type: 'MOVE', safe: false })
            .provide([[call(Math.random), 0.9]])
            .not.call(fightMonster)
            .silentRun()
    })
})
