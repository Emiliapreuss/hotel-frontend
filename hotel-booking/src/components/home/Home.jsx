import HotelServices from "../common/HotelServices";
import Parallax from "../common/Parallax";
import RoomCarousel from "../common/RoomCarousel";
import MainHeader from "../layout/MainHeader";

const Home = () => {
  return (
    <section>
      <MainHeader />
      <section className="container">
        <RoomCarousel />
        <Parallax />
        <HotelServices />
        <Parallax />
      </section>
    </section>
  );
};

export default Home;
