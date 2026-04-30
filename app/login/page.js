"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import { getStoredUser, saveUserSession } from "@/lib/session";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (getStoredUser()) {
      router.replace("/dashboard");
    }
  }, [router]);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const supabase = getSupabaseBrowserClient();
      const { data, error: queryError } = await supabase
        .from("app_users")
        .select("id, username, role, password")
        .eq("username", username.trim())
        .maybeSingle();

      if (queryError) throw queryError;
      if (!data || data.password !== password) {
        setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
        return;
      }

      saveUserSession(data);
      setSuccess("เข้าสู่ระบบสำเร็จ");
      router.push("/dashboard");
    } catch (err) {
      setError(`เข้าสู่ระบบไม่สำเร็จ: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <div className="auth-brand">
          <img src="/images/logo.png" alt="Sophon" />
        </div>
        <div className="auth-kicker">Sophon Driver</div>
        <h1>เข้าสู่ระบบ</h1>
        <p>เริ่มใช้งานระบบติดตามวันหมดอายุ ด้วยหน้าระบบใหม่ที่อ่านง่ายและจัดการต่อได้สะดวกขึ้น</p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="username">ชื่อผู้ใช้</label>
            <input
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="password">รหัสผ่าน</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <button className="primary-button" type="submit" disabled={loading}>
            {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>
        </form>

        <div className="error-text">{error}</div>
        <div className="success-text">{success}</div>
      </section>
    </main>
  );
}
