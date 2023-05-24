import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { useAuth } from './support/Auth';
// Pages
import { Feed } from './pages/Feed';
import { Login } from './pages/Login';
import { NewPost } from './pages/NewPost';
import { PostDetails } from './pages/PostDetails';
import { Signup } from './pages/Signup';
import { UserProfile } from './pages/UserProfile';
import { MyProfile } from './pages/MyProfile';
import { EditProfile } from './pages/EditProfile';

export function Router() {
  const { authToken } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {authToken !== null ? (
          <>
            <Route path="/posts/new" element={<NewPost />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/my-profile/edit" element={<EditProfile />} />
            <Route path="/users/:id" element={<UserProfile />} />
            <Route path="/" element={<Feed />} />
          </>
        ) : (
          <>
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
