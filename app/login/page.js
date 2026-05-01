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
      <section className="auth-panel" aria-label="เข้าสู่ระบบ Sophon Expire">
        <div className="auth-visual">
          <div className="auth-logo-box">
            <img src="/images/logo.png" alt="Sophon Expire" />
          </div>
          <div>
            <div className="auth-kicker">Sophon Driver Style</div>
            <h1>Sophon Expire</h1>
            <p>
              ระบบติดตามวันหมดอายุ รับเข้า ตัดสต๊อก และตรวจนับสินค้า
              สำหรับทีมหน้าร้านและคลังสินค้า
            </p>
          </div>
        </div>

        <div className="auth-card">
          <div className="auth-form-head">
            <div className="auth-kicker">เข้าสู่ระบบ</div>
            <h2>ยินดีต้อนรับ</h2>
            <p>กรอกชื่อผู้ใช้และรหัสผ่านเพื่อเริ่มทำงาน</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="username">ชื่อผู้ใช้</label>
              <input
                id="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoComplete="username"
                placeholder="กรอกชื่อผู้ใช้"
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
                placeholder="กรอกรหัสผ่าน"
                required
              />
            </div>

            <button className="primary-button" type="submit" disabled={loading}>
              {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
            </button>
          </form>

          <div className="error-text">{error}</div>
          <div className="success-text">{success}</div>
          <div className="auth-helper">ระบบจะตรวจสอบบัญชีจากฐานข้อมูล Supabase</div>
        </div>
      </section>
    </main>
  );
}
