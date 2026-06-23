import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { adminItems } from "@/components/AdminNav";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

export const Route = createFileRoute("/admin/slots")({
  head: () => ({
    meta: [{ title: "Manage Ticket Slots — Admin" }],
  }),
  component: Slots,
});

function Slots() {
  const [slots, setSlots] = useState<any[]>([]);
  const [slotName, setSlotName] = useState("");
const [visitDate, setVisitDate] = useState("");
const [ticketPrice, setTicketPrice] = useState("");
const [maxCapacity, setMaxCapacity] = useState("");
const [showForm, setShowForm] = useState(false);
const [startTime, setStartTime] = useState("");
const [endTime, setEndTime] = useState("");

  useEffect(() => {
    loadSlots();
  }, []);

  const loadSlots = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/slots/all"
      );

      setSlots(response.data);
    } catch (error) {
      console.error("Error loading slots:", error);
    }
  };

  const deleteSlot = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this slot?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:8081/api/slots/delete/${id}`
      );

      loadSlots();
    } catch (error) {
      console.error("Error deleting slot:", error);
    }
  };

  return (
    <DashboardLayout
      title="Manage Ticket Slots"
      role="Administrator"
      items={adminItems}
    >
      <div className="flex justify-end mb-4">
        {showForm && (
  <Card className="mb-4">
    <CardContent className="p-4">
      <h3 className="font-semibold mb-3">
        Create New Slot
      </h3>

      <div className="grid grid-cols-2 gap-3">
        <input
          className="border p-2 rounded"
          placeholder="Slot Name"
          value={slotName}
          onChange={(e) =>
            setSlotName(e.target.value)
          }
        />

        <input
          className="border p-2 rounded"
          type="date"
          value={visitDate}
          onChange={(e) =>
            setVisitDate(e.target.value)
          }
        />

        <input
  className="border p-2 rounded"
  type="time"
  value={startTime}
  onChange={(e) =>
    setStartTime(e.target.value)
  }
/>

<input
  className="border p-2 rounded"
  type="time"
  value={endTime}
  onChange={(e) =>
    setEndTime(e.target.value)
  }
/>

        <input
          className="border p-2 rounded"
          type="number"
          placeholder="Ticket Price"
          value={ticketPrice}
          onChange={(e) =>
            setTicketPrice(e.target.value)
          }
        />

        <input
          className="border p-2 rounded"
          type="number"
          placeholder="Max Capacity"
          value={maxCapacity}
          onChange={(e) =>
            setMaxCapacity(e.target.value)
          }
        />
        <Button
  className="mt-4"
  onClick={async () => {
    try {

      await axios.post(
        "http://localhost:8081/api/slots/add",
        {
          slotName,
          visitDate,
          startTime,
          endTime,
          ticketPrice: Number(ticketPrice),
          maxCapacity: Number(maxCapacity),
        }
      );

      alert("Slot Created Successfully");

      loadSlots();

      setSlotName("");
      setVisitDate("");
      setStartTime("");
      setEndTime("");
      setTicketPrice("");
      setMaxCapacity("");

    } catch (error) {

      console.error(error);

      alert("Failed To Create Slot");
    }
  }}
>
  Save Slot
</Button>
      </div>
    </CardContent>
  </Card>
)}
        <Button
  onClick={() => {
    console.log("Button Clicked");
    setShowForm(!showForm);
  }}
>
          <Plus className="h-4 w-4 mr-1" />
          New Slot
        </Button>
      </div>

      <Card className="border-border/60">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Slot Name</TableHead>
                <TableHead>Visit Date</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Max Capacity</TableHead>
                <TableHead>Available Capacity</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Start Time</TableHead>
<TableHead>End Time</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {slots.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-6"
                  >
                    No slots available
                  </TableCell>
                </TableRow>
              ) : (
                slots.map((slot) => (
                  <TableRow key={slot.id}>
                    <TableCell>{slot.id}</TableCell>

                    <TableCell>
                      {slot.slotName}
                    </TableCell>

                    <TableCell>
                      {slot.visitDate}
                    </TableCell>

                    <TableCell>
                      ₹{slot.ticketPrice}
                    </TableCell>

                    <TableCell>
                      {slot.maxCapacity}
                    </TableCell>

                    <TableCell>
                      {slot.availableCapacity}
                    </TableCell>

                    <TableCell>
  {slot.startTime}
</TableCell>

<TableCell>
  {slot.endTime}
</TableCell>

                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() =>
                          deleteSlot(slot.id)
                        }
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}