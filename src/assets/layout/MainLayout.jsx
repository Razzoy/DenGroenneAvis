import { UserContextProvider } from "../context/UserContext";
import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import { Wrapper } from "../components/Wrapper/Wrapper";

export function MainLayout() {
  return (
    <>
      {/* Everything in UserContextProvider will be changeable depending on if logged in or not */}
      <UserContextProvider>
      <Header />
      <Wrapper>
          <Outlet />
      </Wrapper>
      <Footer />
      </UserContextProvider>
    </>
  );
}
