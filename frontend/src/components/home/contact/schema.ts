import {z} from "zod";

const schema=z.object({
    name:z.string().min(1,"Firstname is required ").min(3,"Firstname should contain atleast 3 charachter").regex(/^[A-Za-z]+$/, "Firstname should contain only letters"),
    email:z.string().min(1,"email is required ").email("email is invalid"),
    phonenumber:z.string().min(1,"Phone number is required").min(10, "Phone number must be at least 10 digits").regex(/^\d+$/, "Phone number must contain only digits"),
    message:z.string().min(3,"Message is Required")
})

export type ContactFormData = z.infer<typeof schema>;

export default schema