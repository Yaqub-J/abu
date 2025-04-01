import {
  Landing
} from "@/app/(landing)/Home/page";
import Navbar from "./(landing)/Home/landing/Navbar";
import AlumniFooter from "./(landing)/Home/landing/Footer";

export default function Home() {
  return (
    <>
    <Navbar/>
    <Landing />
    <AlumniFooter />
    </>
  );
}