"use client";

import React from 'react';
import dummy from "../../../db/data.json";
import UserChannelCard from '../../../components/channel/UserChannelCard';
import ChannelCard from '../../../components/channel/ChannelCard';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Props = {}

const Channels: React.FC<Props> = (props) => {

  SwiperCore.use([Navigation, Scrollbar, Autoplay]);

  return (
    <div className="p-6">
      <h3 className="mb-6 text-xl font-semibold">내가 생성한 채널</h3>
      <div className="mb-10">
        <Swiper
          loop={true}
          spaceBetween={10}
          slidesPerView={5}
          navigation={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
          {dummy.createList.map((slide) => (
            <SwiperSlide key={slide.id}>
              <UserChannelCard key={slide.id} name={slide.name} followers={slide.followers} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <h3 className="mb-6 text-xl font-semibold">내가 팔로우한 채널</h3>
      <div className="mb-10">
        <Swiper
          loop={true}
          spaceBetween={10}
          slidesPerView={5}
          navigation={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
          {dummy.createList.map((slide) => (
            <SwiperSlide key={slide.id}>
              <UserChannelCard key={slide.id} name={slide.name} followers={slide.followers} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <h3 className="mb-6 text-xl font-semibold">전체 채널</h3>
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search"
          className="p-2 w-1/2 rounded border border-gray-300"
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {dummy.AllChannels.map((item) => (
          <div className="card shadow-sm" key={item.title} onClick={() => console.log("item pressed")}>
            <ChannelCard
              title={item.title}
              likes={item.followers} // 좋아요 수로 가정
              tags={item.tags}
              imageUrl={item.img}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Channels;
