import { galeriService } from "../../services/galeriService";
import GaleriClient from "./GaleriClient";
import GaleriLUUM from "./GaleriLUUM";

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const category = params?.category || "nichiha";

  if (category === "luum") {
    return <GaleriLUUM />;
  }

  const response = await galeriService("nichiha");
  const data = Array.isArray(response) ? response : response?.data || [];
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "";

  return (
    <section className="min-h-screen flex items-start justify-center text-gray-600 pt-10">
      <div className="container mx-auto px-4 py-8">
        <GaleriClient data={data} baseUrl={baseUrl} category="nichiha" />
      </div>
    </section>
  );
}