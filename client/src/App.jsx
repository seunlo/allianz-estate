import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Footer,
  Header,
  PrivateRoute,
  About,
  ForgotPassword,
  Home,
  Profile,
  Search,
  SignIn,
  SignUp,
} from "./components";


export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
