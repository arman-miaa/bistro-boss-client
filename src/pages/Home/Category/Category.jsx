import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from 'swiper/modules';

import slider1 from '../../../assets/home/slide1.jpg';
import slider2 from '../../../assets/home/slide2.jpg';
import slider3 from '../../../assets/home/slide3.jpg';
import slider4 from '../../../assets/home/slide4.jpg';
import slider5 from '../../../assets/home/slide5.jpg';
import SectionTitle from "../../../components/SectionTitle";
import bgImg from '../../../assets/home/chef-service.jpg'

const Category = () => {
    return (
      <div>
        <SectionTitle
          subHeading={`From 11.00am to 10.00pm`}
          heading="Order Online"
        ></SectionTitle>
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          centeredSlides={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper mb-24"
        >
          <SwiperSlide>
            <img src={slider1} alt="" />
            <h3 className="text-4xl uppercase text-center -mt-16 text-white">
              Slads
            </h3>
          </SwiperSlide>
          <SwiperSlide>
            <img src={slider2} alt="" />
            <h3 className="text-4xl uppercase text-center -mt-16 text-white">
              Pizza
            </h3>
          </SwiperSlide>
          <SwiperSlide>
            <img src={slider3} alt="" />
            <h3 className="text-4xl uppercase text-center -mt-16 text-white">
              Soups
            </h3>
          </SwiperSlide>
          <SwiperSlide>
            <img src={slider4} alt="" />
            <h3 className="text-4xl uppercase text-center -mt-16 text-white">
              Desserts
            </h3>
          </SwiperSlide>
          <SwiperSlide>
            <img src={slider5} alt="" />
            <h3 className="text-4xl uppercase text-center -mt-16 text-white">
              Slads
            </h3>
          </SwiperSlide>
        </Swiper>
        {/* others section */}
        <section
          style={{ backgroundImage: `url(${bgImg})` }}
          className="border-2 "
        >
          <div className="text-center p-24 bg-white m-24">
            <h2 className="text-3xl">Bistro Boss</h2>
            <p className="w-1/2 mx-auto">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Necessitatibus, libero accusamus laborum deserunt ratione dolor
              officiis praesentium! Deserunt magni aperiam dolor eius dolore at,
              nihil iusto ducimus incidunt quibusdam nemo.
            </p>
          </div>
        </section>
      </div>
    );
};

export default Category;
