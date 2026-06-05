import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Sourcesys SaaS Admin",
  description: "Enterprise SaaS admin dashboard"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
