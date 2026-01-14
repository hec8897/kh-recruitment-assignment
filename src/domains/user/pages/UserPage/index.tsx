import { mockUser } from "@/mocks/handlers/user";

export function UserPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">{mockUser.name}</h2>
      <p>{mockUser.memo}</p>
    </div>
  );
}
