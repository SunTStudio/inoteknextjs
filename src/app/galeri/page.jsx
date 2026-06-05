import { galeriService } from "../../services/galeriService";
import GaleriClient from "./GaleriClient";

export default async function Page() {
  const response = await galeriService();
  // Ekstrak array dari response.data, pastikan selalu berupa array
  const data = Array.isArray(response) ? response : (response?.data || []);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "";
  // console.log(data[0].image[0].url);
  return (
    <section className="min-h-screen flex items-start justify-center text-gray-600 pt-10">
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-display font-bold mb-10 text-center text-[#013774] uppercase tracking-wide">
              Galeri Foto inotek
            </h1>
            <GaleriClient data={data} baseUrl={baseUrl} />
        </div>
      </section>
  ) 
}
 