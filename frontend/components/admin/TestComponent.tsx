import { useQuery } from "@tanstack/react-query";
import backend from "~backend/client";

export function TestComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ["hello"],
    queryFn: () => backend.admin.hello()
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2>Test Response:</h2>
      <p>{data?.message}</p>
    </div>
  );
}
