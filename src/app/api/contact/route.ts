import { handleContactPost } from "@/backend/contact";

export async function POST(request: Request) {
  return handleContactPost(request);
}
