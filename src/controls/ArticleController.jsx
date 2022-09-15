import React, {Component} from 'react';
import { withRouter, Route, Switch, useRouteMatch } from "react-router";
import ArticleView from './articles/ArticleView'
import EditArticle from './articles/EditArticle'
import PublishArticle from './articles/Publish'
import { Error } from './common/Notifications'

const ArticleController = (props) => {
  const { path, params } = props.match;
  const articleId = params.id

  return (<Switch>
      <Route exact path={path}>
        <ArticleView id={articleId} user={props.user} />
      </Route>
      <Route exact path={`${path}/edit`}>
        <EditArticle id={articleId} />
      </Route>
      <Route exact path={`${path}/publish`}>
        <PublishArticle id={articleId} />
      </Route>
    </Switch>)
}

export default withRouter(ArticleController);

