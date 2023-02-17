import React, {useState, useEffect} from 'react';
import 'semantic-ui-css/components/comment.min.css'
import { Comment, Header } from 'semantic-ui-react'

import Spinner from '../common/Spinner'
// import AuthorTag from '../common/AuthorTag';
// import { Textarea } from "baseui/textarea";

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
const PostComment = ({ articleId, parentId, onSave, cancel }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);

  const postComment = () => {
    server.postComment(articleId, parentId, value)
      .then(r => {
        if (r.error) {
          setError(r.error)
        } else {
          onSave();
        }
      })
      .catch(e => {
        console.log(e); 
        setError('Request failed')
      })
  }

  return (
    <FormControl error={error}> 
      <div>
        <div style={{marginTop: '5px', marginBottom: '5px'}}>
          <Textarea
                  autoFocus 
                  value={value}
                  error={error}
                  onChange={e => {
                    const newVal = e.target.value
                    setValue(newVal);
                    setError(validateCharacterLength(newVal, 1000))
                  }} />
        </div>
        <div>
          <Button kind={KIND.primary} onClick={postComment}>Save</Button>
          <Button kind={KIND.secondary} onClick={cancel}>Cancel</Button>
        </div>
      </div>  
    </FormControl>
  )
}

const StatefulComment = withRouter(({ articleId, _id, user_id, created_at, value, reply_count, onReply, history }) => {
  const [postReply, setPostReply] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  return (
    <Comment style={{ 
      borderLeft: 'solid',
      borderWidth: '2px', 
      boxShadow: '-3px 0px 4px rgb(34 36 38 / 15%)'
    }}>
      <Comment.Content style={{ marginLeft: '10px' }}>
        <Comment.Author as='a' onClick={() => history.push(`/users/${user_id}`)}>{user_id}</Comment.Author>
        <Comment.Metadata>{new Date(created_at).toLocaleDateString('en-US', dateOptions)}</Comment.Metadata>
        <Comment.Text>{value}</Comment.Text>
        <Comment.Actions>
          { reply_count && reply_count > 0
            ? (!showReplies 
              ? <Comment.Action onClick={() => setShowReplies(true)}>▼ ({reply_count})</Comment.Action> 
              : <Comment.Action onClick={() => setShowReplies(false)}>▲</Comment.Action>)
            : null
          }
          <Comment.Action onClick={() => setPostReply(true)}>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
      { postReply || showReplies 
        ? <Comment.Group>
          { postReply 
            ? <PostComment  
                articleId={articleId}
                parentId={_id} 
                onSave={() => {
                  setPostReply(false);
                  onReply();
                }} 
                cancel={() => setPostReply(false)} /> 
            : null 
          }
          { showReplies
            ? <Replies articleId={articleId} parentId={_id} />
            : null
          }
        </Comment.Group>
        : null
      }
    </Comment>
  )
})

function Replies({ articleId, parentId }) {
  const [comments, setComments] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchComments = () => {
    setLoading(true);
    server.getComments(articleId, parentId)
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
  

  if (isLoading) return <Spinner isActive={true} /> 
  if (!comments || comments.length === 0) return 'No replies' 
  else return (
    comments?.map((c, idx) => <StatefulComment key={idx} articleId={articleId} {...c} onReply={fetchComments} />)
  )
    
}

function Comments({ articleId, user, history }) {
  const writePermissions = user; // any authenticated user can post a comment
  const [comments, setComments] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [editComment, setEditComment] = useState(false);

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
  

  if (!writePermissions && (!comments || comments.length === 0)) return null 
  else return (
    <Comment.Group>
      <Header as='h2' dividing>
        Comments ({comments ? comments.length : 0})
      </Header>

      { editComment 
        ? <PostComment  
            articleId={articleId} 
            onSave={() => {
              setEditComment(false);
              fetchComments();
            }} 
            cancel={() => setEditComment(false)} /> 
        : null 
      }
      { !editComment && writePermissions 
        ? <div style={{ marginBottom: '20px'}}>
            <StyledLink style={{cursor: 'pointer' }} onClick={()=> setEditComment(true)}>Add a comment</StyledLink>
          </div> 
        : null 
      }
      
      <Spinner isActive={isLoading} />
      {comments?.map((c, idx) => <StatefulComment key={idx} articleId={articleId} {...c} />)}
    </Comment.Group>
  )
}

export default Comments