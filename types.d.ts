// journey fetch response
type MemoryResponse = {
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

// journey schema
type MemorySchema = {
  title: string;
  description?: string;
  date: string;
  location: string;
  tags?: string[];
  mediaType?: "IMAGE" | "VIDEO";
  media: string;
  notes?: string;
};
