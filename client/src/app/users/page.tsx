"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type UsersType = {
  _id: string;
  name: string;
  age: number;
  phoneNumber: string;
};

export default function Users() {
  const [users, setUsers] = useState<UsersType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    age: "",
    phoneNumber: "",
  });

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

  //   const handleChange = (e: any) => {
  //     const { name, value } = e.target;
  //     setEditData((prevState) => ({
  //       ...prevState!,
  //       [name]: value,
  //     }));
  //   };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  //   const openEditDialog = (user: UsersType) => {
  //     setEditData(user); // Populate the form with selected user's data
  //     setIsDialogOpen(true); // Open the dialog
  //   };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const editUser = async (id: any) => {
    try {
      const response = await fetch(`http://127.0.0.1:3001/update-user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...editData, id: id }),
      });
      console.log(editData);
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to save changes");
      }
      closeDialog();
    } catch (error) {
      setError("Error saving changes.");
    }
  };
  return (
    <div className="flex flex-col gap-4 p-10">
      <h1 className="text-2xl font-semibold">Users List</h1>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger>
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
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>

              <Input
                onChange={handleChange}
                value={editData?.name}
                name="name"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Age
              </Label>
              <Input
                onChange={handleChange}
                value={editData?.age}
                name="age"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Phone Number
              </Label>
              <Input
                onChange={handleChange}
                value={editData?.phoneNumber}
                name="phoneNumber"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <div className="flex items-center gap-[230px]">
              <Button className="bg-red-500">Delete profile</Button>
              <Button type="submit" onClick={() => editUser(user._id)}>
                Save changes
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
