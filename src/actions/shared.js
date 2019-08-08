import {
    getInitialData
} from '../utils/api'

import {
    receiveUsers
} from '../actions/user'

import {
    receiveTweets
} from '../actions/tweets'

import {
    setAuthedUser
} from '../actions/authedUser'

const AUTHED_ID = 'tylermcginnis'

//using redux-thunk middle ware to handle Async action
export function handleInitialData() {
    return (dispatch) => {
        return getInitialData()
            .then(({
                users,
                tweets
            }) => {
                dispatch(receiveUsers(users))
                dispatch(receiveTweets(tweets))
                dispatch(setAuthedUser(AUTHED_ID))
            })
    }
}