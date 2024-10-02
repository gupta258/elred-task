"use client";

import { useEffect, useState } from "react";
import { RWebShare } from "react-web-share";
import axios from "axios";
import Image from "next/image";
import Head from "next/head";

export default function Home() {
  const [data, setData] = useState();
  const [metaData, setMetaData] = useState();
  const [modal, setModal] = useState(false);
  const [moreComments, showMoreComments] = useState(false);

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

  if (!data) {
    return (
      <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center">
        <p className="text-2xl font-black">Loading .....</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <meta
          property="og:title"
          content={metaData.profileTitle}
          key="og-title"
        />
        <meta
          property="og:description"
          content={metaData.description}
          key="og-desc"
        />
        <meta
          property="og:image"
          content={metaData.cardImageURL}
          key="og-image"
        />
      </Head>
      <div
        style={{
          backgroundImage: `url('${data.profileDesignInfo.profileBannerImageURL}')`,
          backgroundSize: "100% 100%",
          backgroundPosition: "cover",
          height: "100%",
        }}
        className="text-white pb-7"
      >
        <div className="px-5 py-[10px] bg-white bg-opacity-20">
          <p className="font-medium text-base leading-6 -tracking-[1.9%]">
            Profile
          </p>
        </div>
        <div className="px-5 mt-[67px] flex flex-col items-start">
          <Image
            src={data?.dpURL}
            width={60}
            height={60}
            alt="profile-pic"
            className="border-2 border-white rounded-full mb-[10px]"
          />
          <div className="flex flex-col items-start mb-20">
            <div className="flex items-center gap-[5px]">
              <h6 className="text-2xl font-medium leading-7">
                {data.firstname} {data.lastname}
              </h6>
              <Image
                src={"./ic_round-verified.svg"}
                width={20}
                height={20}
                alt="verified"
              />
            </div>
            <div className="flex items-center gap-2 mt-[9px]">
              <Image
                src={"./briefcase.svg"}
                width={16}
                height={16}
                alt="post"
              />
              <p className="text-lg font-medium leading-[22px] capitalize">
                {data?.title[0]?.value}
              </p>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Image
                src={"./location.svg"}
                width={12}
                height={16}
                alt="location"
              />
              <p className="text-lg font-medium leading-[22px] capitalize">
                {data?.address?.fullAddress}
              </p>
            </div>
          </div>
          <div
            className="border-[1.5px] border-[#C5C5C5] rounded-lg overflow-hidden cursor-pointer"
            onClick={() => setModal(true)}
          >
            <div
              style={{
                backgroundImage: `url('${data?.profileDesignInfo?.profileBannerImageURL}')`,
                backgroundSize: "100% 100%",
                backgroundPosition: "cover",
              }}
              className="p-1 w-[56px] h-[85px]"
            >
              <div className="flex flex-col items-center justify-center">
                <div className="border-2 border-white rounded-full relative mb-[3px]">
                  <Image
                    src={data.dpURL}
                    width={16}
                    height={16}
                    alt="profile-pic"
                    className="rounded-full"
                  />
                  <Image
                    src={"./ic_round-verified.svg"}
                    width={5}
                    height={5}
                    alt="verified"
                    className="absolute -bottom-[2px] right-0 z-10"
                  />
                </div>
                <div className="flex flex-col items-center justify-center mb-[3px]">
                  <h4 className="font-bold text-[5px] tracking-[3%]">
                    {data.firstname}
                  </h4>
                  <h6 className="font-semibold text-[3px] tracking-[3%]">
                    {data.lastname}
                  </h6>
                </div>
                <div className="flex flex-col items-center justify-center mb-[5px] font-bold text-[3px] capitalize">
                  <h4 className="tracking-[5%]">{data?.title[0]?.value}</h4>
                  <h4 className="tracking-[5%]">WildCraft</h4>
                  <h6>{data?.address?.fullAddress}</h6>
                </div>
                <div className="flex flex-col items-center justify-center mb-[3px] gap-[2px]">
                  <Image
                    src={"/iconsFirst.png"}
                    width={30}
                    height={6}
                    alt="icons-first"
                  />
                  <Image
                    src={"/iconsSecond.png"}
                    width={6}
                    height={6}
                    alt="icons-second"
                  />
                </div>
                <Image
                  src={"/lastIcons.png"}
                  width={35}
                  height={7}
                  alt="last-icons"
                />
              </div>
            </div>
          </div>
        </div>

        <RWebShare
          data={{
            text: metaData.description,
            url: "",
            title: metaData.profileTitle,
          }}
        >
          <div className="bg-white bg-opacity-20 mx-4 py-4 rounded-xl custom-shadow mt-[26px] flex flex-col items-center justify-center cursor-pointer">
            <Image
              src={"./share.svg"}
              width={36}
              height={36}
              alt="share"
              className="mb-2"
            />
            <p className="text-xs font-medium leading-[14px]">Share</p>
          </div>
        </RWebShare>
        <div className="mt-4 bg-white bg-opacity-20 mx-4 p-4 rounded-xl custom-shadow">
          <h6 className="font-medium text-lg leading-[22px] mb-4">Ratings</h6>
          <div className="px-2">
            <div className="flex items-start gap-8">
              <p className="text-xl font-medium leading-6">57</p>
              <p className="text-xs font-medium leading-[18px]">
                Has ethical code of conduct and is safe to do bussines with
              </p>
            </div>
            <div className="flex items-start gap-8">
              <p className="text-xl font-medium leading-6">27</p>
              <p className="text-xs font-medium leading-[18px]">
                Met In real life/Video call
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 bg-white bg-opacity-20 mx-4 p-4 rounded-xl custom-shadow h-[250px] overflow-scroll">
          <div className="flex items-center justify-between mb-4">
            <h6 className="font-medium text-lg leading-[22px]">Comments</h6>
            <p className="font-medium text-base leading-[20px]">See all</p>
          </div>
          <div className="flex flex-col items-center gap-[22px]">
            <div className="flex items-start gap-2">
              <Image
                src={"./comments-one.svg"}
                width={42}
                height={42}
                alt="comments-one"
              />
              <div>
                <p className="font-medium text-sm leading-[21px] mb-[6px] opacity-60">
                  <span className="text-white">Gwen Stacy</span> See you in the
                  next event <span className="text-white">@roger vaccaro</span>
                </p>
                <div className="flex items-center gap-4 font-medium opacity-60 text-[13px] leading-[15.6px]">
                  <p>1s</p>
                  <p>241 likes</p>
                  <p>Reply</p>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Image
                src={"./comments-two.svg"}
                width={42}
                height={42}
                alt="comments-two"
              />
              <div>
                <p className="font-medium text-sm leading-[21px] mb-[6px] opacity-60">
                  <span className="text-white">Gwen Stacy</span> Never judge a
                  book by its cover
                </p>
                <div className="flex items-center gap-4 font-medium opacity-60 text-[13px] leading-[15.6px]">
                  <p>1s</p>
                  <p>241 likes</p>
                  <p>Reply</p>
                </div>
              </div>
            </div>
            {moreComments ? (
              <>
                <div className="flex items-start gap-2">
                  <Image
                    src={"./comments-one.svg"}
                    width={42}
                    height={42}
                    alt="comment-one"
                  />
                  <div>
                    <p className="font-medium text-sm leading-[21px] mb-[6px]">
                      Gwen Stacy{" "}
                      <span className="opacity-60">
                        See you in the next event
                      </span>{" "}
                      @roger vaccaro
                    </p>
                    <div className="flex items-center gap-4 font-medium text-[13px] leading-[16px] opacity-60">
                      <p>1s</p>
                      <p>241 likes</p>
                      <p>Reply</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Image
                    src={"./comments-two.svg"}
                    width={42}
                    height={42}
                    alt="comment-two"
                  />
                  <div>
                    <p className="font-medium text-sm leading-[21px] mb-[6px]">
                      Gwen Stacy{" "}
                      <span className="opacity-60">
                        Never judge a book by its cover
                      </span>
                    </p>
                    <div className="flex items-center gap-4 font-medium text-[13px] leading-[16px] opacity-60">
                      <p>1s</p>
                      <p>241 likes</p>
                      <p>Reply</p>
                    </div>
                  </div>
                </div>
                <button
                  className="flex items-center justify-center font-medium text-xs leading-[14px] opacity-60 cursor-pointer"
                  onClick={() => showMoreComments(false)}
                >
                  ----- Hide 2 replies
                </button>
              </>
            ) : (
              <button
                className="flex items-center justify-center font-medium text-xs leading-[14px] opacity-60 cursor-pointer"
                onClick={() => showMoreComments(true)}
              >
                ----- View 2 more replies
              </button>
            )}
          </div>
        </div>
      </div>
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white">
          <div
            style={{
              backgroundImage: `url('${data?.profileDesignInfo?.profileBannerImageURL}')`,
              backgroundSize: "100% 100%",
              backgroundPosition: "cover",
            }}
            className="relative p-16 rounded-lg w-[90%] sm:w-[335px]"
          >
            <button
              className="absolute -top-12 right-0"
              onClick={() => setModal(false)}
            >
              <Image src={"./cross.svg"} width={24} height={24} alt="cross" />
            </button>
            <div className="absolute top-4 right-5 mb-6">
              <RWebShare
                data={{
                  text: metaData.description,
                  url: "https://task-elred-4chi40lzi-gupta258s-projects.vercel.app/",
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
                  src={data.dpURL}
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
                  {data.firstname}
                </h4>
                <h6 className="font-semibold text-lg leading-[21px] tracking-[3%]">
                  {data.lastname}
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
        </div>
      )}
    </>
  );
}
