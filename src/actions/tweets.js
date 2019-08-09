import {saveLikeToggle,saveTweet} from '../utils/api'
import {showLoading,hideLoading} from 'react-redux-loading'
import authedUser from '../reducers/authedUser';
import { dispatch } from 'rxjs/internal/observable/range';
import tweets from '../reducers/tweets';

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const TOGGLE_TWEETS = 'TOGGLE_TWEETS'
export const ADD_TWEETS = 'ADD_TWEETS'


function addTweet(tweet) {
    return{
        type:ADD_TWEETS,
        tweet
    }
}

export function handleAddTweet(text,replyingTo){
    return (dispatch,getState)=>{
        const {authedUser} = getState()

        dispatch(showLoading())

        return saveTweet({
            text,
            author:authedUser,
            replyingTo
        })
            .then(tweet=>dispatch(addTweet(tweet)))
            .then(()=>dispatch(hideLoading()))
    }
}

//action creator
export function receiveTweets(tweets){
    return{
        type: RECEIVE_TWEETS,
        tweets,
    }
}

function toogleTweets({id,authedUser,hasLiked}){
    return{
        type:TOGGLE_TWEETS,
        id,
        authedUser,
        hasLiked
    }
}

//using redux-thunk to handle async action
export function handleToggleTweet(info){
    return (dispatch)=>{
        //using optimistic operation here
        dispatch(toogleTweets(info))

        return saveLikeToggle(info)
            .catch(e=>{
                console.log('error in handleToggleTweet',e)
                dispatch(toogleTweets(info))
                alert('The was an error liking the tweet.Try again.')
            })
    }
}