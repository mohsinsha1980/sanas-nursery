import { z } from "zod";
import { slugRegEx } from "../helper";
import { ACCEPTED_IMAGE_TYPES, YT_VIDEOS_LENGTH } from "../constants";

export const slugValidation = z
  .string()
  .nonempty("Slug is required")
  .regex(slugRegEx, "Slug must be URL-friendly, Change title.");

const picturesSchema =
  typeof window === "undefined"
    ? z.any()
    : z
        .instanceof(FileList, { message: "Pictures are required" })
        .transform((list) => Array.from(list))
        .refine(
          (files) => {
            return files.every(
              (file) => ACCEPTED_IMAGE_TYPES.indexOf(file.type) > -1
            );
          },
          {
            message: "Only .jpg, .jpeg, .png and .webp files are accepted.",
          }
        );

export const specificationsSchema = z.object({
  label: z.string().nonempty("Key Specification label is required"),
  value: z.string().nonempty("Key Specification value is required"),
});

export const faqsSchema = z.object({
  question: z.string().nonempty("Question is required"),
  answer: z.string().nonempty("Answer is required"),
});

export const tagSchema = z.object({
  label: z.string().nonempty("Tag label is required"),
  value: z.string().nonempty("Tag value is required"),
});

export const addPlantSchema = z
  .object({
    title: z.string().nonempty("Title is required"),
    slug: slugValidation,
    summary: z.string().nonempty("Plant summary is required"),
    category: z.string().nonempty("Plant Category is required"),
    size: z.string().nonempty("Plant Size is required"),
    careLevel: z.string().optional(),
    tags: z.array(tagSchema).optional(),
    metaDescription: z.string().optional(),
    details: z.string().nonempty("Detail is required"),
    description: z.string().nonempty("Plant description is required"),
    specifications: z.array(specificationsSchema),
    faqs: z.array(faqsSchema),
    pictures: picturesSchema,
    status: z.boolean(),
  })
  .superRefine((data, ctx) => {
    const generatedSlug = data?.title
      ?.trim()
      .toLowerCase()
      .replaceAll(" ", "-");

    const slugResult = slugValidation.safeParse(generatedSlug);
    if (!slugResult.success) {
      ctx.addIssue({
        path: ["title"],
        message:
          "Title can't contain special characters (used to generate slug).",
        code: z.ZodIssueCode.custom,
      });
    }
  });

const editPlantPicturesSchema =
  typeof window === "undefined"
    ? z.any()
    : z.union([
        z.array(z.string()),
        z
          .instanceof(FileList, { message: "Pictures are required" })
          .transform((list) => Array.from(list))
          .refine(
            (files) =>
              files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
            {
              message: "Only .jpg, .jpeg, .png, and .webp files are accepted.",
            }
          ),
      ]);

export const editPlantSchema = addPlantSchema
  .extend({
    plantId: z.string(),
    pictures: editPlantPicturesSchema,
  })
  .superRefine((data, ctx) => {
    const generatedSlug = data?.title
      ?.trim()
      .toLowerCase()
      .replaceAll(" ", "-");

    const slugResult = slugValidation.safeParse(generatedSlug);
    if (!slugResult.success) {
      ctx.addIssue({
        path: ["title"],
        message:
          "Title can't contain special characters (used to generate slug).",
        code: z.ZodIssueCode.custom,
      });
    }
  });

export const TagsSchema = z.object({
  label: z.string().nonempty("Tag label is required"),
});

export const homeCardSchema = z.object({
  small: z.string().nonempty("Sub-heading is required"),
  smallColor: z.string().nonempty("Sub-heading color is required"),
  large: z.string().nonempty("Heading is required"),
  largeColor: z.string().nonempty("Heading color is required"),
  link: z.object({
    label: z.string().nonempty("Link label is required"),
    address: z.string().nonempty("Link address is required"),
    color: z.string().nonempty("Link color is required"),
  }),
  picture: z.union([z.string(), z.instanceof(File), z.null(), z.undefined()]),
});

export const videoSchema = z.object({
  videos: z
    .array(z.string().url("Enter a valid YouTube URL"))
    .length(YT_VIDEOS_LENGTH),
});

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

export const PlantFilterSchema = z.object({
  title: z.string().optional(),
  plantId: z.string().optional(),
  status: z.string().optional(),
});
