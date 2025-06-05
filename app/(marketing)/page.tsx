import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await auth();
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        {user ? "user logged in" : "NOt logged in"}
      </div>
    </div>
  );
}
