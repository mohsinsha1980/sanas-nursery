import { z } from "zod";
import { slugRegEx } from "../helper";

export const slugValidation = z
  .string()
  .nonempty("Slug is required")
  .regex(slugRegEx, "Slug must be URL-friendly, Change title.");

// export const addProductSchema = z
//   .object({
//     pictures:
//       typeof window === "undefined"
//         ? z.any()
//         : z
//             .instanceof(FileList, { message: "Pictures are required" })
//             .transform((list) => Array.from(list))
//             .refine(
//               (files) => {
//                 return files.every(
//                   (file) => ACCEPTED_IMAGE_TYPES.indexOf(file.type) > -1
//                 );
//               },
//               {
//                 message: "Only .jpg, .jpeg, .png and .webp files are accepted.",
//               }
//             ),

//     title: z.string().nonempty("Title is required"),
//     slug: slugValidation,
//     details: z.string().nonempty("Detail is required"),
//     l1_category: z.string().nonempty("L1 Category is required"),
//     l2_category: z.string().nonempty("L2 Category is required"),
//     l3_category: z.string().optional(),
//     taxRate: z
//       .number()
//       .min(0, "Tax Rate must be greter than or equal to 0")
//       .max(100, { message: "Tax Rate cannot exceed 100%" }),
//     variants: z
//       .array(productVariantSchema)
//       .nonempty("At least one variant is required"),
//     // ...dimensionsSchema._def.schema.shape,
//     ...dimensionsSchema.shape,

//     status: z.boolean(),
//     metaDescription: z.string().nonempty("Meta description is required"),
//     summary: z.string().nonempty("Product summary is required"),
//     description: z.string().nonempty("Product description is required"),
//     sizeChart: z.array(SizeSchema),
//     hsnNumber: z.string().optional(),
//   })
//   .superRefine((data, ctx) => {
//     const generatedSlug = data?.title
//       ?.trim()
//       .toLowerCase()
//       .replaceAll(" ", "-");

//     const slugResult = slugValidation.safeParse(generatedSlug);
//     if (!slugResult.success) {
//       ctx.addIssue({
//         path: ["title"],
//         message:
//           "Title can't contain special characters (used to generate slug).",
//         code: z.ZodIssueCode.custom,
//       });
//     }
//   });

// const picturesSchema =
//   typeof window === "undefined"
//     ? z.any()
//     : z.union([
//         z.array(z.string()),
//         z
//           .instanceof(FileList, { message: "Pictures are required" })
//           .transform((list) => Array.from(list))
//           .refine(
//             (files) =>
//               files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
//             {
//               message: "Only .jpg, .jpeg, .png, and .webp files are accepted.",
//             }
//           ),
//       ]);

// export const editProductSchema = z
//   .object({
//     productId: z.string(),
//     title: z.string().min(3, "Title must be at least 3 characters long."),
//     slug: slugValidation,
//     details: z.string().nonempty("Detail is required"),
//     l1_category: z.string().nonempty("L1 Category is required"),
//     l2_category: z.string().nonempty("L2 Category is required"),
//     l3_category: z.string().optional(),
//     taxRate: z
//       .number()
//       .min(0, "Tax Rate must be greter than or equal to 0")
//       .max(100, { message: "Tax Rate cannot exceed 100%" }),
//     variants: z
//       .array(productVariantSchema)
//       .nonempty("At least one variant is required"),
//     // ...dimensionsSchema._def.schema.shape,
//     ...dimensionsSchema.shape,

//     status: z.boolean(),
//     metaDescription: z.string().nonempty("Meta description is required"),
//     summary: z.string().nonempty("Product summary is required"),
//     description: z.string().nonempty("Product description is required"),
//     sizeChart: z.array(SizeSchema),
//     pictures: picturesSchema,
//     hsnNumber: z.string().optional(),
//   })
//   .superRefine((data, ctx) => {
//     const generatedSlug = data?.title
//       ?.trim()
//       .toLowerCase()
//       .replaceAll(" ", "-");

//     const slugResult = slugValidation.safeParse(generatedSlug);
//     if (!slugResult.success) {
//       ctx.addIssue({
//         path: ["title"],
//         message: slugResult.error.errors[0].message,
//         code: z.ZodIssueCode.custom,
//       });
//     }
//   });

// export const homeTopBanner = z.object({
//   small: z.string().nonempty("Sub-heading is required"),
//   smallColor: z.string().nonempty("Sub-heading color is required"),
//   large: z.string().nonempty("Heading is required"),
//   largeColor: z.string().nonempty("Heading color is required"),
//   link: z.object({
//     label: z.string().nonempty("Link label is required"),
//     address: z.string().nonempty("Link address is required"),
//     color: z.string().nonempty("Link color is required"),
//   }),
//   picture: z.instanceof(File).refine(
//     (file) => {
//       if (ACCEPTED_IMAGE_TYPES.includes(file?.type as string)) {
//         return true;
//       }
//       return false;
//     },
//     {
//       message: `.jpg, .jpeg, .png and .webp files are accepted`,
//     }
//   ),
//   pictureUrl: z.string().optional(),
// });

// export const gallerySchema = z.object({
//   pictures:
//     typeof window === "undefined"
//       ? z.any()
//       : z
//           .instanceof(FileList, { message: "Pictures are required" })
//           .transform((list) => Array.from(list))
//           .refine(
//             (files) => {
//               return files.every(
//                 (file) => ACCEPTED_IMAGE_TYPES.indexOf(file.type) > -1
//               );
//             },
//             { message: "Only .jpg, .jpeg, .png and .webp files are accepted." }
//           ),
// });

// const baseHomeSliderSchema = z.object({
//   h1: z.string().nonempty("Main Heading is required"),
//   h1Color: z.string(),
//   h2: z.string().nonempty("Heading is required"),
//   h2Color: z.string(),
//   h3: z.string().nonempty("Sub-heading is required"),
//   h3Color: z.string(),
//   link: z.object({
//     label: z.string().nonempty("Link label is required"),
//     address: z.string().nonempty("Link address is required"),
//     color: z.string().nonempty("Link color is required"),
//   }),
//   status: z.boolean(),
// });

// export const homeSliderSchema = baseHomeSliderSchema.extend({
//   picture: z
//     .instanceof(File)
//     .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
//       message: "Only .jpg, .jpeg, .png, and .webp files are allowed",
//     }),
// });

// export const editHomeSliderSchema = baseHomeSliderSchema.extend({
//   _id: z.string(),
//   picture: z.union([
//     z
//       .instanceof(File)
//       .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
//         message: "Only .jpg, .jpeg, .png, and .webp files are allowed",
//       }),
//     z.string().nonempty("Image URL is required"),
//   ]),
