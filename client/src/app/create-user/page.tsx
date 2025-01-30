"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type FormDataType = {
  name: string;
  age: string;
  phoneNumber: string;
};

export default function CreateUser() {
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    age: "",
    phoneNumber: "",
  });

  const router = useRouter();
  const [error, setError] = useState<string | null>();

  const validateForm = (): string | null => {
    if (!formData.name || !formData.age || !formData.phoneNumber) {
      return "All fields are required.";
    }
    return null;
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:3001/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      const data = response.json();
      router.push("/users");
    } catch (error) {
      console.error("Error creating user:", error);
      setError("An error occurred while creating the user.");
    }
  };

  return (
    <div>
      <Card className="w-[250px] flex flex-col gap-2 m-20">
        <CardDescription className="text-2xl font-semibold pl-4 pt-1">
          Create User
        </CardDescription>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Input
              placeholder="Name"
              name="name"
              className="w-[200px]"
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              placeholder="Age"
              name="age"
              className="w-[200px]"
              value={formData.age}
              onChange={handleChange}
            />
            <Input
              placeholder="Phone Number"
              name="phoneNumber"
              className="w-[200px]"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" className="w-[100px]" onClick={handleSubmit}>
            Submit
          </Button>
          {error && <p className="text-red-500">{error}</p>}
        </CardContent>
      </Card>
      <Card></Card>
    </div>
  );
}
