import React, {useState, useEffect} from 'react';
import { Comment, Header } from 'semantic-ui-react'
import AuthorTag from '../common/AuthorTag'
import 'semantic-ui-css/components/comment.min.css'
// import TextUpload, {validateCharacterLength} from '../common/TextUpload'

// PostComment dependencies
import FormattedContent from './view/FormattedContent'
import { Button, KIND } from "baseui/button";
import { Textarea } from "baseui/textarea";
import { FormControl } from "baseui/form-control"
import { StyledLink } from "baseui/link";
import { server } from '../../api'
import { withRouter } from "react-router";
import { Info, Error } from '../common/Notifications';

const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };  
const validateCharacterLength = (str, maxLength) => {
  let errorMsg
  if (str.length > maxLength) errorMsg = `-${str.length - maxLength}`
  return errorMsg
}

const PostComment = ({ articleId, then }) => {
  const [comment, setComment] = useState('');
  const [isEditting, setEditting] = useState(false);
  const [error, setError] = useState(null);
  const save = () => {
    server.saveComment(articleId, comment)
      .then(r => {
        if (r.error) {
          setError(r.error)
        } else {
          reset()
          then()
        }
      })
      .catch(e => setError('Failed to update (request failed)'))
  }
  const reset = () => {
    setComment('');
    setEditting(false);
    setError(null);
  }

  if (isEditting) return (
    <FormControl error={isEditting && error}> 
      <div>
        <div style={{marginTop: '5px', marginBottom: '5px'}}>
          <Textarea
                  autoFocus 
                  value={comment}
                  error={error}
                  onChange={e => {
                    const { value } = e.target
                    setComment(value);
                    setError(validateCharacterLength(value, 1000))
                  }} />
        </div>
        <div>
          <Button kind={KIND.primary} onClick={save}>Save</Button>
          <Button kind={KIND.secondary} onClick={reset}>Cancel</Button>
        </div>
      </div>  
    </FormControl>)
  else return (
    <StyledLink style={{cursor: 'pointer'}} onClick={()=> setEditting(true)}>Add a comment</StyledLink>
  )

}

function Comments({ articleId, user, history }) {
  const [comments, setComments] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchComments = () => {
    setLoading(true);
    server.getComments(articleId, null)
      .then(r => {
        if (r.error) {
          setError(r.error);
        } else {
          setComments(r.comments);
        }
        setLoading(false);
      })
      .catch(e => {
        setError('Failed to fetch comments');
        setLoading(false);
      })
  }
  useEffect(() => {
    if (!comments && !error && !isLoading) fetchComments()
  });

  if (comments && comments.length > 0) {
    return (
      <Comment.Group>
        <Header as='h2' dividing>
          Comments
        </Header>
        {user 
          ? (<PostComment articleId={articleId} then={fetchComments} />) 
          : null
        }
        {comments && comments.map((c, idx) => (
          <Comment key={idx}>
            <Comment.Content>
              <Comment.Author><AuthorTag authorId={c.user_id} /></Comment.Author>
              <Comment.Metadata>
                {new Date(c.created_at).toLocaleDateString('en-US', dateOptions)}
              </Comment.Metadata>
              <Comment.Text>{c.value}</Comment.Text>
            </Comment.Content>
          </Comment>
        ))}
      </Comment.Group>
    )
  } else if (user) {
    return <Comment.Group>
      <Header as='h2' dividing>
        Comments
      </Header>
      <PostComment articleId={articleId} then={fetchComments} />
    </Comment.Group>
  } else {
    return null;
  }
  
}

//TODO: add <Comment.Avatar src='/images/avatar/small/matt.jpg' />
//Todo: add replies <Comment.Actions>
            //   <Comment.Action onClick={() => }>Reply</Comment.Action>
            // </Comment.Actions>

export default withRouter(Comments)