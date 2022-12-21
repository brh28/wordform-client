import React, {useState} from 'react';
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

const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };  
const validateCharacterLength = (str, maxLength) => {
  let errorMsg
  if (str.length > maxLength) errorMsg = `-${str.length - maxLength}`
  return errorMsg
}

const PostComment = ({ articleId, then }) => { // onEdit
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

function Comments({ articleId, data, onEdit }) {
  return (
    <Comment.Group>
      <Header as='h2' dividing>
        Comments
      </Header>
      <PostComment articleId={articleId} then={onEdit} />
      {data && data.map((c, idx) => (
        <Comment key={idx}>
          <Comment.Content>
            <Comment.Author><AuthorTag authorId={c.user_id} /></Comment.Author>
            <Comment.Metadata>
              {new Date(c.timestamp).toLocaleDateString('en-US', dateOptions)}
            </Comment.Metadata>
            <Comment.Text>{c.value}</Comment.Text>
          </Comment.Content>
        </Comment>
      ))}
    </Comment.Group>
  )
}

//TODO: add <Comment.Avatar src='/images/avatar/small/matt.jpg' />
//Todo: add replies <Comment.Actions>
            //   <Comment.Action onClick={() => }>Reply</Comment.Action>
            // </Comment.Actions>

export default Comments