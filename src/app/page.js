import MainPage from "@/components/MainPage";
import axios from "axios";

export async function generateMetadata() {
  try {
    const response = await axios.post(
      "https://dev.elred.io/noSessionPreviewCardScreenshot?userCode=66961e8dcc9a8155d09b8c9b"
    );

    const data = response.data.result[0];

    return {
      title: data.profileTitle,
      description: data.description,

      openGraph: {
        title: data.profileTitle,
        description: data.description,
        url: "https://elred-task.vercel.app/",
        images: [
          {
            url: data.cardImageURL,
            width: 800,
            height: 600,
            alt: data.profileTitle,
          },
        ],
        type: "website",
      },

      twitter: {
        card: "website",
        title: data.profileTitle,
        description: data.description,
        images: [data.cardImageURL],
      },
    };
  } catch (error) {
    console.error("Failed to fetch metadata:", error);
  }
}

export default function Home() {
  return <MainPage />;
}
