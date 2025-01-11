import HomeLayout from "../../../layout/homeLayout";
import Commitment from "./components/Commitment";
import Hero from "./components/Hero";
import Mission from "./components/Mission";
import Offer from "./components/Offer";

const AboutUs = () => {
  return (
    <HomeLayout>
      <Hero />
      <Mission />
      <Offer />
      <Commitment />
    </HomeLayout>
  );
};

export default AboutUs;
