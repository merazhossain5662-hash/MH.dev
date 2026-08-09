import InteractiveBackground from "@/components/InteractiveBackground";
import "./globals.css";

export const metadata = {
  title: "Meraz Hossain | Full Stack Developer",
  description: "Portfolio of Meraz Hossain",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-black text-white antialiased">
        <InteractiveBackground>{children}</InteractiveBackground>
      </body>
    </html>
  );
}
