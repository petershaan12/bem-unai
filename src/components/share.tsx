"use client"

import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TelegramIcon, TelegramShareButton, WhatsappIcon, WhatsappShareButton } from "next-share";
export default function Share({ slug, title }: { slug: string; title: string }) {
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/berita/${slug}`;
    const quote = `${title} - Check this out!`;

    return (
        <div className="flex space-x-2">
            <FacebookShareButton
                url={url}
                quote={quote}
                hashtag={'#bem-unai'}
            >
                <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TelegramShareButton
                url={url}
                title={title}
            >
                <TelegramIcon size={32} round />
            </TelegramShareButton>
            <WhatsappShareButton
                url={url}
                title={title}
                separator=":: "
            >
                <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <LinkedinShareButton url={url}>
                <LinkedinIcon size={32} round />
            </LinkedinShareButton>
        </div>
    );
}