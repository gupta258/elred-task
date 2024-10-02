"use client";

import { useEffect, useState } from "react";
import { RWebShare } from "react-web-share";
import Image from "next/image";
import axios from "axios";

export default function MainCard() {
  const [data, setData] = useState();
  const [metaData, setMetaData] = useState();

  useEffect(() => {
    fetchData();
    fetchMetaData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "https://dev.elred.io/noSessionProfileDetails?userCode=66961e8dcc9a8155d09b8c9b"
      );

      setData(response.data.result[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMetaData = async () => {
    try {
      const response = await axios.post(
        "https://dev.elred.io/noSessionPreviewCardScreenshot?userCode=66961e8dcc9a8155d09b8c9b"
      );

      setMetaData(response.data.result[0]);
    } catch (error) {
      console.error(error);
    }
  };

  if (!data && !metaData) {
    return (
      <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center">
        <p className="text-2xl font-black">Loading .....</p>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundImage: `url('${data?.profileDesignInfo?.profileBannerImageURL}')`,
        backgroundSize: "100% 100%",
        backgroundPosition: "cover",
        height: "100vh",
      }}
      className="relative p-16 w-full sm:w-[375px] text-white"
    >
      <div className="absolute top-4 right-5 mb-6">
        <RWebShare
          data={{
            text: metaData.description,
            url: "https://elred-task.vercel.app/card/",
            title: metaData.cardTitle,
          }}
          onClick={() => console.log("shared successfully!")}
        >
          <button className="flex items-center gap-1 cursor-pointer">
            <Image
              src={"./shareCard.svg"}
              width={24}
              height={25}
              alt="shareCard"
            />
            <p className="font-medium text-sm leading-[17px]">Share</p>
          </button>
        </RWebShare>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="border-4 border-[#147BFF] rounded-full relative mb-6">
          <Image
            src={data?.dpURL}
            width={116}
            height={116}
            alt="profile-pic"
            className="rounded-full"
          />
          <Image
            src={"./ic_round-verified.svg"}
            width={28}
            height={28}
            alt="verified"
            className="absolute bottom-0 right-0 z-10"
          />
        </div>
        <div className="flex flex-col items-center justify-center mb-[30px] gap-[2px]">
          <h4 className="font-bold text-[30px] leading-[35px] tracking-[3%]">
            {data?.firstname}
          </h4>
          <h6 className="font-semibold text-lg leading-[21px] tracking-[3%]">
            {data?.lastname}
          </h6>
        </div>
        <div className="flex flex-col items-center justify-center mb-[35px] gap-2 font-bold text-base leading-[19px] capitalize">
          <h4 className="tracking-[5%]">{data?.title[0]?.value}</h4>
          <h4 className="tracking-[5%]">WildCraft</h4>
          <h6>{data?.address?.fullAddress}</h6>
        </div>
        <div className="flex flex-col items-center justify-center mb-[62px] gap-7">
          <Image
            src={"/iconsFirst.png"}
            width={141}
            height={30}
            alt="icons-first"
          />
          <Image
            src={"/iconsSecond.png"}
            width={178}
            height={30}
            alt="icons-second"
          />
        </div>
        <Image
          src={"/lastIcons.png"}
          width={178}
          height={30}
          alt="last-icons"
        />
      </div>
    </div>
  );
}
