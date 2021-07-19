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
import { FriendList } from "./friends/FriendList"
import { FriendDetail } from "./friends/FriendDetail"
import { TaskForm } from "./tasks/TaskForm"
import { PlannedEventList } from "./plannedEvents/PlannedEventList"
import { PlannedEventForm } from "./plannedEvents/PlannedEventForm"

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

        <FriendProvider>
          <Route exact path="/friends">
              <FriendList />
            {/* Render the component for list of friends */}
          </Route>
        </FriendProvider>

        <FriendProvider>
          <UserProvider>
            <Route exact path="/friends/detail/:friendId(\d+)">
                <FriendDetail />
            </Route>
          </UserProvider>
        </FriendProvider>
                <MessageProvider>
                    <FriendProvider>
                        <Route path="/messages">
                            {/* Render the component for the messages */}
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
                        <Route path="/tasks/edit/:taskId(\d+)">
                            <TaskForm />
                        </Route>
                    </UserProvider>
                </TaskProvider>

                <FriendProvider>
                    <PlannedEventProvider>
                        <Route exact path="/plannedEvents">
                            <PlannedEventList />
                        </Route>
                        <Route exact path="/plannedEvents/create">
                            <PlannedEventForm />
                        </Route>
                        <Route
                            exact
                            path="/plannedEvents/edit/:plannedEventId(\d+)"
                        >
                            <PlannedEventForm />
                        </Route>
                    </PlannedEventProvider>
                </FriendProvider>
            </UserProvider>
        </>
    )
}
