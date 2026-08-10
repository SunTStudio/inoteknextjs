import { galeriService } from "../../services/galeriService";
import GaleriClient from "./GaleriClient";

export default async function GaleriLUUM() {
  const response = await galeriService("luum");
  const data = Array.isArray(response) ? response : response?.data || [];
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "";

  return (
    <section className="min-h-screen flex items-start justify-center text-gray-600 pt-10">
      <div className="container mx-auto px-4 py-8">
        <GaleriClient data={data} baseUrl={baseUrl} category="luum" />
      </div>
    </section>
  );
}
