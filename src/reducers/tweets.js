import {
    RECEIVE_TWEETS,
    TOGGLE_TWEETS,
    ADD_TWEETS
} from '../actions/tweets'

import authedUser from './authedUser';

export default function tweets(state = {}, action) {
    switch (action.type) {
        case RECEIVE_TWEETS:
            return {
                //using ... object spread operator to combine new objects
                ...state,
                ...action.tweets
            }
        case TOGGLE_TWEETS:
            return {
                ...state,
                [action.id]:{
                    ...state[action.id],
                    likes:action.hasLiked === true
                    ? state[action.id].likes.filter(uid=>uid !== action.authedUser)
                    : state[action.id].likes.concat([action.authedUser])
                }
            }
        case ADD_TWEETS:
            const {tweet} = action

            let replyingTo = {}
            if(tweet.replyingTo !== null){
                replyingTo = {
                    [tweet.replyingTo]:{
                        ...state[tweet.replyingTo],
                        //add tweet id to replies
                        replies:state[tweet.replyingTo].replies.concat([tweet.id])
                    }
                }
            }

            return {
                ...state,
                [action.tweet.id]:action.tweet,
                ...replyingTo,
            }
        
        default:
                return state
    }
}