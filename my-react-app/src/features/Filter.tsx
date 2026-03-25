// features/Filter.ts
import { useSearchParams } from "react-router-dom";

export const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const status = searchParams.get("status");
  const priority = searchParams.get("priority");

  const setStatus = (value: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("status", value);
    } else {
      params.delete("status");
    }
    setSearchParams(params);
  };

  const setPriority = (value: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("priority", value);
    } else {
      params.delete("priority");
    }
    setSearchParams(params);
  };

  return { status, priority, setStatus, setPriority };
};
