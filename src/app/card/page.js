import MainCard from "@/components/MainCard";
import axios from "axios";

export async function generateMetadata() {
  try {
    const response = await axios.post(
      "https://dev.elred.io/noSessionPreviewCardScreenshot?userCode=66961e8dcc9a8155d09b8c9b"
    );

    const data = response.data.result[0];

    return {
      title: data.cardTitle,
      description: data.description,

      openGraph: {
        title: data.cardTitle,
        description: data.description,
        url: "https://elred-task.vercel.app/card/",
        images: [
          {
            url: data.cardImageURL,
            width: 300,
            height: 300,
            alt: data.cardTitle,
          },
        ],
        type: "website",
      },

      twitter: {
        card: "website",
        title: data.cardTitle,
        description: data.description,
        images: [data.cardImageURL],
      },
    };
  } catch (error) {
    console.error("Failed to fetch metadata:", error);
  }
}

export default function Card() {
  return <MainCard />;
}
