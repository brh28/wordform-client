import React from 'react';
import { withRouter, Switch, Route } from "react-router";
import ArticleView from './ArticleView'
import ArticleEditor from './ArticleEditor'
import PublishArticle from './Publish'

export const PATH = '/articles';
export const VIEW_ARTICLE_URL = `${PATH}/:id`
export const CREATE_ARTICLE_URL = `${PATH}/new`
export const EDIT_ARTICLE_URL = `${PATH}/:id/edit`
export const PUBLISH_ARTICLE_URL = `${PATH}/:id/publish`

const ArticleController = (props) => {
  return (<Switch>
      <Route exact path={CREATE_ARTICLE_URL}>
        <ArticleEditor />
      </Route>
      <Route exact path={EDIT_ARTICLE_URL}> 
        <ArticleEditor />
      </Route>
      <Route exact path={PUBLISH_ARTICLE_URL}>
        <PublishArticle />
      </Route>
      <Route exact path={VIEW_ARTICLE_URL}>
        <ArticleView user={props.user} />
      </Route>
    </Switch>)
}

export default Object.assign(withRouter(ArticleController), { PATH: PATH, CREATE_ARTICLE_URL: CREATE_ARTICLE_URL });

