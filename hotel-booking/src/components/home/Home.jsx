import HotelServices from "../common/HotelServices";
import RoomCarousel from "../common/RoomCarousel";
import MainHeader from "../layout/MainHeader";

const Home = () => {
  return (
    <section>
      <MainHeader />
      <section className="container">
        <RoomCarousel />
        <HotelServices />
      </section>
    </section>
  );
};

export default Home;
