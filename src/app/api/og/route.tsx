import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";

export const runtime = "edge";

const interBold = fetch(
    new URL("../../../../public/fonts/Inter-Bold.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

export async function GET(req: NextRequest) {
  try {
    const fontBold = await interBold;


    const { searchParams } = req.nextUrl;
    const title = searchParams.get("title");

    if (!title) {
      return new Response("No title provider", { status: 500 });
    }

    const heading =
      title.length > 148 ? `${title.substring(0, 140)}...` : title;

    return new ImageResponse(
      (
        <div
          tw="flex relative flex-col p-28 w-full h-full items-start text-white "
          style={{
            backgroundImage: `url(${process.env.NEXT_PUBLIC_APP_URL}/og.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div tw="flex flex-col flex-1 py-12 mt-16">
            <div tw="flex text-[100px] font-bold leading-[120px] tracking-tighter">
              {heading}
            </div>
          </div>
        </div>
      ),
      {
        width: 1280,
        height: 720,
        fonts: [
          {
            name: "Inter",
            data: fontBold,
            style: "normal",
            weight: 700,
          },
        ],
      }
    );
  } catch (error) {
    return new Response("Failed to generate image", { status: 500 });
  }
}
