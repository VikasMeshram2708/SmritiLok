type JourneyResponse = {
  id: string;
  title: string;
  description: string | null;
  date: string;
  location: string;
  tags: string[];
  notes: string | null;
  media: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string | null;
};
