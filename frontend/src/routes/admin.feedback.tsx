import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { adminItems } from "@/components/AdminNav";
import axios from "axios";
import { useEffect, useState } from "react";

export const Route =
  createFileRoute("/admin/feedback")({
    component: FeedbackPage,
  });

function FeedbackPage() {

  const [feedbacks, setFeedbacks] =
    useState<any[]>([]);

  useEffect(() => {

    loadFeedback();

  }, []);

  const loadFeedback = async () => {

    try {

      const response =
        await axios.get(
          "http://localhost:8081/api/feedback"
        );

      setFeedbacks(response.data);

    } catch (error) {

      console.error(error);

    }
  };

  const averageRating =
    feedbacks.length > 0
      ? (
          feedbacks.reduce(
            (sum, f) =>
              sum + f.rating,
            0
          ) / feedbacks.length
        ).toFixed(1)
      : "0";

  return (
    <DashboardLayout
      title="User Feedback"
      role="Administrator"
      items={adminItems}
    >
      <div className="grid gap-4 md:grid-cols-2 mb-6">

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-bold">
              Total Feedbacks
            </h3>

            <p className="text-3xl font-bold">
              {feedbacks.length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-bold">
              Average Rating
            </h3>

            <p className="text-3xl font-bold">
              ⭐ {averageRating}/5
            </p>
          </CardContent>
        </Card>

      </div>

      <div className="space-y-4">

        {feedbacks.map((f) => (

          <Card key={f.id}>

            <CardContent className="p-6">

              <h3 className="font-semibold">
                {f.userName}
              </h3>

              <p className="text-yellow-500">
                {"⭐".repeat(f.rating)}
              </p>

              <p className="mt-2">
                {f.comment}
              </p>

            </CardContent>

          </Card>

        ))}

      </div>
    </DashboardLayout>
  );
}