import {
  Avatar,
  Button,
  Dropdown,
  Modal,
  Navbar,
  TextInput,
} from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeslice.js";
import { signOutSuccess } from "../redux/user/userSlice.js";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function Header() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [signOutModal, setSignOutModal] = useState(false);
  const path = useLocation();

  const pathRoute = (route) => {
    if (route === path.pathname) {
      return true;
    }
  };

  //signout
  const handleSignOut = async () => {
    setSignOutModal(false);
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Navbar className="border-b-2 sticky top-0 z-50">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-red-500 rounded-lg text-white">
          Allianz
        </span>
        Blog
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button
          className="w-12 h-10 hidden sm:inline"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to="/profile">
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => setSignOutModal(true)}>
              Sign Out
            </Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link as={"div"}>
          <Link
            to="/"
            className={`p-1 text-sm ${
              pathRoute("/") &&
              "text-white bg-purple-700 text-sm rounded-full px-3 font-bold"
            }`}
          >
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link as={"div"}>
          <Link
            to="/about"
            className={`p-1 text-sm font-semibold ${
              pathRoute("/about") &&
              "text-white bg-purple-700 text-sm rounded-full px-3 font-bold"
            }`}
          >
            About
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>

      {/* SIGN-OUT MODAL SECTION */}

      <Modal
        show={signOutModal}
        onClose={() => setSignOutModal(false)}
        popup
        size="md"
      >
        {/* DELETE MODAL SECTION */}
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to Sign-Out?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleSignOut}>
                Yes, I am sure
              </Button>
              <Button color="gray" onClick={() => setSignOutModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Navbar>
  );
}
