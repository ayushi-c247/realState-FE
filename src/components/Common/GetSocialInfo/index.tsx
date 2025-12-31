import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandMedium,
  IconBrandX,
  IconBrandYoutube,
  IconWorld,
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";

export default function getSocialInfo(rawUrl: string | undefined) {
  const t = useTranslations("eventManagement");
  if (!rawUrl) {
    return { label: t("socialLabel.website"), Icon: IconWorld, href: undefined as string | undefined };
  }

  let href = rawUrl.trim();
  if (!/^https?:\/\//i.test(href)) href = `https://${href}`;

  let hostname = "";
  try {
    hostname = new URL(href).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return { label: t("socialLabel.website"), Icon: IconWorld, href }; // fallback if URL invalid
  }

  if (hostname.includes("linkedin")) return { label: t("socialLabel.linkedin"), Icon: IconBrandLinkedin, href };
  if (hostname.includes("twitter") || hostname === t("socialLabel.xCom"))
    return { label: "X (Twitter)", Icon: IconBrandX, href };
  if (hostname.includes("facebook")) return { label: t("socialLabel.facebook"), Icon: IconBrandFacebook, href };
  if (hostname.includes("instagram")) return { label: t("socialLabel.instagram"), Icon: IconBrandInstagram, href };
  if (hostname.includes("youtube") || hostname === t("socialLabel.yTube"))
    return { label: "YouTube", Icon: IconBrandYoutube, href };
  if (hostname.includes("github")) return { label: t("socialLabel.github"), Icon: IconBrandGithub, href };
  if (hostname.includes("medium")) return { label: t("socialLabel.medium"), Icon: IconBrandMedium, href };

  return { label: t("socialLabel.website"), Icon: IconWorld, href };
}
