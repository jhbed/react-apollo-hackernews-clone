import React, { Component } from 'react';
import { Mutation, graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { FEED_QUERY } from './LinkList'

const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;


class CreateLink extends Component {
  state = {
    description: '',
    url: '',
  };

  render() {
    const { description, url } = this.state;
    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={description}
            onChange={e => this.setState({ description: e.target.value })}
            type="text"
            placeholder="A description for the link"
          />
          <input
            className="mb2"
            value={url}
            onChange={e => this.setState({ url: e.target.value })}
            type="text"
            placeholder="The URL for the link"
          />
        </div>
        <Mutation mutation={POST_MUTATION} 
                  variables={{ description, url }}
                  onCompleted={() => this.props.history.push('/')}
                  update={(store, { data: { post } }) => {
                    const data = store.readQuery({ query: FEED_QUERY })
                    data.feed.links.unshift(post)
                    store.writeQuery({
                      query: FEED_QUERY,
                      data
                    })
                  }}
                  
        >
            {postMutation => <button onClick={postMutation}>Submit</button>}
        </Mutation>
      </div>
    )
  }
}

export default CreateLink