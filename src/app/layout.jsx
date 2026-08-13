import "./globals.css";
import NavbarHeader from "./blocks/Navbar";
import Footer from "./blocks/Footer";
import { ThemeInit } from "../../.flowbite-react/init";

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://inotekkaryamandiri.com",
  ),
  title: "Inotek NICHIHA | Distributor Resmi Panel Fasad Jepang di Indonesia",
  description:
    "Inotek Karya Mandiri adalah distributor resmi NICHIHA di Indonesia. Menyediakan panel fasad berkualitas dari Jepang untuk hunian dan bangunan komersial.",
  keywords: [
    "NICHIHA",
    "Panel Fasad",
    "Fasad Jepang",
    "Inotek",
    "Inotek Karya Mandiri",
    "Distributor NICHIHA",
    "Fasad Bangunan",
    "Fasad Rumah",
  ],
  authors: [{ name: "Inotek Karya Mandiri" }],
  creator: "Inotek Karya Mandiri",
  publisher: "Inotek Karya Mandiri",
  alternates: {
    canonical: "https://inotekkaryamandiri.com/",
  },
  openGraph: {
    title: "Inotek NICHIHA | Distributor Resmi Panel Fasad Jepang di Indonesia",
    description:
      "Inotek Karya Mandiri adalah distributor resmi NICHIHA di Indonesia. Menyediakan panel fasad berkualitas dari Jepang untuk hunian dan bangunan komersial.",
    url: "https://inotekkaryamandiri.com/",
    siteName: "Inotek NICHIHA",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/headerfootelogo.png",
        width: 1200,
        height: 630,
        alt: "Inotek NICHIHA - Panel Fasad Jepang",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inotek NICHIHA | Distributor Resmi Panel Fasad Jepang di Indonesia",
    description:
      "Panel fasad NICHIHA dari Jepang, kini hadir resmi di Indonesia bersama Inotek Karya Mandiri.",
    images: ["/headerfootelogo.png"],
  },
  icons: {
    icon: [
      { url: "/logo-inotek.svg", sizes: "16x16" },
      { url: "/logo-inotek.svg", sizes: "32x32" },
    ],
    apple: [{ url: "/logo-inotek.svg", sizes: "180x180" }],
    shortcut: "/logo-inotek.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-FJG9TZMHWM"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-FJG9TZMHWM');
      `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '1752010645500910');
  fbq('track', 'PageView');
`,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1752010645500910&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body>
        <ThemeInit />
        <NavbarHeader />
        <main className="flex flex-col space-y-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
