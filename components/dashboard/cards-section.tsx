// components/cards-section.tsx
import React from "react";
import { Earth, Camera, Landmark, Flag, TrendingUp } from "lucide-react";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";

export default function CardsSection() {
  const dashboardStats = [
    {
      title: "Total Trips",
      description: "All journeys you've logged",
      value: 28,
      growth: "+15%",
      icon: Earth,
      trend: "Steady increase due to frequent weekend trips",
    },
    {
      title: "Photos & Notes",
      description: "Memories uploaded this month",
      value: 124,
      growth: "+32%",
      icon: Camera,
      trend: "Spike due to your recent Thailand trip",
    },
    {
      title: "Active Trip",
      description: "Ongoing journeys in progress",
      value: 1,
      growth: "Live",
      icon: Flag,
      trend: "Exploring Vietnam - updates syncing in real time",
    },
    {
      title: "Visited Cities",
      description: "Total unique cities visited",
      value: 47,
      growth: "+4%",
      icon: Landmark,
      trend: "Added 2 new cities this month",
    },
  ];

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {dashboardStats.map((stat, idx) => (
        <Card key={idx} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardDescription>{stat.description}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums">
              {stat.value}
            </CardTitle>
            <CardAction>
              <Badge variant="outline" className="p-1">
                <stat.icon className="size-4" />
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="flex items-center gap-2 font-medium">
              {stat.growth !== "Live" ? (
                <>
                  <p>{stat.growth} growth</p>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </>
              ) : (
                <span className="text-blue-600 font-semibold">Live</span>
              )}
            </div>
            <p className="text-muted-foreground line-clamp-2">{stat.trend}</p>
          </CardFooter>
        </Card>
      ))}
    </ul>
  );
}
