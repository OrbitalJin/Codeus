# Codeus client

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
- [x] Dynamicaly display user details in `SidebarFooter` component
- [x] User tooltip on post with preview
- [x] User profile route /{handle}(?)
- [x] User posts on profile
- [x] Add user bio
- [x] Add Post time stamps
- [x] Add copy snippet to clipboard
- [x] Add post badges (lang, theme...)
- [ ] Add profile edit & (maybe follow?)
- [ ] Style User tooltip on post with preview
- [ ] Figure out a way to fix the race confition on registration and remove the manual call to `setAuthState` from there

## Feed

- [x] Load posts in a general field
- [ ] Implement bookmarks on posts
- [ ] Implement up/downvotes

## Threads

- [ ] Create basic thread page

## Snippet sharing

## Explore / search

## Posts /{postId}

- [ ] Fullscreen (center) view with comments below
- [ ] Comments list & items components
