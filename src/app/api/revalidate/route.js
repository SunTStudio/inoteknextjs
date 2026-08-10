import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request) {
  try {
    // 🔒 Cek token keamanan
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.REVALIDATE_SECRET}`) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    // 🧩 Ambil data dari webhook body
    const body = await request.json();
    const { model, entry } = body;

    // 🕵️ Logging untuk debugging
    console.log("🔄 Webhook received:", model, entry?.documentId);

    // 📰 Article update
    if (model === "article") {
      // Revalidate daftar berita dan homepage
      revalidatePath("/");
      revalidatePath("/news");

      // Revalidate detail berita
      const docId = entry?.documentId || entry?.id || entry?._id;
      const slug = entry?.slug?.current || entry?.slug;

      if (slug) {
        revalidatePath(`/news/${slug}`);
        console.log(`✅ Revalidated news detail: /news/${slug}`);
      }

      // Backwards-compatible: some webhooks may still only provide documentId
      if (docId) {
        revalidatePath(`/news/${docId}`);
        console.log(`✅ Revalidated legacy news detail: /news/${docId}`);
      }

      if (!slug && !docId) {
        console.log("⚠️ No slug/documentId found in webhook entry");
      }
    }

    // 🧱 Distributor update
    if (model === "distributor") {
      revalidatePath("/distributor");
      console.log("✅ Revalidated page: /distributor");
    }

    // 📘 Download Catalog update
    if (model === "download-catalog" || model === "downloadcatalog") {
      revalidatePath("/download");
      console.log("✅ Revalidated page: /download");
    }

    // 🏗️ Product update
    if (model === "type" || model === "product") {
      revalidatePath("/product");
      console.log("✅ Revalidated page: /product");

      // Jika ada detail produk dengan documentId, revalidate juga detail-nya
      const docId = entry?.documentId || entry?.id || entry?._id;
      if (docId) {
        revalidatePath(`/product/productdetail/${docId}`);
        console.log(
          `✅ Revalidated product detail: /product/productdetail/${docId}`,
        );
      } else {
        console.log("⚠️ No documentId found in product entry");
      }
    }

    // 🔄 Tambahkan model lain jika perlu (misal "article", "news" sudah ada di versi sebelumnya)

    return NextResponse.json({ revalidated: true, timestamp: Date.now() });
  } catch (err) {
    console.error("❌ Revalidate error:", err);
    return NextResponse.json(
      { message: "Error revalidating", error: err.message },
      { status: 500 },
    );
  }
}
