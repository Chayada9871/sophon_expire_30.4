import { redirect } from "next/navigation";

export default function ExpiredHistoryPage() {
  redirect("/legacy/expired_history.html");
}
