import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { adminItems } from "@/components/AdminNav";
import axios from "axios";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

export const Route = createFileRoute("/admin/users")({
  head: () => ({ meta: [{ title: "Manage Users — Admin" }] }),
  component: UsersPage,
});

function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [showAddUser, setShowAddUser] = useState(false);

const [fullName, setFullName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [city, setCity] = useState("");
const [password, setPassword] = useState("");
const [role, setRole] = useState("ROLE_CUSTOMER");

useEffect(() => {
  loadUsers();
}, []);

const loadUsers = async () => {
  try {

    const response = await axios.get(
      "http://localhost:8081/api/users/all"
    );

    setUsers(response.data);

  } catch (error) {

    console.error(error);

  }
};
  const filteredUsers = users.filter(
  (u) =>
    u.fullName
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||
    u.email
      ?.toLowerCase()
      .includes(search.toLowerCase())
);
return (
    <DashboardLayout title="Manage Users" role="Administrator" items={adminItems}>
      <div className="flex justify-between items-center mb-4 gap-2">
        {showAddUser && (
  <Card className="mb-4">
    <CardContent className="p-4 space-y-3">

      <input
        className="border p-2 rounded w-full"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) =>
          setFullName(e.target.value)
        }
      />

      <input
        className="border p-2 rounded w-full"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        className="border p-2 rounded w-full"
        placeholder="Phone"
        value={phone}
        onChange={(e) =>
          setPhone(e.target.value)
        }
      />

      <input
        className="border p-2 rounded w-full"
        placeholder="City"
        value={city}
        onChange={(e) =>
          setCity(e.target.value)
        }
      />

      <input
        className="border p-2 rounded w-full"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <select
        className="border p-2 rounded w-full"
        value={role}
        onChange={(e) =>
          setRole(e.target.value)
        }
      >
        <option value="ROLE_CUSTOMER">
          Visitor
        </option>

        <option value="ROLE_SECURITY">
          Security
        </option>

        <option value="ROLE_ADMIN">
          Admin
        </option>
      </select>
      <Button
  onClick={async () => {
    try {

      await axios.post(
        "http://localhost:8081/api/auth/register",
        {
          fullName,
          email,
          phone,
          city,
          password,
          role
        }
      );

      alert("User Added Successfully");

      loadUsers();

      setFullName("");
      setEmail("");
      setPhone("");
      setCity("");
      setPassword("");
      setRole("ROLE_CUSTOMER");

      setShowAddUser(false);

    } catch (error) {

      console.error(error);

      alert("Failed To Add User");
    }
  }}
>
  Save User
</Button>

    </CardContent>
  </Card>
)}
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
  className="pl-9"
  placeholder="Search users..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
        </div>
        <Button
  onClick={() =>
    setShowAddUser(!showAddUser)
  }
>
  Add User
</Button>
      </div>
      <Card className="border-border/60">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Bookings</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">
  {u.fullName}
</TableCell>
                  <TableCell className="text-muted-foreground">{u.email}</TableCell>
                  <TableCell><Badge variant="outline">{u.role}</Badge></TableCell>
                  <TableCell>--</TableCell>
                  <TableCell>
  <Badge variant="default">
    Active
  </Badge>
</TableCell>
                  <TableCell className="text-right">
  <Button
    variant="destructive"
    size="sm"
    onClick={async () => {

      const confirmDelete =
        window.confirm(
          "Delete this user?"
        );

      if (!confirmDelete) return;

      try {

        await axios.delete(
          `http://localhost:8081/api/users/delete/${u.id}`
        );

        alert("User Deleted");

        loadUsers();

      } catch (error) {

        console.error(error);

        alert("Failed To Delete User");

      }

    }}
  >
    Delete
  </Button>
</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}