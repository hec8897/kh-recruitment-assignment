import { useUser } from "../../hooks/useUser";

export function UserPage() {
  const { data: user, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">{user?.name}</h2>
      <p>{user?.memo}</p>
    </div>
  );
}
