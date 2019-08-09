import React, { Component } from 'react'
import Tweet from './Tweet';
import {handleAddTweet} from '../actions/tweets'
import { connect } from 'react-redux'
import { dispatch } from 'rxjs/internal/observable/range';

class NewTweet extends Component {

    state = {
        text:''
    }

    handleChange = e => {
        const text = e.target.value

        this.setState(()=>({
            text
        }))
    }

    handleSubmit = e => {
        e.preventDefault()

        const {text} = this.state
        const {dispatch,id} = this.props

        console.log('New Tweet: ',text);

        dispatch(handleAddTweet(text,id))

        this.setState(()=>({
            text:''
        }))
    }

    render() {

        const {text} = this.state

        {/* todo: redirect to home */}

        const tweetLeft = 280 - text.length

        return (
            <div>
                <h3 className='center'>Compose a new Tweet</h3>
                <form className='new-tweet' onSubmit={this.handleSubmit}>
                    <textarea
                        placeholder="what's happening"
                        value={text}
                        onChange={this.handleChange}
                        className='textarea'
                        maxLength={280}
                    />
                    {tweetLeft <= 100 && (
                        <div className='tweet-length'>
                            {tweetLeft}
                        </div>
                    )}
                    <button
                        className='btn'
                        type='submit'
                        disabled={text === ''}
                    >
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}

export default connect()(NewTweet)