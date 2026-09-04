import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { BirthDetailsForm, Navbar } from "../../components";

export default async function DiscoverPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-abyss text-cream">
      <Navbar />
      <BirthDetailsForm />
    </div>
  );
}