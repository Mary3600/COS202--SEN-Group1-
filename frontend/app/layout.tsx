import "./globals.css";
import AppLayout from "../components/AppLayout";

export const metadata = {
  title: "Momento Dashboard",
  description: "Task Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}