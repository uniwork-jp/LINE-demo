import { Liff } from "@/app/_components/Liff";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        <Liff />
        <div className="mt-8 text-center">
          <Link
            href="/rally"
            className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            スタンプラリーを始める
          </Link>
        </div>
      </div>
    </main>
  );
}