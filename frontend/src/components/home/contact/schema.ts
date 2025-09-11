import {z} from "zod";

const schema=z.object({
    name:z.string().min(1,"Firstname is required ").min(3,"Firstname should contain atleast 3 charachter").regex(/^[A-Za-z ]+$/, "Name should contain only letters and spaces").nonempty("Name is required"),
    email:z.string().min(1,"email is required ").email("email is invalid").nonempty("Email is required"),
    phone:z.string().min(1,"Phone number is required").max(10, "Phone number must be at least 10 digits").regex(/^\d+$/, "Phone number must contain only digits").nonempty("Phone number is required"),
    message:z.string().min(3,"Message is Required").nonempty("Message is required")
})

export type ContactFormData = z.infer<typeof schema>;

export default schema