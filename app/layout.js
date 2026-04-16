import "./globals.css";

export const metadata = {
  title: "Expire Tracker",
  description: "Inventory expiry tracking dashboard"
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
