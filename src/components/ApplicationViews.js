import React from "react"
import { Route } from "react-router-dom"
import { UserProvider } from "./users/UserProvider"
import { FriendProvider } from "./friends/FriendProvider"
import { ArticleProvider } from "./articles/ArticleProvider"
import { ArticleList } from "./articles/ArticleList"
import { PlannedEventProvider } from "./plannedEvents/PlannedEventProvider"
import { TaskProvider } from "./tasks/TaskProvider"
import { MessageProvider } from "./messages/MessageProvider"

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

        <FriendProvider>
          <Route path="/friends">
            {/* Render the component for list of friends */}
          </Route>
        </FriendProvider>


        <MessageProvider>
          <FriendProvider>
            <Route path="/messages">
            {/* Render the component for the messages */}
            </Route>
          </FriendProvider>
        </MessageProvider>

        <TaskProvider>
          <Route path="/tasks">
            {/* Render the component for the user's tasks */}
          </Route>
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
