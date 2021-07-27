import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import CategoryList from "./CategoryList";
import CategoryForm from "./CategoryForm";
import UserList from "./UserList";
import CommentList from "./CommentList";
import TagList from "./TagList";
import TagForm from "./TagForm";
import CommentAddForm from "./CommentAddForm";
import PostList from "./PostList";
import MyPost from "./MyPost";
import PostDetails from "./PostDetail";
import UserDetails from "./UserDetails";
import PostForm from "./PostForm";

export default function ApplicationViews({ isLoggedIn }) {
    return (
        <main>
            <Switch>
                <Route path="/" exact>
                    {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
                </Route>

                <Route exact path="/tags">
                    {isLoggedIn ? <TagList /> : <Redirect to="/login" />}
                </Route>

                <Route exact path="/tags/add">
                    {isLoggedIn ? <TagForm /> : <Redirect to="/login" />}
                </Route>

                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/register">
                    <Register />
                </Route>

                <Route exact path="/category">
                    {isLoggedIn ? <CategoryList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/category/add">
                    <CategoryForm />
                </Route>

                <Route exact path="/post">
                    {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
                </Route>
                <Route path="/comment/GetByPostId/:postId(\d+)">
                    {isLoggedIn ? <CommentList /> : <Redirect to="/login" />}
                </Route>
                <Route path="/comment/:postId(\d+)">
                    <CommentAddForm />
                </Route>
                <Route exact path="/myPost">
                    {isLoggedIn ? <MyPost /> : <Redirect to="/login" />}
                </Route>
                <Route path="/post/add">
                    {isLoggedIn ? <PostForm /> : <Redirect to="/login" />}
                </Route>

                <Route path="/post/:id(\d+)" exact>
                    {isLoggedIn ? <PostDetails /> : <Redirect to="/login" />}
                </Route>
                <Route exact path="/users">
                    {isLoggedIn ? <UserList /> : <Redirect to="/login" />}
                </Route>
                <Route path="/users/:id(\d+)">
                    {isLoggedIn ? <UserDetails /> : <Redirect to="/login" />}
                </Route>
            </Switch>
        </main>
        //EXACT PATH can be used when routes begin the same
    );
}