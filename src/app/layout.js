import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import InteractiveBackground from "@/components/InteractiveBackground";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-white antialiased">
        <SmoothScroll>
          <InteractiveBackground>{children}</InteractiveBackground>
        </SmoothScroll>
      </body>
    </html>
  );
}
