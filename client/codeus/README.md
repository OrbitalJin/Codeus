# Codeus client

## Todo today

- [ ] User card on Side
- [ ] Thread system
- [ ] Remove snippet section
- [ ] Fix first comment bug (or create one comment under post to prevent it)
- [ ] Search bar

## Threads

- [x] Thread service
- [x] Thread hooks
- [ ] Thread Component
- [ ] Thread List
- [ ] Thread page with post list
- [ ] Add thread origin to post if applicable

## User auth

- [x] Basic login flow
- [x] Basic signup flow
- [x] Migrate to React + Vite
- [x] Reimplment auth flow using fire/supabase with a provider and a custom `useAuth` hook

- [x] Create `AuthContext`
- [x] Create `useAuth` hook for operations like signing in and out etc...
- [x] Create Protected Route component which use the `useAuth` hook to conditionally forward to the page or navigate to the login page

- [x] Push user details i.e. handle to spring backend
- [x] Lock routes unless signed in
- [x] Style sign-up and login pages
- [x] Implement logout button and hook(?)

## Sidebar

- [x] Dynamicaly display user details in `SidebarFooter` component

## Profile

- [x] User profile route /{handle}(?)
- [x] User posts on profile
- [x] Add user bio
- [x] Add profile edit & (maybe follow? <- Not yet)
- [x] Add upvote list
- [ ] Figure out a way to fix the race confition on registration and remove the manual call to `setAuthState` from there

## Bookmarks

- [x] Add ability to clear bookmarks

## Feed/Post

- [x] Load posts in a general field
- [x] Implement up/downvotes
- [x] Implement bookmarks on posts
- [x] Add Post time stamps
- [x] Add copy snippet to clipboard
- [x] Add post badges (lang, theme...)
- [x] User tooltip on post with preview
- [x] Fullscreen (center) view with comments below
- [x] Comments list & items components
- [x] Add comments
- [x] Update changes in realtime by using state (e.g. delete is instant)
- [ ] Fix first comment post bug (spread operator)
- [ ] Style User tooltip on post with preview
- [ ] Update changes in realtime by using state (e.g. delete is instant)

## Threads

- [ ] Create basic thread page

## Snippet sharing

## Explore / search
