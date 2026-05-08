import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}