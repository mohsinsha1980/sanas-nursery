export interface UserEnquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: "pending" | "in_progress" | "resolved" | "closed";
  createdAt: string;
  updatedAt: string;
}
