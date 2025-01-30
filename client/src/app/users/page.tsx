"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription } from "@/components/ui/card";

type UsersType = {
  _id: string;
  name: string;
  age: number;
  phoneNumber: string;
};

export default function Users() {
  const [users, setUsers] = useState<UsersType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3001/get-all-users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        console.log(data.result);
        setUsers(data.result);
      } catch (error: any) {
        setError("An error occurred while fetching users.");
      }
    };
    fetchUsers();
  }, []);
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Users List</h1>
      <div className="flex flex-wrap gap-5">
        {users.map((user) => (
          <Card key={user._id} className="w-[300px] p-4">
            <CardDescription className="text-lg font-semibold">
              {user.name}
            </CardDescription>
            <CardContent>
              <p>Age: {user.age}</p>
              <p>Phone: {user.phoneNumber}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
