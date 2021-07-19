import React from "react"
import { Route } from "react-router-dom"
import { UserProvider } from "./users/UserProvider"
import { FriendProvider } from "./friends/FriendProvider"
import { ArticleProvider } from "./articles/ArticleProvider"
import { ArticleList } from "./articles/ArticleList"
import { ArticleForm } from "./articles/ArticleForm"
import { PlannedEventProvider } from "./plannedEvents/PlannedEventProvider"
import { TaskProvider } from "./tasks/TaskProvider"
import { TaskList } from "./tasks/TaskList"
import { MessageProvider } from "./messages/MessageProvider"
import { MessageList } from "./messages/MessageList"
import { TaskForm } from "./tasks/TaskForm"

export const ApplicationViews = () => {
  return (
    <>

      <UserProvider>
        <FriendProvider>
          <ArticleProvider>
            <PlannedEventProvider>
              <Route exact path="/">
                <ArticleList />
              </Route>
            </PlannedEventProvider>
          </ArticleProvider>
        </FriendProvider>

        <ArticleProvider>
          <Route exact path="/articles/create">
            <ArticleForm />
          </Route>
        </ArticleProvider>

        <FriendProvider>
          <Route path="/friends">
            {/* Render the component for list of friends */}
          </Route>
        </FriendProvider>


        <MessageProvider>
          <FriendProvider>
            <Route path="/messages">
              <MessageList />
            </Route>
          </FriendProvider>
        </MessageProvider>

        {/* Render the component for the user's tasks */}
        <TaskProvider>
          <UserProvider>
            <Route exact path="/tasks">
              <TaskList />
            </Route>
            <Route exact path="/tasks/create">
              <TaskForm />
            </Route>
          </UserProvider>
        </TaskProvider>

        <FriendProvider>
          <PlannedEventProvider>
            <Route path="/plannedEvents">
              {/* Render the component for the user's events */}
            </Route>
          </PlannedEventProvider>
        </FriendProvider>
      </UserProvider>
    </>
  )
}
