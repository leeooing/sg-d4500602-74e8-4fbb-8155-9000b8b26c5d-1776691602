import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Lock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SEO } from "@/components/SEO";

export default function AdminLogin() {
  const router = useRouter();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    const success = login(username, password);
    if (success) {
      router.push("/admin/dashboard");
    } else {
      setError("Sai tên đăng nhập hoặc mật khẩu");
    }
  };

  return (
    <>
      <SEO title="Admin Login - SamCamping" />
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto relative w-16 h-16">
              <Image
                src="/FB_IMG_1775706386937.jpg"
                alt="SamCamping"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <CardTitle className="text-2xl font-serif">SamCamping Admin</CardTitle>
              <CardDescription>Đăng nhập để quản lý quán</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Tên đăng nhập</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
              <Button type="submit" className="w-full" size="lg">
                <Lock className="h-4 w-4 mr-2" />
                Đăng nhập
              </Button>
            </form>
            <p className="text-xs text-muted-foreground text-center mt-6">
              Demo: admin / samcamping2026
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}